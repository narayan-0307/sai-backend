import Modal from "../ui/Modal";
// import ThanksLetterForm from "./ThanksLetterForm";
import { Button } from "../ui/button";
import { Donation } from "@renderer/types";
import { cn } from "@renderer/lib/utils";
import ReceiptForm from "./ReceiptForm";

type Props = {
  donation: Donation;
  className?: string;
};

const ReceiptModal = ({ donation, className = "" }: Props) => {
  return (
    <div>
      <Modal
        trigger={
          <Button className={cn("bg-primary w-[6rem]", className)}>
            Receipt
          </Button>
        }
      >
        {donation.donorId && <ReceiptForm donation={donation} />}
      </Modal>
    </div>
  );
};

export default ReceiptModal;
