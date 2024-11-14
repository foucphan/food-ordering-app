"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInprogress, setLoginInprogress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.prevenDefault();
    setLoginInprogress(true);

    await signIn("credentials");

    setLoginInprogress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          disabled={loginInprogress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          value={password}
          disabled={loginInprogress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={loginInprogress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt={""} width={32} height={32} />
          Login with Google
        </button>
      </form>
    </section>
  );
}
