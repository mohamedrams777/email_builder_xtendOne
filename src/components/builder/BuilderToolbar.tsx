import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Save, 
  Send, 
  Eye, 
  FileText, 
  Undo, 
  Redo,
  Download,
  ArrowLeft
} from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SendEmailDialog } from "./SendEmailDialog";
import { PreviewDialog } from "./PreviewDialog";
import { SaveTemplateDialog } from "./SaveTemplateDialog";

interface BuilderToolbarProps {
  onOpenTemplates: () => void;
}

export const BuilderToolbar = ({ onOpenTemplates }: BuilderToolbarProps) => {
  const { builderType, exportToHtml, saveTemplate, undo, redo, canUndo, canRedo, blocks } = useBuilder();
  const navigate = useNavigate();
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [emailHtml, setEmailHtml] = useState("");
  const [invoiceHtml, setInvoiceHtml] = useState("");

  const handleSave = () => {
    if (blocks.length === 0) {
      toast.error("Add some content before saving!");
      return;
    }
    setShowSaveDialog(true);
  };

  const handleSaveTemplate = async (name: string, isPublic: boolean) => {
    await saveTemplate(name, isPublic);
  };

  const handleSend = () => {
    if (blocks.length === 0) {
      toast.error("Add some content before sending!");
      return;
    }
    const html = exportToHtml();
    setEmailHtml(html);
    setShowSendDialog(true);
  };

  const handlePreview = () => {
    if (blocks.length === 0) {
      toast.info("Add some content to preview!");
      return;
    }
    const html = exportToHtml();
    setEmailHtml(html);
    setShowPreview(true);
  };

  const handleExport = () => {
    if (blocks.length === 0) {
      toast.error("Add some content before exporting!");
      return;
    }
    
    const html = exportToHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${builderType}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Exported successfully!");
  };

  return (
    <>
      <div className="h-16 bg-builder-toolbar border-b border-border flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {builderType === "email" ? "Email Builder" : "Invoice Builder"}
              </h1>
              <p className="text-xs text-muted-foreground">Untitled Design</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={undo} disabled={!canUndo}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={redo} disabled={!canRedo}>
            <Redo className="w-4 h-4" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button variant="ghost" onClick={onOpenTemplates}>
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          
          <Button variant="ghost" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>

          <Button variant="ghost" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button variant="secondary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button onClick={handleSend} className="bg-gradient-primary">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      <SendEmailDialog 
        open={showSendDialog} 
        onClose={() => setShowSendDialog(false)}
        emailHtml={emailHtml}
        invoiceHtml={invoiceHtml}
      />
      
      <PreviewDialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        html={emailHtml}
      />

      <SaveTemplateDialog
        open={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSaveTemplate}
      />
    </>
  );
};
