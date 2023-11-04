"use client";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";

import { Icons } from "./Icons";
import { signIn } from "next-auth/react";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const LoginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google", { callbackUrl: "http://localhost:300/admin" });
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Ошибка авторизации через Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size="sm"
        className="w-full"
        onClick={LoginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
