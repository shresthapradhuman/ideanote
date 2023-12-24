"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <div className="flex items-center justify-center py-44 px-4 md:px-0">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription className="text-base">
            Please enter your login credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg font-normal"
            onClick={() => {
              signIn("google", {
                callbackUrl: callbackUrl ? callbackUrl : "/",
              });
            }}
          >
            <i className="ri-google-fill mr-2 text-2xl"></i>
            Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
