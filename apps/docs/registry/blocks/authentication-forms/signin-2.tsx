"use client";

import {
  Button,
  Card,
  Checkbox,
  Divider,
  FloatingLabel,
  Input,
  Text,
} from "@hummingbirdui/react";

export default function SignIn2() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-xl bg-transparent border-0">
        <div className="mb-8 flex items-baseline justify-between text-default">
          <Text as="h2" size="3xl" className="mb-3">
            Login
          </Text>
          <Text
            size="sm"
            fontWeight="medium"
            className="m-0 text-center text-muted"
          >
            Don&apos;t have an account?{" "}
            <a href="#" className="no-underline">
              Signup
            </a>
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            variant="subtle"
            color="neutral"
            size="lg"
            className="gap-3 flex-1"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="size-5"
              alt="Google"
            />
            Signin with Google
          </Button>
          <Button
            variant="subtle"
            color="neutral"
            size="lg"
            className="gap-3 flex-1"
          >
            <img
              src="https://www.svgrepo.com/show/448239/microsoft.svg"
              className="size-5"
              alt="Microsoft"
            />
            Signin with Microsoft
          </Button>
        </div>

        <Divider className="my-6 text-xs text-subtle font-semibold uppercase tracking-[0.2em]">
          or use email
        </Divider>

        <form className="space-y-5 mb-16">
          <FloatingLabel
            htmlFor="signin-2-email"
            label="Email"
            className="form-field"
          >
            <Input id="signin-2-email" type="email" variant="fill" />
          </FloatingLabel>

          <FloatingLabel
            htmlFor="signin-2-password"
            label="Password"
            className="form-field"
          >
            <Input id="signin-2-password" type="password" variant="fill" />
          </FloatingLabel>

          <div className="flex items-center justify-between -mt-4 -ms-1.5">
            <div className="form-check">
              <Checkbox id="signin-2-remember" />
              <label
                htmlFor="signin-2-remember"
                className="form-check-label text-xs"
              >
                Remember this device
              </label>
            </div>
            <a href="#" className="text-xs font-semibold no-underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Log In
          </Button>
        </form>

        <Text size="sm" fontWeight="medium" className="text-center m-0">
          <a href="#" className="no-underline">
            Trouble signing in?
          </a>
        </Text>
      </Card>
    </section>
  );
}
