import type { ChangeEvent, FocusEvent, KeyboardEvent, Ref } from "react";

type CustomInputProps = {
  title?: string;
  name: string;
  ref?: Ref<HTMLInputElement>;
  type?: "text" | "number" | "textarea" | "url";
  max?: number;
  min?: number;
  value: string | number;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: "on" | "off";
  required?: boolean;
};
const CustomInput = ({
  title = undefined,
  name,
  ref,
  type = "text",
  max = undefined,
  min = 0,
  value,
  onChange,
  onBlur,
  onKeyDown,
  onFocus,
  autoComplete = "off",
  required = false,
}: CustomInputProps) => {
  return (
    <>
      {title}
      {type !== "textarea" ? (
        <input
          type={type}
          name={name}
          ref={ref}
          max={max}
          min={min}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
          autoComplete={autoComplete}
          required={required}
        />
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-gray-400 h-20 rounded-sm outline-gray-700 focus-visible:outline-0 bg-gray-900 px-2"
        ></textarea>
      )}
    </>
  );
};

export default CustomInput;
