import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata = {
  title: "Sign In | CALM FORM",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          CALM FORM
        </Link>
        <h1 className="text-2xl font-semibold mt-6">Welcome back</h1>
        <p className="text-muted-foreground mt-2">Sign in to your account</p>
      </div>

      <LoginForm />

      <p className="text-xs text-center text-muted-foreground">
        Or continue as guest at checkout
      </p>
    </div>
  );
}
