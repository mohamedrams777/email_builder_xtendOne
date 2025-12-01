import { useBuilder } from "@/context/BuilderContext";
import { BlockRenderer } from "./BlockRenderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, FileText } from "lucide-react";

export const BuilderCanvas = () => {
  const { blocks, builderType } = useBuilder();

  return (
    <div className="flex-1 bg-builder-canvas overflow-hidden flex flex-col">
      <ScrollArea className="flex-1">
        <div className="min-h-full p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
              {blocks.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    {builderType === "email" ? (
                      <Mail className="w-10 h-10 text-muted-foreground" />
                    ) : (
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Start Building
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Add blocks from the sidebar or choose a template to get started
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {blocks.map((block, index) => (
                    <BlockRenderer key={block.id} block={block} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
