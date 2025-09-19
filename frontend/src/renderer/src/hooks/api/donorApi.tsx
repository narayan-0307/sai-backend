import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDonors, getDonor, createDonor } from "@renderer/api/Donor";
import { AxiosError } from "axios";
import { dialogClose } from "@renderer/components/ui/dialog";
import toast from "react-hot-toast";
export const useGetDonorsQuery = (
  queryParams: {
    name?: string;
    identificationNo?: string;
  } = {},
) => {
  return useQuery({
    queryKey: ["donors", queryParams],
    queryFn: () => getDonors(queryParams),
  });
};

export const useGetDonorQuery = (donorId: string) => {
  return useQuery({
    queryKey: ["donor", donorId],
    queryFn: () => getDonor(donorId),
  });
};

export const useCreateDonorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDonor,
    onSuccess: () => {
      toast.success("created Successfully");
      queryClient.invalidateQueries({ queryKey: ["donors"] });
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};
