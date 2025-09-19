import { cn } from "@renderer/lib/utils";
import { Donation } from "@renderer/types";
import { Link } from "react-router-dom";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@renderer/components/ui/avatar";

type DonationListItemProps = {
  className?: string;
  donation: Donation;
};

const DonationListItem = ({
  className = "",
  donation,
}: DonationListItemProps) => {
  return (
    <Link
      to={`/donations/${donation._id}`}
      className={cn("flex items-center p-0 space-x-2 py-2 px-2", className)}
    >
      {/* <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      <div>
        <p className="text-lg">{donation.amount}</p>
        <div className="flex text-md font-medium text-muted-foreground">
          {donation.chequeNo}
        </div>
      </div>
    </Link>
  );
};

export default DonationListItem;
