import { useParams } from "react-router-dom";
import { useGetDonorQuery } from "@renderer/hooks/api/donorApi";
import DonorDetails from "@renderer/components/Donor/DonorDetails";
import { LoadingSpinner } from "@renderer/components/ui/loadingSpinner";
const DonorScreen = () => {
  const { donorId } = useParams();
  let donorIdString = "";
  if (donorId) {
    donorIdString = donorId;
  }
  const DonorData = useGetDonorQuery(donorIdString);
  const donorDetailsJSX = () => {
    if (DonorData.data) {
      return <DonorDetails donor={DonorData.data} />;
    } else if (DonorData.isLoading) {
      return <LoadingSpinner className={"my-5 mx-auto"} />;
    } else {
      return "Error";
    }
  };

  return <div className="w-full py-10">{donorDetailsJSX()}</div>;
};

export default DonorScreen;
