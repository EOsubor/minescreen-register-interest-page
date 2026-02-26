import { render, screen } from "@testing-library/react";
import { RegistrationForm, RegistrationFormView } from "@/app/components/registration-form";
import type { FormState } from "@/app/lib/schema";

describe("RegistrationForm", () => {
  const noopAction = async () => {};

  test("renders the registration form shell", () => {
    render(<RegistrationForm />);

    expect(screen.getByText("Register Your Interest")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register for pdac 2026/i })).toBeInTheDocument();
  });

  test("renders validation errors when state includes them", () => {
    const state: FormState = {
      success: false,
      message: "Please fix the errors below.",
      errors: {
        full_name: ["Name is required"],
      },
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending={false}
      />
    );

    expect(screen.getByText("Please fix the errors below.")).toBeInTheDocument();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  test("renders pending state in the submit button", () => {
    const state: FormState = {
      success: false,
      message: "",
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending
      />
    );

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });

  test("renders confirmation when registration succeeds", () => {
    const state: FormState = {
      success: true,
      message: "Thanks for registering.",
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending={false}
      />
    );

    expect(screen.getByText("You're Registered")).toBeInTheDocument();
    expect(screen.getByText("Thanks for registering.")).toBeInTheDocument();
  });
});
