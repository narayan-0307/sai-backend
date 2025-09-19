import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { useDownloadThanksLetterMutation } from "@renderer/hooks/api/certificate";
import {
  useDownloadreceiptMutation,
  useEmailReceiptMutation,
} from "@renderer/hooks/api/certificate";
import { useState } from "react";

import { Button } from "@renderer/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@renderer/components/ui/form";
import { Input } from "@renderer/components/ui/input";
import { Donation } from "@renderer/types";
// import { convertTimestampToYYYYMMDD } from "@renderer/lib/utilfunc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover";
import { cn } from "@renderer/lib/utils";
import { Calendar } from "@renderer/components/ui/calender";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

const ReceiptFormSchema = z.object({
  donorId: z.string(),
  name: z.string(),
  email: z.string().email(),
  // contactNo: z
    // .string()
    // .refine((value) => /^\d{10}$/g.test(value), {
    //   message: "Invalid contact number format",
    // })
  address: z.string(),
  identificationNo: z.string(),
  amount: z.string(),
  bank: z.string(),
  branch: z.string(),
  clearanceDate: z.date(),
  chequeNo: z.string(),
  receiptNo: z.string(),
  contactNo: z.string()
});

export type ReceiptFormSchemaType = z.infer<typeof ReceiptFormSchema>;

type ReceiptFormProps = {
  donation: Donation;
};

const ReceiptForm = ({ donation }: ReceiptFormProps) => {
  //   const downloadThanksLetterMutation = useDownloadThanksLetterMutation();
  const downloadReceiptMutation = useDownloadreceiptMutation({
    name: donation.donorId?.name ? donation.donorId?.name : "Donor",
    id: donation._id,
  });
  const emailReceiptMutation = useEmailReceiptMutation();
  const [email, setEmail] = useState(false);

  const form = useForm<z.infer<typeof ReceiptFormSchema>>({
    resolver: zodResolver(ReceiptFormSchema),
    defaultValues: {
      donorId: donation.donorId?._id,
      name: donation.donorId?.name,
      email: donation.donorId?.email,
      contactNo: donation.donorId?.contactNo,
      address: donation.donorId?.address,
      identificationNo: donation.donorId?.identificationNo,
      amount: donation.amount.toString(),
      bank: donation.bank,
      branch: donation.branch,
      clearanceDate: new Date(donation.clearanceDate),
      chequeNo: donation.chequeNo,
      receiptNo: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ReceiptFormSchema>) {
    // console.log(values);
    // await downloadReceiptMutation.mutateAsync(values);
    if (email === true) {
      await emailReceiptMutation.mutateAsync(values);
    } else {
      await downloadReceiptMutation.mutateAsync(values);
    }
    setEmail(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Name</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Email</FormLabel>
              <FormControl>
                <Input type="email" className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Address</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identificationNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor ID</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clearanceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Clearance Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 ",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={new Date().getFullYear() - 100}
                    toYear={new Date().getFullYear()}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chequeNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cheque No</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiptNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt No</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          <>
            {form.formState.isSubmitting && !email ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Submitting
              </>
            ) : (
              <>Download Receipt</>
            )}
          </>
        </Button>
        <Button
          disabled={form.formState.isSubmitting}
          onClick={() => {
            setEmail(true);
          }}
          type="submit"
        >
          <>
            {form.formState.isSubmitting && email ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Submitting
              </>
            ) : (
              <>Email Receipt</>
            )}
          </>
        </Button>
      </form>
    </Form>
  );
};

export default ReceiptForm;
