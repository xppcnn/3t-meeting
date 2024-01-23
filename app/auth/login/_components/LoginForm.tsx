"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormType } from "@/actions/auth/types";
import { useAction } from "@/hooks/useAction";
import { login } from "@/actions/auth";
import FormError from "@/components/FormError";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "请输入正确的邮箱格式",
  }),
  password: z.string().min(1, {
    message: "请输入密码",
  }),
});

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "该邮箱已被其他登录方式使用"
      : "";
  const { execute } = useAction(login, {
    onError(error) {
      setError(error);
    },
    onSuccess(data, msg) {
      toast.info(msg);
    },
  });
  const form = useForm<loginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const flag = await form.trigger();
    if (flag) {
      const values = form.getValues();
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
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="请输入邮箱" {...field} type="email" />
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
        <FormError message={error || urlError} />
      </form>
      <Button type="submit" className="w-full mt-4 mb-2" onClick={onSubmit}>
        登录
      </Button>
      <div className="flex justify-between text-xs">
        <Link href="/auth/register" className="text-[#7b818f]">
          忘记密码
        </Link>
        <Link href="/auth/register" className="text-[#006fff]">
          免费注册
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
