import { useBuilder } from "@/context/BuilderContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

export const PropertiesPanel = () => {
  const { blocks, selectedBlockId, updateBlock } = useBuilder();
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-builder-sidebar border-l border-border flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mb-4 flex items-center justify-center">
          <Settings className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Block Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select a block to edit its properties
        </p>
      </div>
    );
  }

  const updateContent = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      content: { ...selectedBlock.content, [key]: value },
    });
  };

  const updateStyle = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      styles: { ...selectedBlock.styles, [key]: value },
    });
  };

  return (
    <div className="w-80 bg-builder-sidebar border-l border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-1">Properties</h2>
        <p className="text-sm text-muted-foreground capitalize">{selectedBlock.type} Block</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Content Properties */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Content</h3>
            
            {(selectedBlock.type === "text" || selectedBlock.type === "heading") && (
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={selectedBlock.content.text}
                  onChange={(e) => updateContent("text", e.target.value)}
                />
              </div>
            )}

            {selectedBlock.type === "heading" && (
              <div className="space-y-2">
                <Label>Heading Level</Label>
                <Select
                  value={selectedBlock.content.level}
                  onValueChange={(value) => updateContent("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">Heading 1</SelectItem>
                    <SelectItem value="h2">Heading 2</SelectItem>
                    <SelectItem value="h3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedBlock.type === "image" && (
              <>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={selectedBlock.content.src}
                    onChange={(e) => updateContent("src", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alt Text</Label>
                  <Input
                    value={selectedBlock.content.alt}
                    onChange={(e) => updateContent("alt", e.target.value)}
                  />
                </div>
              </>
            )}

            {selectedBlock.type === "button" && (
              <>
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={selectedBlock.content.text}
                    onChange={(e) => updateContent("text", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link URL</Label>
                  <Input
                    value={selectedBlock.content.url}
                    onChange={(e) => updateContent("url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {selectedBlock.type === "spacer" && (
              <div className="space-y-2">
                <Label>Height: {selectedBlock.content.height}px</Label>
                <Slider
                  value={[selectedBlock.content.height]}
                  onValueChange={([value]) => updateContent("height", value)}
                  min={10}
                  max={200}
                  step={10}
                />
              </div>
            )}
          </div>

          {/* Style Properties */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Styling</h3>
            
            <div className="space-y-2">
              <Label>Text Align</Label>
              <Select
                value={selectedBlock.styles.textAlign || "left"}
                onValueChange={(value) => updateStyle("textAlign", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <Input
                value={selectedBlock.styles.padding}
                onChange={(e) => updateStyle("padding", e.target.value)}
                placeholder="16px"
              />
            </div>

            {selectedBlock.type === "button" && (
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={selectedBlock.styles.backgroundColor || "#0000ff"}
                  onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
