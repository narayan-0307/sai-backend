import { useGetDashboardDetailsQuery } from "@renderer/hooks/api/dashboard";
import { LoadingSpinner } from "@renderer/components/ui/loadingSpinner";
import DashboardDetailCard from "@renderer/components/Dashboard/DashboardDetailCard";

const DashboardScreen = () => {
  const dashboardDetails = useGetDashboardDetailsQuery();
  const dashboardDetailsJSX = () => {
    if (dashboardDetails.isLoading) {
      return <LoadingSpinner className={"my-5 mx-auto"} />;
    }
    if (dashboardDetails.error) {
      return <div>Error</div>;
    }
    if (dashboardDetails.data) {
      return (
        <div className="grid grid-cols-3 gap-5">
          <DashboardDetailCard
            title="Total Donors"
            value={dashboardDetails.data.data.totalDonors}
          />
          <DashboardDetailCard
            title="Total Donations"
            value={dashboardDetails.data.data.totalDonations}
          />
          <DashboardDetailCard
            title="Highest Donation"
            value={`₹${dashboardDetails.data.data.highestDonation[0].highestAmount} by ${dashboardDetails.data.donorName}`}
          />
          <DashboardDetailCard
            title="Total Amount collected"
            value={`₹${dashboardDetails.data.data.totalAmountCollected}`}
          />
        </div>
      );
    }
    return <></>;
  };

  return (
    <div className="space-y-5 w-full py-10">
      <div className="my-2 text-2xl font-semibold">
        <p>Dashboard</p>
      </div>
      {dashboardDetailsJSX()}
    </div>
  );
};

export default DashboardScreen;
