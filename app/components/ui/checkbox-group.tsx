interface CheckboxGroupProps {
  label: string;
  name: string;
  options: readonly string[];
  error?: string[];
  required?: boolean;
}

export function CheckboxGroup({ label, name, options, error, required }: CheckboxGroupProps) {
  const errorId = error?.length ? `${name}-error` : undefined;

  return (
    <fieldset className="space-y-3" aria-required={required} aria-describedby={errorId}>
      <legend className="block text-sm font-medium text-off-white/80">
        {label}
        {required && <span className="text-copper-light ml-1">*</span>}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-lg border border-off-white/10 bg-surface-mid/30 px-4 py-2.5 cursor-pointer transition-colors hover:border-copper/30 hover:bg-surface-mid/50 has-[:checked]:border-copper/50 has-[:checked]:bg-copper/10"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="h-4 w-4 rounded border-off-white/20 bg-surface-mid text-copper focus:ring-copper/30 focus:ring-offset-0"
            />
            <span className="text-sm text-off-white/80">{option}</span>
          </label>
        ))}
      </div>
      {error?.map((e, i) => (
        <p key={e} id={i === 0 ? errorId : undefined} className="text-sm text-red-400" role="alert">
          {e}
        </p>
      ))}
    </fieldset>
  );
}
