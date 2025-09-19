import { API } from "./api";
import { Donor } from "@renderer/types";

export const getDonors = async (
  queryParams: { name?: string; identificationNo?: string } = {},
) => {
  const queryParamsString = new URLSearchParams(queryParams).toString();
  const { data } = await API(`api/app/getdonors?${queryParamsString}`);
  return data as Donor[];
};

export const getDonor = async (donorId: string) => {
  const { data } = await API(`api/app/getDonor/${donorId}`);
  return data as Donor;
};

export const createDonor = async (donor: Partial<Donor>) => {
  return await API.post("api/app/donor", donor);
};
