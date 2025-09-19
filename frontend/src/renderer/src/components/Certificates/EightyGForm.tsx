import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  useDownloadEightyGMutation,
  useEmailEightyGMutation,
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

const EightyGFormSchema = z.object({
  donorId: z.string(),
  name: z.string(),
  email: z.string().email(),
  // contactNo: z.string().refine((value) => /^\d{10}$/g.test(value), {
  //   message: "Invalid contact number format",
  // }),
  address: z.string(),
  identificationNo: z.string(),
  amount: z.string(),
  receiptNo: z.string()
});

export type EightyGFormSchemaType = z.infer<typeof EightyGFormSchema>;

type EightyGFormProps = {
  donation: Donation;
};

const EightyGForm = ({ donation }: EightyGFormProps) => {
  const downloadEightyGMutation = useDownloadEightyGMutation({
    name: donation.donorId?.name ? donation.donorId?.name : "Donor",
    id: donation._id,
  });
  const emailEightyGMutation = useEmailEightyGMutation();
  const [email, setEmail] = useState(false);
  const form = useForm<z.infer<typeof EightyGFormSchema>>({
    resolver: zodResolver(EightyGFormSchema),
    defaultValues: {
      donorId: donation.donorId?._id,
      name: donation.donorId?.name,
      email: donation.donorId?.email,
      // contactNo: donation.donorId?.contactNo,
      address: donation.donorId?.address,
      identificationNo: donation.donorId?.identificationNo,
      amount: donation.amount.toString(),
      receiptNo: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EightyGFormSchema>) {
    if (email) {
      await emailEightyGMutation.mutateAsync(values);
    } else {
      await downloadEightyGMutation.mutateAsync(values);
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
        {/* <FormField
          control={form.control}
          name="contactNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donor Contact</FormLabel>
              <FormControl>
                <Input className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
              <>Download 80G</>
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
              <>Email EightyG</>
            )}
          </>
        </Button>
      </form>
    </Form>
  );
};

export default EightyGForm;
