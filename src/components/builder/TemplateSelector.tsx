import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBuilder, Template } from "@/context/BuilderContext";
import { FileText, Mail, Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  onClose: () => void;
  type: "email" | "invoice";
}

// Mock templates
const emailTemplates: Template[] = [
  {
    id: "email-1",
    name: "Welcome Email",
    thumbnail: "",
    type: "email",
    isPublic: true,
    blocks: [
      {
        id: "1",
        type: "heading",
        content: { text: "Welcome to Our Platform!", level: "h1" },
        styles: { padding: "32px", textAlign: "center", backgroundColor: "transparent" },
      },
      {
        id: "2",
        type: "text",
        content: { text: "We're excited to have you on board. Get started by exploring our features." },
        styles: { padding: "16px", textAlign: "center" },
      },
      {
        id: "3",
        type: "button",
        content: { text: "Get Started", url: "#" },
        styles: { padding: "24px", textAlign: "center" },
      },
    ],
  },
  {
    id: "email-2",
    name: "Newsletter",
    thumbnail: "",
    type: "email",
    isPublic: true,
    blocks: [
      {
        id: "1",
        type: "heading",
        content: { text: "Monthly Newsletter", level: "h1" },
        styles: { padding: "24px", textAlign: "left" },
      },
      {
        id: "2",
        type: "divider",
        content: { style: "solid" },
        styles: { padding: "8px" },
      },
      {
        id: "3",
        type: "text",
        content: { text: "Check out what's new this month..." },
        styles: { padding: "16px" },
      },
    ],
  },
];

const invoiceTemplates: Template[] = [
  {
    id: "invoice-1",
    name: "Professional Invoice",
    thumbnail: "",
    type: "invoice",
    isPublic: true,
    blocks: [
      {
        id: "1",
        type: "heading",
        content: { text: "INVOICE", level: "h1" },
        styles: { padding: "24px", textAlign: "right" },
      },
      {
        id: "2",
        type: "text",
        content: { text: "Invoice #001\nDate: 2024-01-01" },
        styles: { padding: "16px", textAlign: "right" },
      },
      {
        id: "3",
        type: "divider",
        content: { style: "solid" },
        styles: { padding: "16px" },
      },
    ],
  },
  {
    id: "invoice-2",
    name: "Minimalist Invoice",
    thumbnail: "",
    type: "invoice",
    isPublic: true,
    blocks: [
      {
        id: "1",
        type: "heading",
        content: { text: "Invoice", level: "h2" },
        styles: { padding: "24px", textAlign: "left" },
      },
      {
        id: "2",
        type: "text",
        content: { text: "Simple and clean invoice template" },
        styles: { padding: "16px" },
      },
    ],
  },
];

export const TemplateSelector = ({ onClose, type }: TemplateSelectorProps) => {
  const { loadTemplate } = useBuilder();
  const templates = type === "email" ? emailTemplates : invoiceTemplates;

  const handleSelectTemplate = (template: Template) => {
    loadTemplate(template);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {type === "email" ? (
              <Mail className="w-5 h-5 text-primary" />
            ) : (
              <FileText className="w-5 h-5 text-primary" />
            )}
            Choose a Template
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all bg-card p-6 text-left"
              >
                <div className="mb-4 h-40 bg-gradient-subtle rounded flex items-center justify-center">
                  <div className="text-center">
                    {type === "email" ? (
                      <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    ) : (
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      {template.blocks.length} blocks
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    {template.isPublic && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3" />
                        Public Template
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
