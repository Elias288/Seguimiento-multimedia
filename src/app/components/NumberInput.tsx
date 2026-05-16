type NumberInputProps = {
  title: string;
  max?: number;
  min: number;
  value: number;
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export const NumberInput = ({
  title,
  name,
  max,
  min,
  value,
  onChange,
  onFocus,
}: NumberInputProps) => {
  const updateValue = (newValue: number) => {
    const fakeEvent = {
      target: {
        name,
        value: String(newValue),
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  const incrementDecrement = (type: "increment" | "decrement") => {
    const numberVal = Number(value);
    switch (type) {
      case "increment":
        updateValue(
          max !== undefined ? Math.min(max, numberVal + 1) : numberVal + 1,
        );
        break;
      case "decrement":
        updateValue(Math.max(0, numberVal - 1));
        break;
    }
  };

  return (
    <label
      htmlFor={name}
      className="grid grid-cols-[2rem_auto_2rem] h-min gap-0.5"
    >
      <span className="col-span-full">{title}</span>

      <button
        type="button"
        onClick={() => incrementDecrement("decrement")}
        className="bg-background2 px-2 cursor-pointer rounded-tl-xl rounded-bl-xl hover:opacity-70"
      >
        -
      </button>

      <input
        type="number"
        id={name}
        name={name}
        max={max}
        min={min}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className="w-full text-gray-400 rounded-sm outline-gray-700 focus-visible:outline-0 bg-input px-2"
      />

      <button
        type="button"
        onClick={() => incrementDecrement("increment")}
        className="bg-background2 px-2 cursor-pointer rounded-tr-xl rounded-br-xl hover:opacity-70"
      >
        +
      </button>
    </label>
  );
};
