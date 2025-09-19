import { cn } from "@renderer/lib/utils";
import { Donor } from "@renderer/types";
import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@renderer/components/ui/avatar";

type DonorListItemProps = {
  className?: string;
  donor: Donor;
};

const DonorListItem = ({ className = "", donor }: DonorListItemProps) => {
  const navigate = useNavigate();
  return (
    <tr
      className={cn(
        "text-center cursor-pointer text-muted-foreground font-medium ",
        className,
      )}
      onClick={() => navigate(`/donors/${donor._id}`)}
    >
      {/* <Link
      to={`/donors/${donor._id}`}
      className={cn("flex items-center p-0 space-x-2 py-2 px-2", className)}
    > */}
      {/* <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      {/* <p className="text-lg">{donor.name}</p>
        <div className="text-md font-medium text-muted-foreground">
          {`Birth Date: ${donor.birthDate} • Email: ${donor.email} • Contact: ${donor.contactNo} • Identification no: ${donor.identificationNo}`}
        </div> */}
      {/* </Link> */}
      <td className="py-3">{donor.name}</td>
      <td>{new Date(donor.birthDate).toLocaleDateString()}</td>
      <td>{donor.email}</td>
      <td>{donor.contactNo}</td>
      <td>{donor.identificationNo}</td>
    </tr>
  );
};

export default DonorListItem;
