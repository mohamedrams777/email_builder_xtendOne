import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, FileText, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Professional Builder Suite
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Create Beautiful
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Emails & Invoices
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Design professional emails and invoices with our intuitive block-based editor. 
            No coding required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
            onClick={() => navigate("/email-builder")}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">Email Builder</h2>
            <p className="text-muted-foreground mb-6">
              Create stunning email campaigns with drag-and-drop blocks. Perfect for newsletters, 
              promotions, and customer communications.
            </p>
            
            <Button className="w-full bg-gradient-primary group-hover:shadow-glow transition-all">
              Start Building
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>

          <Card 
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
            onClick={() => navigate("/invoice-builder")}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">Invoice Builder</h2>
            <p className="text-muted-foreground mb-6">
              Design professional invoices and bills with customizable templates. 
              Streamline your billing process effortlessly.
            </p>
            
            <Button className="w-full bg-gradient-primary group-hover:shadow-glow transition-all">
              Create Invoice
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted features</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Block-based editing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Template library
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Public/Private sharing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Export & Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
