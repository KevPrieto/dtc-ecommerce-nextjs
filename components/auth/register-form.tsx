"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(signUp, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
        />
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
