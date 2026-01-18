import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export const metadata = {
  title: "Create Account | VÉRA",
};

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          VÉRA
        </Link>
        <h1 className="text-2xl font-semibold mt-6">Create an account</h1>
        <p className="text-muted-foreground mt-2">
          Track orders and save your details
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
