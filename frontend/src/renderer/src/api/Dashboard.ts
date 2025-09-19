import { API } from "./api";
import { DashboardData } from "@renderer/types";
import { getDonor } from "./Donor";

export const getDashboardDetails = async () => {
  const { data } = await API(`api/app/dashboard`);
  const donor = await getDonor(data.highestDonation[0]._id);
  // data.highestAmount[0]._id = donor.name;
  // console.log('Sanchit',data);
  return {
    data: data as DashboardData,
    donorName: donor?.name,
  };
};
