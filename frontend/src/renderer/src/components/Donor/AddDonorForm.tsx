import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { Button } from "@renderer/components/ui/button";
import { useCreateDonorMutation } from "@renderer/hooks/api/donorApi";
import { AddDonorModalProps as AddDonorFormProps } from "./AddDonorModal";
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
// import { useNavigate } from "react-router-dom";

// Define the schema for the Donor type
const donorSchema = z.object({
  name: z.string().min(1),
  birthDate: z.date(),
  email: z.string().email(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
  identificationNo: z.string().optional(),
});

const AddDonorForm = ({ name }: AddDonorFormProps) => {
  //   const navigate = useNavigate();

  const createDonorMutation = useCreateDonorMutation();

  // Initialize form with default values and schema validation
  const form = useForm<z.infer<typeof donorSchema>>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      name: name,
      birthDate: undefined,
      email: undefined,
      contactNo: undefined,
      address: undefined,
      identificationNo: undefined,
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof donorSchema>) {
    // Perform registration logic here
    // console.log("Submitted values:", values.birthDate.toISOString());
    await createDonorMutation.mutateAsync({
      ...values,
      birthDate: values.birthDate,
    });
    // navigate("/login"); // Redirect after successful registration
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  required
                    className="bg-muted/20"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted/20"
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted/20"
                    type="tel"
                    placeholder="Contact No"
                    {...field}
                  />
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted/20"
                    placeholder="Address"
                    {...field}
                  />
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
                <FormLabel>Identification No</FormLabel>
                <FormControl>
                  <Input
                    className="bg-muted/20"
                    placeholder="Identification No"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit">
            <>
              {form.formState.isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting
                </>
              ) : (
                <>Register</>
              )}
            </>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddDonorForm;
