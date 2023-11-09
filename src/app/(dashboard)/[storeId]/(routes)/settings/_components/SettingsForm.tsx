"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertModal } from "@/components/modals/alert-modal";
import { useOrigin } from "../../../../../../../hooks/use-origin";

const formShema = z.object({
  name: z.string().min(2),
});

type SettingsFromValues = z.infer<typeof formShema>;

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFromValues>({
    resolver: zodResolver(formShema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFromValues) => {
    // console.log(data);
    try {
      setLoading(true);
      await axios.patch(`/api/stories/${params.storeId}`, data);
      router.refresh();
      console.log("Категория обновлена");
    } catch (error) {
      console.log("Что то произошло", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      console.log("Категория удалена");
    } catch (error: any) {
      console.log("Что то произошло", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Настройки" description="Изменить название категории" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Название категории"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Сохранить изменения
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
