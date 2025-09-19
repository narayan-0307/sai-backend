import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  useDownloadThanksLetterMutation,
  useEmailThanksLetterMutation,
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

const formSchema = z.object({
  donorName: z.string(),
  donorAddress: z.string(),
  donationAmount: z.number(),
  email: z.string().email(),
  type: z.enum(
    [
      "educationalSupport",
      "medicalCare",
      "nutritionalSupport",
      "comprehensiveCare",
    ],
    {
      required_error: "You need to select a donation type.",
    },
  ),
  receiptNo: z.string(),
  financialYear: z.string()
});

type ThanksLetterFormProps = {
  name: string;
  id: string;
  donationId: string;
  address: string;
  amount: number;
  donorEmail: string;
  receiptNo: string;
  financialYear: string
};

const ThanksLetterForm = ({
  name,
  id,
  donationId,
  address,
  amount,
  donorEmail,
}: ThanksLetterFormProps) => {
  const downloadThanksLetterMutation = useDownloadThanksLetterMutation({name, id: donationId});
  const emailThanksLetterMutation = useEmailThanksLetterMutation();
  const [email, setEmail] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: name,
      donorAddress: address,
      donationAmount: amount,
      email: donorEmail,
      type: "educationalSupport",
      receiptNo: "",
      financialYear: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const choices = {
      educationalSupport: false,
      medicalCare: false,
      nutritionalSupport: false,
      comprehensiveCare: false,
      other: false,
    };
    const { type, ...rest } = values;
    choices[type] = true;

    // console.log({
    //   ...rest,
    //   donorId: id,
    //   ...choices,
    // });
    if (email === true) {
      await emailThanksLetterMutation.mutateAsync({
        ...rest,
        donorId: id,
        ...choices,
      });
      // console.log("email");
    } else {
      await downloadThanksLetterMutation.mutateAsync({
        ...rest,
        donorId: id,
        ...choices,
      });
      // console.log("download");
    }
    setEmail(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="donorName"
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
          name="donorAddress"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="donationAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donations Amount</FormLabel>
              <FormControl>
                <Input type="number" className="bg-muted/20" {...field} />
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
                <Input type="text" className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="financialYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Year</FormLabel>
              <FormControl>
                <Input type="text" className="bg-muted/20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Donation Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="educationalSupport" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Educational Support
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medicalCare" />
                    </FormControl>
                    <FormLabel className="font-normal">Medical Care</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nutritionalSupport" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Nutritional Support
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="comprehensiveCare" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Comprehensive Care
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button disabled={form.formState.isSubmitting} type="submit">
            <>
              {form.formState.isSubmitting && !email ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting
                </>
              ) : (
                <>Download Thanks Letter</>
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
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting
                </>
              ) : (
                <>Email ThanksLetter</>
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ThanksLetterForm;
