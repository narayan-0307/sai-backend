import { API } from "./api";
// import { ReceiptFormSchemaType } from "@renderer/components/Certificates/ReceiptForm";
// import { EightyGFormSchemaType } from "@renderer/components/Certificates/EightyGForm";
import numWords from "num-words";

export const downloadThanksLetter = async (data) => {
  return await API.post("api/doc/generate-thanksLetter", data, {
    responseType: "blob", // Expecting a binary response (PDF)
  });
};

export const downloadReceipt = async (data) => {
  return await API.post(
    "api/doc/generate-receipt",
    {
      ...data,
      amountText: numWords(+data.amount),
      clearanceDate: data.clearanceDate.toLocaleDateString(),
    },
    {
      responseType: "blob", // Expecting a binary response (PDF)
    },
  );
};

export const downloadEightyG = async (data) => {
  return await API.post(
    "api/doc/generate-eightyG",
    { ...data, amountText: numWords(+data.amount) },
    {
      responseType: "blob", // Expecting a binary response (PDF)
    },
  );
};


export const emailThanksLetter = async (data) => {
  return await API.post("api/doc/generate-email", data);
};

export const emailReceipt = async (data) => {
  return await API.post("api/doc/generate-receipt-email", data);
}

export const emailEightyG = async (data) => {
  return await API.post("api/doc/generate-eightyG-email", data);
}