const Button = ({ onClick, children }) => {
  return (
    <button
      className="w-36 h-10 bg-indigo-400 rounded-xl text-white transition-all ease-in cursor-pointer hover:bg-indigo-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
