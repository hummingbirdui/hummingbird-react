"use client";

import { LockKeyhole, Mail, User } from "lucide-react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Divider,
  Field,
  Input,
  InputIcon,
  Tabs,
  Text,
} from "@hummingbirdui/react";

const socials = [
  {
    name: "Google",
    src: "https://www.svgrepo.com/show/355037/google.svg",
    className: "size-5",
  },
  {
    name: "LinkedIn",
    src: "https://www.svgrepo.com/show/448234/linkedin.svg",
    className: "size-5",
  },
  {
    name: "GitHub",
    src: "https://www.svgrepo.com/show/341847/github.svg",
    className: "size-5 dark:invert",
  },
];

export default function SignUp2() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="lg:flex-row w-full max-w-xl lg:max-w-5xl rounded-2xl overflow-hidden border border-subtle/60">
        {/* left column */}
        <div className="hidden lg:flex lg:w-9/20 bg-linear-to-tl from-primary to-info-dark dark:to-info-light p-12 flex-col overflow-hidden">
          <a href="#" className="mb-20">
            <img
              src="https://themewagon.com/wp-content/themes/themewagon/dist/images/hb.png"
              alt="Logo"
              className="h-14 brightness-0 invert"
            />
          </a>

          <Text
            as="h1"
            size="5xl"
            fontWeight="bold"
            className="text-white leading-tight mb-6"
          >
            Join the future <br /> of{" "}
            <span className="text-primary-lighter/80 dark:text-primary-darker/80">
              data intelligence.
            </span>
          </Text>
          <Text
            size="lg"
            className="text-primary-lighter dark:text-primary-darker max-w-sm"
          >
            Empower your team with real-time insights and seamless
            collaboration.
          </Text>

          <div className="mt-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <Text size="lg" className="text-white italic mb-5">
              &quot;Setting up our team took minutes. The insights we&apos;ve
              gained since are invaluable.&quot;
            </Text>
            <div className="flex items-center gap-3">
              <Avatar>
                <Avatar.Fallback className="font-bold text-primary dark:text-primary-light bg-primary-lighter dark:bg-primary-darker">
                  SJ
                </Avatar.Fallback>
              </Avatar>
              <div>
                <Text
                  size="sm"
                  fontWeight="bold"
                  className="text-white leading-none mb-1.5"
                >
                  Sarah Jenkins
                </Text>
                <Text size="xs" className="text-white/80 mb-0">
                  Head of Ops at CloudScale
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* right column */}
        <Tabs
          defaultValue="signin"
          className="flex flex-col items-center lg:items-start w-full lg:w-11/20 p-6 sm:p-10 mx-auto min-h-204"
        >
          <Tabs.List variant="underline" className="mb-8">
            <Tabs.Trigger value="signin">Signin</Tabs.Trigger>
            <Tabs.Trigger value="signup">Signup</Tabs.Trigger>
          </Tabs.List>

          <div className="w-full">
            {/* signin tab */}
            <Tabs.Content value="signin">
              <div className="text-default text-center lg:text-left mb-8">
                <Text as="h2" size="3xl" className="mb-2">
                  Welcome back
                </Text>
                <Text className="text-muted">
                  Sign in to continue to your account.
                </Text>
              </div>

              <form className="space-y-5 w-full">
                <Field>
                  <Field.Label
                    htmlFor="signup-2-signin-email"
                    className="text-sm mb-1"
                  >
                    Email Address
                  </Field.Label>
                  <InputIcon>
                    <InputIcon.Start>
                      <Mail className="size-5" />
                    </InputIcon.Start>
                    <Input
                      id="signup-2-signin-email"
                      type="email"
                      size="lg"
                      placeholder="name@company.com"
                    />
                  </InputIcon>
                </Field>

                <Field>
                  <Field.Label
                    htmlFor="signup-2-signin-password"
                    className="text-sm mb-1"
                  >
                    Password
                  </Field.Label>
                  <InputIcon>
                    <InputIcon.Start>
                      <LockKeyhole className="size-5" />
                    </InputIcon.Start>
                    <Input
                      id="signup-2-signin-password"
                      type="password"
                      size="lg"
                      placeholder="••••••••"
                    />
                  </InputIcon>
                </Field>

                <div className="flex items-center justify-between -mt-3 px-1.5">
                  <div className="form-check -ms-3">
                    <Checkbox id="signup-2-remember" />
                    <label
                      htmlFor="signup-2-remember"
                      className="form-check-label text-xs"
                    >
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-xs text-muted hover:text-primary no-underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Sign In
                </Button>
              </form>

              <Divider className="my-8 text-xs text-subtle font-semibold uppercase tracking-[0.2em]">
                Or continue with
              </Divider>

              <div className="flex justify-center gap-4 mb-10">
                {socials.map((social) => (
                  <Button
                    key={social.name}
                    type="button"
                    variant="outline"
                    color="neutral"
                    size="lg"
                  >
                    <img
                      src={social.src}
                      className={social.className}
                      alt={social.name}
                    />
                  </Button>
                ))}
              </div>

              <Text size="xs" className="text-center text-muted mb-0">
                Don’t have an account?{" "}
                <a
                  href="#"
                  className="text-muted no-underline font-semibold hover:text-primary"
                >
                  Create one
                </a>
              </Text>
            </Tabs.Content>

            {/* signup tab */}
            <Tabs.Content value="signup">
              <div className="text-default text-center lg:text-left mb-8">
                <Text as="h2" size="3xl" className="mb-2">
                  Create your account
                </Text>
                <Text className="text-muted">
                  Start your{" "}
                  <span className="font-medium text-primary">
                    14-day free trial
                  </span>{" "}
                  today.
                </Text>
              </div>

              <form className="space-y-5 w-full">
                <div className="grid grid-cols-1 gap-5">
                  <Field>
                    <Field.Label
                      htmlFor="signup-2-signup-name"
                      className="text-sm mb-1"
                    >
                      Full Name
                    </Field.Label>
                    <InputIcon>
                      <InputIcon.Start>
                        <User className="size-5" />
                      </InputIcon.Start>
                      <Input
                        id="signup-2-signup-name"
                        type="text"
                        size="lg"
                        placeholder="John Doe"
                      />
                    </InputIcon>
                  </Field>

                  <Field>
                    <Field.Label
                      htmlFor="signup-2-signup-email"
                      className="text-sm mb-1"
                    >
                      Email Address
                    </Field.Label>
                    <InputIcon>
                      <InputIcon.Start>
                        <Mail className="size-5" />
                      </InputIcon.Start>
                      <Input
                        id="signup-2-signup-email"
                        type="email"
                        size="lg"
                        placeholder="name@company.com"
                      />
                    </InputIcon>
                  </Field>

                  <Field>
                    <div className="flex justify-between items-center">
                      <Field.Label
                        htmlFor="signup-2-signup-password"
                        className="text-sm mb-1"
                      >
                        Password
                      </Field.Label>
                      <span className="text-xs text-subtle">Min. 8 Chars</span>
                    </div>
                    <InputIcon>
                      <InputIcon.Start>
                        <LockKeyhole className="size-5" />
                      </InputIcon.Start>
                      <Input
                        id="signup-2-signup-password"
                        type="password"
                        size="lg"
                        placeholder="••••••••"
                      />
                    </InputIcon>
                  </Field>
                </div>

                <div className="form-check -ms-2 -mt-4">
                  <Checkbox id="signup-2-terms" />
                  <label
                    htmlFor="signup-2-terms"
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

              <Divider className="my-8 text-xs text-subtle font-semibold uppercase tracking-[0.2em]">
                Or join with
              </Divider>

              <div className="flex justify-center gap-4 mb-10">
                {socials.map((social) => (
                  <Button
                    key={social.name}
                    type="button"
                    variant="outline"
                    color="neutral"
                    size="lg"
                  >
                    <img
                      src={social.src}
                      className={social.className}
                      alt={social.name}
                    />
                  </Button>
                ))}
              </div>

              <Text size="xs" className="text-center text-muted mb-0">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-muted no-underline font-semibold hover:text-primary"
                >
                  Sign in here
                </a>
              </Text>
            </Tabs.Content>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
