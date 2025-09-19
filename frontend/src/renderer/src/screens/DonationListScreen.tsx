// import DonationList from "@renderer/components/Donation/DonationList";
import { UseGetDonationsQuery } from "@renderer/hooks/api/donationApi";
import { DataTable } from "@renderer/components/ui/data-table";
import {
  columns,
  filters,
} from "@renderer/components/Donation/DonationTable/columns";
import { Card, CardContent } from "@renderer/components/ui/card";
import { LoadingSpinner } from "@renderer/components/ui/loadingSpinner";

const DonationListScreen = () => {
  const donations = UseGetDonationsQuery();

  const donationsListJSX = () => {
    if (donations.isLoading) {
      return <LoadingSpinner className={"my-5 mx-auto"} />;
    } else if (donations.isError) {
      return "Error";
    } else if (donations.data) {
      return (
        <>
          <DataTable
            columns={columns}
            data={donations.data}
            filters={filters}
          />
        </>
      );
    }
    return <></>;
  };

  return (
    <div className="w-full py-10">
      {/* <Card>
        <CardContent>{donationsListJSX()}</CardContent>
      </Card> */}
      <div className="my-2 text-2xl font-semibold">
        <p>Donation List</p>
      </div>
      <Card className="pt-2">
        <CardContent>{donationsListJSX()}</CardContent>
      </Card>
    </div>
  );
};

export default DonationListScreen;
