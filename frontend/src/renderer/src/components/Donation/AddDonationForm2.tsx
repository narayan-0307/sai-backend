import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { Button } from "@renderer/components/ui/button";
import { useCreateDonationMutation } from "@renderer/hooks/api/donationApi";
import { cn } from "@renderer/lib/utils";
import { Calendar } from "@renderer/components/ui/calender";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@renderer/components/ui/form";
import { Input } from "@renderer/components/ui/input";

// Define the schema for the donation data
const dataSchema = z.object({
  donorId: z.string(),
  amount: z.string(),
  chequeNo: z.string(),
  chequeDate: z.date({
    required_error: "A date is required.",
  }),
  bank: z.string(),
  branch: z.string(),
  depositDate: z.date({
    required_error: "A date is required.",
  }),
  clearanceDate: z.date({
    required_error: "A date is required.",
  }),
  depositBank: z.string(),
  eightyG: z.string(),
  dateOfIssue: z.date({
    required_error: "A date is required.",
  }),
  submissionDate: z.date({
    required_error: "A date is required.",
  }),
  remark: z.string().optional(),
  AccountantSubmissionDate: z.date({
    required_error: "A date is required.",
  }),
});

const AddDonationForm = ({ donorId }: { donorId: string }) => {
  const createDonationMutation = useCreateDonationMutation(donorId);

  const form = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      donorId: donorId,
      amount: undefined,
      chequeNo: undefined,
      chequeDate: undefined,
      bank: undefined,
      branch: undefined,
      depositDate: undefined,
      clearanceDate: undefined,
      depositBank: undefined,
      eightyG: "80G",
      dateOfIssue: undefined,
      submissionDate: undefined,
      remark: undefined,
      AccountantSubmissionDate: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof dataSchema>) {
    await createDonationMutation.mutateAsync({
      ...values,
      amount: Number(values.amount),
      chequeDate: values.chequeDate,
      depositDate: values.depositDate,
      clearanceDate: values.clearanceDate,
      dateOfIssue: values.dateOfIssue,
      submissionDate: values.submissionDate,
      AccountantSubmissionDate: values.AccountantSubmissionDate,
    });
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="bg-muted/20"
                  placeholder="Amount"
                  {...field}
                />
              </FormControl>
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
                <Input
                  className="bg-muted/20"
                  placeholder="Cheque No"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chequeDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cheque Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
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
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" placeholder="Bank" {...field} />
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
                <Input
                  className="bg-muted/20"
                  placeholder="Branch"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depositDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deposit Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
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
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
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
          name="depositBank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit Bank</FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/20"
                  placeholder="Deposit Bank"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eightyG"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eighty G</FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/20"
                  placeholder="Eighty G"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfIssue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Issue</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
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
          name="submissionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Submission Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
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
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl>
                <Input
                  className="bg-muted/20"
                  placeholder="Remark"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="AccountantSubmissionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Accountant Submission Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-muted/20 w-full hover:bg-muted/20 mt-2",
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
                    toYear={new Date().getFullYear() + 10}
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Submitting
            </>
          ) : (
            <>Submit Donation</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddDonationForm;
