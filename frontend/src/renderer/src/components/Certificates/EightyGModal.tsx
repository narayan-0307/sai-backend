import Modal from "../ui/Modal";
import { Button } from "../ui/button";
import { Donation } from "@renderer/types";
import { cn } from "@renderer/lib/utils";
import EightyGForm from "./EightyGForm";

type Props = {
  donation: Donation;
  className?: string;
};

const EightyGModal = ({ donation, className = "" }: Props) => {
  return (
    <div>
      <Modal
        trigger={
          <Button className={cn("bg-primary w-[6rem]", className)}>
            EightyG
          </Button>
        }
      >
        <EightyGForm donation={donation} />
      </Modal>
    </div>
  );
};

export default EightyGModal;
