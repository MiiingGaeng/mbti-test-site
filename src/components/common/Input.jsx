const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="w-5/6 rounded-lg px-4 text-sm"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
