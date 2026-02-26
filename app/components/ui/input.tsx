import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string[];
}

export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  const errorId = error?.length ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-off-white/80">
        {label}
        {props.required && <span className="text-copper-light ml-1">*</span>}
      </label>
      <input
        id={inputId}
        aria-describedby={errorId}
        aria-invalid={error?.length ? true : undefined}
        className={`w-full rounded-lg border bg-surface-mid/50 px-4 py-2.5 text-off-white placeholder:text-off-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-base ${
          error?.length
            ? "border-red-500/60 focus:ring-red-500/40"
            : "border-off-white/10 focus:border-copper/50 focus:ring-copper/30"
        }`}
        {...props}
      />
      {error?.map((e, i) => (
        <p key={e} id={i === 0 ? errorId : undefined} className="text-sm text-red-400" role="alert">
          {e}
        </p>
      ))}
    </div>
  );
}
