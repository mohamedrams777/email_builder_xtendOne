import { useBuilder, Block } from "@/context/BuilderContext";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlockRendererProps {
  block: Block;
  index: number;
}

export const BlockRenderer = ({ block, index }: BlockRendererProps) => {
  const { selectedBlockId, selectBlock, deleteBlock } = useBuilder();
  const isSelected = selectedBlockId === block.id;

  const renderBlockContent = () => {
    switch (block.type) {
      case "heading":
        const HeadingTag = block.content.level as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            className="font-bold"
            style={{ 
              fontSize: block.content.level === "h1" ? "2rem" : block.content.level === "h2" ? "1.5rem" : "1.25rem",
              ...block.styles 
            }}
          >
            {block.content.text}
          </HeadingTag>
        );
      
      case "text":
        return (
          <p style={block.styles}>
            {block.content.text}
          </p>
        );
      
      case "image":
        return (
          <div style={{ ...block.styles, textAlign: block.styles.textAlign || "center" }}>
            {block.content.src ? (
              <img 
                src={block.content.src} 
                alt={block.content.alt}
                style={{ width: block.content.width, height: "auto" }}
                className="rounded"
              />
            ) : (
              <div className="bg-muted rounded p-8 text-center text-muted-foreground">
                Click to add an image
              </div>
            )}
          </div>
        );
      
      case "button":
        const href = block.content.href || "#";
        return (
          <div style={{ ...block.styles, textAlign: block.styles.textAlign || "center" }}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity inline-block no-underline"
              style={{ backgroundColor: block.styles.backgroundColor || "hsl(var(--primary))", textDecoration: "none" }}
            >
              {block.content.text}
            </a>
          </div>
        );
      
      case "divider":
        return (
          <div style={block.styles}>
            <hr className="border-border" />
          </div>
        );
      
      case "spacer":
        return (
          <div style={{ height: `${block.content.height}px`, ...block.styles }} />
        );
      
      case "columns":
        return (
          <div 
            className="grid gap-4"
            style={{ 
              gridTemplateColumns: `repeat(${block.content.count}, 1fr)`,
              ...block.styles 
            }}
          >
            {Array.from({ length: block.content.count }).map((_, i) => (
              <div key={i} className="bg-muted/30 p-4 rounded text-center text-muted-foreground text-sm">
                Column {i + 1}
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative group transition-all",
        isSelected && "bg-builder-block-active ring-2 ring-primary ring-inset"
      )}
      onClick={() => selectBlock(block.id)}
    >
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4">
        {renderBlockContent()}
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(block.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
