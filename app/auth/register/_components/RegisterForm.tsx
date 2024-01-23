"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@/actions/auth/schema";
import { registerFormType } from "@/actions/auth/types";
import { useAction } from "@/hooks/useAction";
import { register } from "@/actions/auth";

const formSchema = registerFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "密码不一致",
    path: ["confirmPassword"], // 错误路径
  }
);

const RegisterForm = () => {
  const form = useForm<registerFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { execute } = useAction(register, {
    onError(error) {
      toast.error(error);
    },
    onSuccess(data, msg) {
      toast.success(msg);
    },
  });

  const onSubmit = async () => {
    const flag = await form.trigger();
    if (flag) {
      const values: registerFormType = form.getValues();
      execute(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>账号</FormLabel>
              <FormControl>
                <Input placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button type="submit" className="w-full mt-4 mb-2" onClick={onSubmit}>
        注册
      </Button>
    </Form>
  );
};

export default RegisterForm;
