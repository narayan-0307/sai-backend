import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@renderer/components/ui/dialog";

type ModalProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

const Modal = ({ children, trigger }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh] scrollbar scrollbar-thumb-primary scrollbar-track-primary/20 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {children}
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default Modal;
