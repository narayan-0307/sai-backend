import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDonation,
  getDonations,
  createDonation,
} from "@renderer/api/Donation";
import { dialogClose } from "@renderer/components/ui/dialog";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const UseGetDonationQuery = (donationId: string) => {
  return useQuery({
    queryKey: ["donation", donationId],
    queryFn: () => getDonation(donationId),
  });
};

export const UseGetDonationsQuery = () => {
  return useQuery({ queryKey: ["donations"], queryFn: () => getDonations() });
};

export const useCreateDonationMutation = (donorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDonation,
    onSuccess: () => {
      toast.success("created Donation Successfully");
      queryClient.invalidateQueries({ queryKey:["donor", donorId]});
      queryClient.invalidateQueries({ queryKey:["donations"]});
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};
