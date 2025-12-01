import React, { createContext, useContext, useState, ReactNode } from "react";
import html2canvas from "html2canvas";
import { templateService } from "@/lib/supabase";

export type BlockType = "text" | "image" | "button" | "divider" | "spacer" | "columns" | "heading";

export interface Block {
  id: string;
  type: BlockType;
  content: any;
  styles: Record<string, any>;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  blocks: Block[];
  isPublic: boolean;
  type: "email" | "invoice";
}

interface BuilderContextType {
  blocks: Block[];
  selectedBlockId: string | null;
  addBlock: (block: Block) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  loadTemplate: (template: Template) => void;
  clearCanvas: () => void;
  builderType: "email" | "invoice";
  exportToHtml: () => string;
  generateThumbnail: () => Promise<string>;
  saveTemplate: (name: string, isPublic: boolean) => Promise<void>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ 
  children, 
  type 
}: { 
  children: ReactNode; 
  type: "email" | "invoice";
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<Block[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = (newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const addBlock = (block: Block) => {
    const newBlocks = [...blocks, block];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const selectBlock = (id: string | null) => {
    setSelectedBlockId(id);
  };

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...blocks];
    const dragBlock = newBlocks[dragIndex];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, dragBlock);
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  const loadTemplate = (template: Template) => {
    setBlocks(template.blocks);
    setSelectedBlockId(null);
    addToHistory(template.blocks);
  };

  const clearCanvas = () => {
    setBlocks([]);
    setSelectedBlockId(null);
    addToHistory([]);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  };

  const exportToHtml = () => {
    const htmlBlocks = blocks.map((block) => {
      const styleString = Object.entries(block.styles)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
          return `${cssKey}: ${value}`;
        })
        .join("; ");

      switch (block.type) {
        case "heading":
          return `<h1 style="${styleString}">${block.content.text || ""}</h1>`;
        case "text":
          return `<p style="${styleString}">${block.content.text || ""}</p>`;
        case "button":
          const href = block.content.href || "#";
          return `<a href="${href}" style="${styleString}; text-decoration: none; display: inline-block;">${block.content.text || "Button"}</a>`;
        case "image":
          return `<img src="${block.content.src || ""}" alt="${block.content.alt || ""}" style="${styleString}" />`;
        case "divider":
          return `<hr style="${styleString}" />`;
        case "spacer":
          return `<div style="${styleString}"></div>`;
        case "columns":
          return `<div style="${styleString}; display: flex; justify-content: space-between;">
            ${Array(block.content.columns || 2).fill('<div style="flex: 1; padding: 10px;"></div>').join('')}
          </div>`;
        default:
          return "";
      }
    });

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${type === "email" ? "Email" : "Invoice"}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto;">
    ${htmlBlocks.join("\n")}
  </div>
</body>
</html>`;
  };

  const generateThumbnail = async () => {
    const canvas = document.querySelector('[data-builder-canvas]') as HTMLElement;
    if (!canvas) return "";
    
    const canvasImage = await html2canvas(canvas);
    return canvasImage.toDataURL();
  };

  const saveTemplate = async (name: string, isPublic: boolean) => {
    const thumbnail = await generateThumbnail();
    
    await templateService.saveTemplate({
      name,
      type,
      thumbnail,
      blocks,
      is_public: isPublic,
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        blocks,
        selectedBlockId,
        addBlock,
        updateBlock,
        deleteBlock,
        selectBlock,
        moveBlock,
        loadTemplate,
        clearCanvas,
        builderType: type,
        exportToHtml,
        generateThumbnail,
        saveTemplate,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within BuilderProvider");
  }
  return context;
};
