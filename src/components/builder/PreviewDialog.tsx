import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  html: string;
}

export const PreviewDialog = ({ open, onClose, html }: PreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            This is how your email will look to recipients
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
