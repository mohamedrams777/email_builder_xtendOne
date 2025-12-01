import { useState } from "react";
import { BuilderSidebar } from "@/components/builder/BuilderSidebar";
import { BuilderCanvas } from "@/components/builder/BuilderCanvas";
import { BuilderToolbar } from "@/components/builder/BuilderToolbar";
import { PropertiesPanel } from "@/components/builder/PropertiesPanel";
import { TemplateSelector } from "@/components/builder/TemplateSelector";
import { BuilderProvider } from "@/context/BuilderContext";

const InvoiceBuilder = () => {
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <BuilderProvider type="invoice">
      <div className="flex flex-col h-screen bg-background">
        <BuilderToolbar 
          onOpenTemplates={() => setShowTemplates(true)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <BuilderSidebar />
          <BuilderCanvas />
          <PropertiesPanel />
        </div>

        {showTemplates && (
          <TemplateSelector 
            onClose={() => setShowTemplates(false)}
            type="invoice"
          />
        )}
      </div>
    </BuilderProvider>
  );
};

export default InvoiceBuilder;
