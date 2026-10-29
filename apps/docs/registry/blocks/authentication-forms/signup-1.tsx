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

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "250ms", label: "Avg. Latency" },
];

export default function SignUp1() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-2xl lg:max-w-5xl flex-row border-subtle rounded-2xl overflow-hidden">
        {/* left column */}
        <div className="hidden lg:flex flex-col p-16 bg-default">
          <a href="#" className="mb-14">
            <img
              src="https://themewagon.com/wp-content/themes/themewagon/dist/images/hb.png"
              alt="Logo"
              className="h-14 dark:brightness-0 dark:invert"
            />
          </a>

          <Text as="h1" size="6xl" className="text-default mb-6">
            Elevate your
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-secondary to-primary">
              workflow.
            </span>
          </Text>

          <Text size="lg" className="text-muted max-w-sm mb-10">
            Join the next generation of creators building high-performance
            interfaces with our refined design system.
          </Text>

          <div className="flex gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Text as="h4" className="text-default tracking-tight mb-2">
                  {stat.value}
                </Text>
                <Text
                  size="xs"
                  fontWeight="medium"
                  className="uppercase tracking-widest text-muted"
                >
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>

          <Text
            size="xs"
            fontWeight="medium"
            className="mt-auto pt-6 border-t border-subtle tracking-[0.2em] text-muted uppercase"
          >
            Trusted by 500+ modern teams
          </Text>
        </div>

        {/* right column */}
        <div className="p-8 md:p-14 flex-1">
          <div className="mb-10 text-default text-center lg:text-left">
            <Text as="h4" className="tracking-tight mb-2">
              Get Started
            </Text>
            <Text size="sm" fontWeight="medium" className="text-muted">
              Create your account to start building.
            </Text>
          </div>

          <form className="space-y-5">
            <div className="flex gap-4">
              <Field className="flex-1">
                <Field.Label htmlFor="signup-1-first-name" className="ms-1">
                  First Name
                </Field.Label>
                <Input
                  id="signup-1-first-name"
                  type="text"
                  variant="fill"
                  size="lg"
                  placeholder="John"
                />
              </Field>
              <Field className="flex-1">
                <Field.Label htmlFor="signup-1-last-name" className="ms-1">
                  Last Name
                </Field.Label>
                <Input
                  id="signup-1-last-name"
                  type="text"
                  variant="fill"
                  size="lg"
                  placeholder="Doe"
                />
              </Field>
            </div>

            <Field>
              <Field.Label htmlFor="signup-1-email" className="ms-1">
                Email Address
              </Field.Label>
              <Input
                id="signup-1-email"
                type="email"
                variant="fill"
                size="lg"
                placeholder="john@example.com"
              />
            </Field>

            <Field>
              <Field.Label htmlFor="signup-1-password" className="ms-1">
                Password
              </Field.Label>
              <Input
                id="signup-1-password"
                type="password"
                variant="fill"
                size="lg"
                placeholder="••••••••"
              />
            </Field>

            <div className="form-check -ms-2 -mt-4">
              <Checkbox id="signup-1-terms" />
              <label
                htmlFor="signup-1-terms"
                className="form-check-label text-xs"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                .
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <Divider className="my-10 text-xs text-subtle font-semibold uppercase tracking-[0.2em]">
            Or continue with
          </Divider>

          <div className="flex gap-4 mb-10">
            <Button
              variant="subtle"
              color="neutral"
              size="lg"
              className="gap-3 text-sm flex-1"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="size-4"
                alt="Google"
              />
              Google
            </Button>
            <Button
              variant="subtle"
              color="neutral"
              size="lg"
              className="gap-3 text-sm flex-1"
            >
              <img
                src="https://www.svgrepo.com/show/341847/github.svg"
                className="size-4 dark:invert"
                alt="GitHub"
              />
              GitHub
            </Button>
          </div>

          <Text size="xs" className="text-center tracking-wide">
            Already a member?{" "}
            <a
              href="#"
              className="text-muted no-underline font-semibold hover:text-primary"
            >
              Sign in here
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
}
