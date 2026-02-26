"use client";

import { TextareaHTMLAttributes, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string[];
}

export function Textarea({ label, error, id, maxLength = 1000, onChange, ...rest }: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  const errorId = error?.length ? `${textareaId}-error` : undefined;
  const [charCount, setCharCount] = useState(0);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={textareaId} className="block text-sm font-medium text-off-white/80">
          {label}
          {rest.required && <span className="text-copper-light ml-1">*</span>}
        </label>
        <span className="text-xs text-off-white/30 font-mono">
          {charCount}/{maxLength}
        </span>
      </div>
      <textarea
        id={textareaId}
        maxLength={maxLength}
        rows={3}
        aria-describedby={errorId}
        aria-invalid={error?.length ? true : undefined}
        onChange={(e) => {
          setCharCount(e.target.value.length);
          onChange?.(e);
        }}
        className={`w-full rounded-lg border bg-surface-mid/50 px-4 py-2.5 text-off-white placeholder:text-off-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-base resize-none ${
          error?.length
            ? "border-red-500/60 focus:ring-red-500/40"
            : "border-off-white/10 focus:border-copper/50 focus:ring-copper/30"
        }`}
        {...rest}
      />
      {error?.map((e, i) => (
        <p key={e} id={i === 0 ? errorId : undefined} className="text-sm text-red-400" role="alert">
          {e}
        </p>
      ))}
    </div>
  );
}
