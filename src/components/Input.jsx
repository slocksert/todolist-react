const Input = ({ type, name, value, onChange, placeholder, className }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${className}`}
  />
);

export default Input;
