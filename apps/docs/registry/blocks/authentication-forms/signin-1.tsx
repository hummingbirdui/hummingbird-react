"use client";

import {
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  Input,
  Text,
} from "@hummingbirdui/react";

export default function SignIn1() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-subtle rounded-2xl p-10">
        <div className="mb-8 text-center">
          <Text as="h2" size="3xl" className="text-default mb-3">
            Welcome Back
          </Text>
          <Text fontWeight="medium" className="text-muted">
            Enter your details to access your account
          </Text>
        </div>

        <Button variant="subtle" color="neutral" size="lg" className="gap-3">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="size-5"
            alt="Google"
          />
          Continue with Google
        </Button>

        <Divider className="my-6 text-xs text-subtle font-semibold uppercase tracking-[0.2em]">
          Secure Email Login
        </Divider>

        <form className="space-y-5 mb-12">
          <Field>
            <Field.Label htmlFor="signin-1-email">Email</Field.Label>
            <Input
              id="signin-1-email"
              type="email"
              size="lg"
              placeholder="name@company.com"
            />
          </Field>
          <Field className="mb-10">
            <Field.Label htmlFor="signin-1-password">Password</Field.Label>
            <Input
              id="signin-1-password"
              type="password"
              size="lg"
              placeholder="••••••••"
            />
          </Field>

          <div className="flex items-center justify-between -mt-9 -ms-1.5">
            <div className="form-check">
              <Checkbox id="signin-1-remember" />
              <label
                htmlFor="signin-1-remember"
                className="form-check-label text-xs"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-xs font-semibold no-underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Sign In
          </Button>
        </form>

        <Text
          size="sm"
          fontWeight="medium"
          className="m-0 text-center text-subtle"
        >
          New to the platform?{" "}
          <a href="#" className="no-underline">
            Join for free
          </a>
        </Text>
      </Card>
    </section>
  );
}
