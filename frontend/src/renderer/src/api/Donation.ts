import { API } from "./api";
import { Donation,DonationFormData } from "@renderer/types";

export const getDonation = async (donationId: string) => {
  const { data } = await API(`api/app/donations/${donationId}`);
  return data as Donation;
};

export const getDonations = async () => {
  const { data } = await API("api/app/donations");
  return data as Donation[];
};

export const createDonation = async (donation: Partial<DonationFormData>) => {
  return await API.post("api/app/donation", donation);
};
