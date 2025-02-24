const Input = ({
  type,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength
}) => {
  return (
    <input
      className="w-5/6 rounded-lg px-4 text-sm"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

export default Input;
