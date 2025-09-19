import { Donor } from "@renderer/types";
import AddDonationModal from "../Donation/AddDonationModal";
import { DataTable } from "../ui/data-table";
import { columns, filters } from "../Donation/DonationTable/columns";
import { Card } from "../ui/card";

type DonorDetailsProps = {
  donor: Donor;
};

const DonorDetails = ({ donor }: DonorDetailsProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-xl font-semibold">Donor Details</p>
        <Card className="p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3 items-center justify-center">
            <div>
              <span className="font-semibold text-lg">Name: </span>
              {donor.name}
            </div>
            <div>
              <span className="font-semibold text-lg">BirthDate: </span>
              {new Date(donor.birthDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold text-lg">Email: </span>
              {donor.email}
            </div>
            <div>
              <span className="font-semibold text-lg">Contact No: </span>
              {donor.contactNo}
            </div>
            <div>
              <span className="font-semibold text-lg">Address: </span>
              {donor.address}
            </div>
            <div>
              <span className="font-semibold text-lg">Identification No: </span>
              {donor.identificationNo}
            </div>
          </div>
          <AddDonationModal donorId={donor._id} />
        </Card>
      </div>
      {donor.donations && (
        <div className="space-y-2">
          <p className="text-xl font-semibold">{`${donor.name}'`}s Donations</p>
          <Card className="p-6">
            <DataTable
              route="donations"
              columns={columns}
              filters={filters}
              data={donor.donations}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default DonorDetails;
