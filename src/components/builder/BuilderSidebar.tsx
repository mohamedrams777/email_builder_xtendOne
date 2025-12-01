import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Type,
  Image,
  Square,
  Minus,
  Columns,
  Heading,
  Mail,
  MousePointerClick,
} from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { BlockType } from "@/context/BuilderContext";

const blockTypes = [
  { type: "heading" as BlockType, icon: Heading, label: "Heading", description: "Add a heading" },
  { type: "text" as BlockType, icon: Type, label: "Text", description: "Add paragraph text" },
  { type: "image" as BlockType, icon: Image, label: "Image", description: "Add an image" },
  { type: "button" as BlockType, icon: MousePointerClick, label: "Button", description: "Add a button" },
  { type: "divider" as BlockType, icon: Minus, label: "Divider", description: "Add a divider" },
  { type: "spacer" as BlockType, icon: Square, label: "Spacer", description: "Add spacing" },
  { type: "columns" as BlockType, icon: Columns, label: "Columns", description: "Add columns" },
];

export const BuilderSidebar = () => {
  const { addBlock } = useBuilder();

  const handleAddBlock = (type: BlockType) => {
    const defaultContent: Record<BlockType, any> = {
      heading: { text: "New Heading", level: "h1" },
      text: { text: "Click to edit this text..." },
      image: { src: "", alt: "Image", width: "100%" },
      button: { text: "Click me", url: "#" },
      divider: { style: "solid" },
      spacer: { height: 20 },
      columns: { count: 2, content: [] },
    };

    const defaultStyles: Record<string, any> = {
      padding: "16px",
      backgroundColor: "transparent",
      textAlign: "left",
    };

    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: defaultContent[type],
      styles: defaultStyles,
    };

    addBlock(newBlock);
  };

  return (
    <div className="w-72 bg-builder-sidebar border-r border-border flex flex-col shadow-md">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-1">Blocks</h2>
        <p className="text-sm text-muted-foreground">Drag and drop to add</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {blockTypes.map((block) => (
            <Button
              key={block.type}
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-4 hover:bg-builder-block-hover transition-colors"
              onClick={() => handleAddBlock(block.type)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <block.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-foreground">{block.label}</div>
                  <div className="text-xs text-muted-foreground">{block.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
