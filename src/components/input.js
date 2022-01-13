const Input = ({ value, onChangeHandler, placeholder, defaultValue, label, id,isRequired }) => {
  console.log("onchjgjga",onChangeHandler)
  return (
    <div className="my-2 flex flex-col items-start w-full">
      <label htmlFor={id}>{label}</label>
      <input required={isRequired} id={id} className='mt-2 w-full px-4 py-2 border border-gray-300 rounded text-gray-800 bg-white' placeholder={placeholder || " "} defaultValue={defaultValue || ""} value={value || ""} onChange={(e) => onChangeHandler(id,e.target.value)} />
    </div>
  );
};
export default Input;
