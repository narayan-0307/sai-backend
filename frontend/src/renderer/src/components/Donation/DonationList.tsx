import DonationListItem from "@renderer/components/Donation/DonationListItem";
import { Donation } from "@renderer/types";
import { cn } from "@renderer/lib/utils";

type DonationListProps = {
  className?: string;
  donations: Donation[];
};

const DonationList = ({ className = "", donations }: DonationListProps) => {
  return (
    <div className={cn("overflow-y-auto", className)}>
      {donations.map((donation, i) => (
        <DonationListItem
          className={(cn(), i % 2 === 0 ? "bg-muted/20" : "")}
          key={donation._id}
          donation={donation}
        />
      ))}
    </div>
  );
};

export default DonationList;
