"use client";

import { Button, Card, Field, Input, Text } from "@hummingbirdui/react";

const socials = [
  { name: "Google", src: "https://www.svgrepo.com/show/355037/google.svg" },
  { name: "LinkedIn", src: "https://www.svgrepo.com/show/448234/linkedin.svg" },
  {
    name: "Microsoft",
    src: "https://www.svgrepo.com/show/448239/microsoft.svg",
  },
];

export default function SignIn3() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-5xl">
        <Card className="md:col-span-7 p-8 md:p-12 rounded-2xl border-subtle">
          <Text as="h1" size="3xl" className="text-default mb-3">
            Welcome Back
          </Text>
          <Text className="text-muted mb-10">
            Enter your details to sync your workspace.
          </Text>

          <form className="space-y-5">
            <Field>
              <Field.Label htmlFor="signin-3-email">Email</Field.Label>
              <Input
                id="signin-3-email"
                type="email"
                size="lg"
                color="info"
                placeholder="ray@example.io"
              />
            </Field>
            <Field className="mb-10">
              <div className="flex justify-between items-center">
                <Field.Label htmlFor="signin-3-password">Password</Field.Label>
                <a
                  href="#"
                  className="text-xs text-info font-bold no-underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="signin-3-password"
                type="password"
                size="lg"
                color="info"
                placeholder="••••••••"
              />
            </Field>

            <Button type="submit" color="info" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
        </Card>

        <div className="md:col-span-5 space-y-4">
          <Card className="flex-1 p-8 rounded-2xl border-subtle space-y-3">
            <Text
              fontWeight="semibold"
              className="uppercase tracking-widest text-subtle mb-6 text-center"
            >
              Social Connect
            </Text>
            {socials.map((social) => (
              <Button
                key={social.name}
                variant="subtle"
                color="neutral"
                size="lg"
                className="text-sm gap-3 border-subtle w-full"
              >
                <img src={social.src} className="size-5" alt={social.name} />
                {social.name}
              </Button>
            ))}
          </Card>

          <div className="bg-info rounded-2xl p-8 text-white relative overflow-hidden group">
            <Text as="h3" size="xl" fontWeight="bold" className="mb-2">
              New here?
            </Text>
            <Text size="sm" className="mb-6">
              Join 10k+ developers and start building today.
            </Text>
            <Button
              color={null}
              className="text-white bg-white/20 backdrop-blur-md border-white/30 rounded-full"
            >
              Create Account
            </Button>
            <div className="absolute -bottom-10 -right-10 size-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
