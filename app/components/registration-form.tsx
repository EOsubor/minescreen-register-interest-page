"use client";

import { useActionState, useState } from "react";
import { registerInterest } from "@/app/lib/actions";
import { INTEREST_AREAS, type FormState } from "@/app/lib/schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckboxGroup } from "./ui/checkbox-group";

const initialState: FormState = {
  success: false,
  message: "",
};

type FormAction = (formData: FormData) => void | Promise<void>;

type RegistrationFormViewProps = {
  state: FormState;
  formAction: FormAction;
  isPending: boolean;
};

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerInterest, initialState);

  return (
    <RegistrationFormView
      state={state}
      formAction={formAction}
      isPending={isPending}
    />
  );
}

export function RegistrationFormView({ state, formAction, isPending }: RegistrationFormViewProps) {
  const [otherChecked, setOtherChecked] = useState(false);
  const showOtherField = otherChecked || Boolean(state.errors?.other_interest?.length);

  if (state.success && state.message) {
    return (
      <section id="register" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-copper/30 bg-copper/5 p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-copper/20">
              <svg
                className="h-8 w-8 text-copper-light"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-off-white">You&apos;re Registered</h3>
            <p className="mt-3 text-off-white/60 leading-relaxed">{state.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 border-t border-off-white/5">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10 sm:mb-12 reveal">
          <p className="font-mono text-sm tracking-widest text-copper-light uppercase mb-3">
            Stay in the Loop
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white">
            Register Your Interest
          </h2>
          <p className="mt-4 text-off-white/60 leading-relaxed">
            Be the first to hear about demo availability, product updates, and MVP access.
          </p>
        </div>

        <form
          action={formAction}
          className="reveal relative rounded-2xl border border-off-white/5 bg-surface-mid/20 backdrop-blur-sm p-6 sm:p-8 space-y-5 sm:space-y-6"
        >
          {/* Honeypot */}
          <div style={{ display: "none" }} aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {state.message && !state.success && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
              {state.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="full_name"
              required
              placeholder="Jane Smith"
              error={state.errors?.full_name}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              required
              placeholder="jane@company.com"
              error={state.errors?.email}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Company / Organization"
              name="company"
              placeholder="Acme Mining Corp"
              error={state.errors?.company}
            />
            <Input
              label="Role / Title"
              name="role_title"
              placeholder="Portfolio Manager"
              error={state.errors?.role_title}
            />
          </div>

          <CheckboxGroup
            label="Areas of Interest"
            name="interest_areas"
            options={INTEREST_AREAS}
            required
            error={state.errors?.interest_areas}
            onChange={(event) => {
              if (event.target.value === "Other") {
                setOtherChecked(event.target.checked);
              }
            }}
          />

          {showOtherField ? (
            <Input
              label="Other Interest (optional)"
              name="other_interest"
              placeholder="Describe any specific use case..."
              error={state.errors?.other_interest}
            />
          ) : (
            <input type="hidden" name="other_interest" value="" />
          )}

          <Textarea
            label="Message (optional)"
            name="message"
            placeholder="Anything else you'd like us to know?"
            error={state.errors?.message}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-center text-xs text-off-white/30">
            Your information is kept confidential and used only for MineScreen updates.
          </p>
        </form>
      </div>
    </section>
  );
}
