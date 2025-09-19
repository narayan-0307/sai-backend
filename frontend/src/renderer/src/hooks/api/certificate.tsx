import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { dialogClose } from "@renderer/components/ui/dialog";
import {
  downloadThanksLetter,
  downloadReceipt,
  downloadEightyG,
  emailThanksLetter,
  emailReceipt,
  emailEightyG,
} from "@renderer/api/Certificate";
import { AxiosError, AxiosResponse } from "axios";

type FileNameDetails = {
  name: string;
  id: string;
};

export const useDownloadThanksLetterMutation = ({
  name,
  id,
}: FileNameDetails) => {
  return useMutation({
    mutationFn: downloadThanksLetter,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("Download started");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Thanks_letter_${name}_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Download succesfully");
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export const useDownloadreceiptMutation = ({
  name,
  id,
}: FileNameDetails) => {
  return useMutation({
    mutationFn: downloadReceipt,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("Download started");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt_${name}_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Download succesfully");
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export const useDownloadEightyGMutation = ({
  name,
  id,
}: FileNameDetails) => {
  return useMutation({
    mutationFn: downloadEightyG,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("Download started");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `EightyG_${name}_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Download succesfully");
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export const useEmailThanksLetterMutation = () => {
  return useMutation({
    mutationFn: emailThanksLetter,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("Thanks Letter Emailed", response.data);
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export const useEmailReceiptMutation = () => {
  return useMutation({
    mutationFn: emailReceipt,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("Receipt Emailed Successfully", response.data);
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};

export const useEmailEightyGMutation = () => {
  return useMutation({
    mutationFn: emailEightyG,
    onSuccess: async (response: AxiosResponse) => {
      toast.success("80G Emailed Successfully", response.data);
      dialogClose();
    },
    onError: (data: AxiosError) => {
      toast.error(JSON.stringify(data.response?.data));
    },
  });
};
