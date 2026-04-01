type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  value: string;
  placeholder: string;
  options: Option[];
  className?: string;
  onChange: (value: string) => void;
  showClearButton?: boolean;
};

const SelectField = ({
  value,
  placeholder,
  options,
  className = "",
  onChange,
  showClearButton = true,
}: SelectFieldProps) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white w-full border border-gray-300 pr-10 appearance-none select ${className}`}
      >
        <option disabled value="">
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {showClearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-red-600 cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SelectField;
