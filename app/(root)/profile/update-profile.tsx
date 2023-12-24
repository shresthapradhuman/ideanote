"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UpdateProfileSchema } from "@/app/schemaValidation";

type UpdateProfileForm = z.infer<typeof UpdateProfileSchema>;
const UpdateProfile = () => {
  const { data: Session, update } = useSession();
  const [previewImage, setPreviewImage] = React.useState<string>(
    Session?.user.image || ""
  );
  const router = useRouter();
  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: Session?.user.name || "",
      email: Session?.user.email || "",
      image: "",
    },
  });
  const onSubmit = async (data: UpdateProfileForm) => {
    try {
      const response = await axios.patch(
        `/api/users/${Session?.user.email}`,
        data
      );
      if (response.status === 200) {
        await update({
          name: response.data.name,
          image: response.data.image,
        });
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-5"
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={previewImage} alt="avatar" />
            <AvatarFallback>
              <Skeleton className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-inherit border px-4 py-2 rounded-lg">
                  Change
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          let reader = new FileReader();
                          reader.onload = (e) => {
                            field.onChange(e.target?.result);
                            setPreviewImage(e.target?.result as string);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Name</FormLabel>
              <FormControl>
                <Input placeholder="What shall I call you?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Email</FormLabel>
              <FormControl>
                <Input
                  disabled
                  type="email"
                  placeholder="Email"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <Button
            type="submit"
            variant={"default"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProfile;
