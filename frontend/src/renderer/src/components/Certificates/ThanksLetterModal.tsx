import Modal from "../ui/Modal";
import ThanksLetterForm from "./ThanksLetterForm";
import { Button } from "../ui/button";
import { Donation } from "@renderer/types";
import { cn } from "@renderer/lib/utils";

type Props = {
  donation: Donation;
  className?: string;
};

const ThanksLetterModal = ({ donation, className = "" }: Props) => {
  return (
    <div>
      <Modal
        trigger={
          <Button className={cn("bg-primary w-[6rem]", className)}>
            Thanks Letter
          </Button>
        }
      >
        {donation.donorId && (
          <ThanksLetterForm
            id={donation.donorId._id}
            donationId={donation._id}
            name={donation.donorId.name}
            address={donation.donorId.address}
            amount={donation.amount}
            donorEmail={donation.donorId.email}
            receiptNo=""
            financialYear=""
          />
        )}
      </Modal>
    </div>
  );
};

export default ThanksLetterModal;
