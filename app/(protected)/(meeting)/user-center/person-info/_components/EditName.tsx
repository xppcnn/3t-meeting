"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editNameFormType } from "@/actions/auth/types";
import { editNameFormSchema } from "@/actions/auth/schema";
import { editName } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";

const EditName = ({ name, userId }: { name: string; userId: string }) => {
  const { execute, isLoading } = useAction(editName, {
    onSuccess: () => {
      setEditing(false);
    },
  });
  const [editing, setEditing] = useState(false);
  const form = useForm<editNameFormType>({
    resolver: zodResolver(editNameFormSchema),
    defaultValues: {
      name,
    },
  });
  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => {
      form.setValue("name", name);
      form.setFocus("name");
    });
  };

  const cancelEdit = () => {
    setEditing(false);
    form.reset();
  };

  const onSubmit = async (formData: FormData) => {
    const flag = await form.trigger();
    if (flag) {
      const name = formData.get("name") as string;
      execute({ userId, name });
    }
  };

  if (editing) {
    return (
      <Form {...form}>
        <form className="flex gap-4" action={onSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-[#006eff]"
            variant="ghost"
            disabled={isLoading}
          >
            保存
          </Button>
          <Button variant="ghost" onClick={cancelEdit}>
            取消
          </Button>
        </form>
      </Form>
    );
  }
  return (
    <div className="flex gap-1 items-center">
      <span>{name}</span>
      <CiEdit size={16} color="#006eff" onClick={handleEdit} />
    </div>
  );
};

export default EditName;
