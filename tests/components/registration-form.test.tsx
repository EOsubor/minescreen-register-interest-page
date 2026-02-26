import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm, RegistrationFormView } from "@/app/components/registration-form";
import type { FormState } from "@/app/lib/schema";

describe("RegistrationForm", () => {
  const noopAction = async () => {};

  test("renders the registration form shell", () => {
    render(<RegistrationForm />);

    expect(screen.getByText("Register Your Interest")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^register$/i })).toBeInTheDocument();
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

  test("shows other interest input only when Other is selected", async () => {
    const user = userEvent.setup();
    const state: FormState = {
      success: false,
      message: "",
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending={false}
      />
    );

    expect(screen.queryByLabelText(/other interest/i)).not.toBeInTheDocument();

    await user.click(screen.getByLabelText("Other"));
    expect(screen.getByLabelText(/other interest/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText("Other"));
    expect(screen.queryByLabelText(/other interest/i)).not.toBeInTheDocument();
  });

  test("does not show other interest when a non-Other option is selected", async () => {
    const user = userEvent.setup();
    const state: FormState = {
      success: false,
      message: "",
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending={false}
      />
    );

    await user.click(screen.getByLabelText("Portfolio Due Diligence"));
    expect(screen.queryByLabelText(/other interest/i)).not.toBeInTheDocument();
  });

  test("shows other interest input when errors include other_interest", () => {
    const state: FormState = {
      success: false,
      message: "Please fix the errors below.",
      errors: {
        other_interest: ["Please describe your other interest"],
      },
    };

    render(
      <RegistrationFormView
        state={state}
        formAction={noopAction}
        isPending={false}
      />
    );

    expect(screen.getByLabelText(/other interest/i)).toBeInTheDocument();
  });
});
