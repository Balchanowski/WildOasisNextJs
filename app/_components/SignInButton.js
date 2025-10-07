"use client";
import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
      onClick={() => signIn("google", { callbackUrl: "/account" })}
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
