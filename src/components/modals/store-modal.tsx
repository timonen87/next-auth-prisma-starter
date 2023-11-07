"use client";
import * as z from "zod";
import { useStoreModal } from "../../../hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, "Введите значение от 3 символов"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      console.log(response.data);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Что то произошло",
        variant: "destructive",
      });
    } finally {
      setLoading(false);

      toast({
        title: "Категория успешно создана",
        description: "Saccesfully",
      });
    }
  };

  return (
    <Modal
      title="Создать категорию"
      description="Добавить описание для новой категории"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Категория"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <div className="p-6 flex items-center justify-end gap-2">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModal.onClose}
                  >
                    Закрыть
                  </Button>
                  <Button disabled={loading} type="submit">
                    Создать
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
