import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CheckboxGroup } from "@/app/components/ui/checkbox-group";

describe("UI components", () => {
  test("Button renders primary and outline variants", () => {
    render(
      <div>
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    );

    expect(screen.getByRole("button", { name: "Primary" })).toHaveClass("bg-copper");
    expect(screen.getByRole("button", { name: "Outline" })).toHaveClass("border-copper/40");
  });

  test("Input uses label-derived id and shows errors", () => {
    render(
      <Input
        label="Full Name"
        name="full_name"
        required
        placeholder="Jane Smith"
        error={["Name is required", "Name must be at least 2 characters"]}
      />
    );

    const input = screen.getByLabelText(/full name/i);
    expect(input).toHaveAttribute("id", "full_name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("Input respects explicit id", () => {
    render(<Input label="Email Address" id="email-field" name="email" />);

    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute("id", "email-field");
  });

  test("Textarea updates character count", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Message" name="message" />);

    expect(screen.getByText("0/1000")).toBeInTheDocument();

    const textarea = screen.getByLabelText(/message/i);
    await user.type(textarea, "Hi");

    expect(screen.getByText("2/1000")).toBeInTheDocument();
  });

  test("Textarea supports required, errors, and onChange", async () => {
    const user = userEvent.setup();
    let called = false;
    const handleChange = () => {
      called = true;
    };

    render(
      <Textarea
        label="Details"
        id="details-field"
        name="details"
        required
        error={["Too long", "Exceeded limit"]}
        maxLength={10}
        onChange={handleChange}
      />
    );

    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("0/10")).toBeInTheDocument();
    expect(screen.getByText("Too long")).toBeInTheDocument();

    const textarea = screen.getByLabelText(/details/i);
    await user.type(textarea, "OK");

    expect(called).toBe(true);
    expect(screen.getByText("2/10")).toBeInTheDocument();
  });

  test("CheckboxGroup renders required indicator and errors", () => {
    render(
      <CheckboxGroup
        label="Areas of Interest"
        name="interest_areas"
        options={["Option A", "Option B"]}
        required
        error={["Select at least one", "Choose a preference"]}
      />
    );

    expect(screen.getByText("Areas of Interest")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("Select at least one")).toBeInTheDocument();
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
  });

  test("CheckboxGroup renders without required indicator or errors", () => {
    render(
      <CheckboxGroup
        label="Preferences"
        name="prefs"
        options={["Alpha"]}
      />
    );

    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.queryByText("*")).not.toBeInTheDocument();
    expect(screen.queryByText("Select at least one")).not.toBeInTheDocument();
  });
});
