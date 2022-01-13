import { useEffect, useState } from "react/cjs/react.development";
import { API_PATH } from "../constants";
const { default: Input } = require("./input");

const Form = ({ row, isEditing, showForm, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: row.name,
        address1: row.address1,
        address2: row.address2,
        city: row.city,
        state: row.state,
        zip: row.zip,
      });
    }
  }, [row]);

  const onChangeInput = (id, value) => {
    let def = { ...formData };
    def[id] = value;
    setFormData(def);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let moddedPath = `${API_PATH}/v1/address`;
    if (isEditing) {
      moddedPath = `${API_PATH}/v1/address/${row.id}`;
    }
    const response = await fetch(moddedPath, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(formData), // body data type must match "Content-Type" header
    });
    response && refresh();
  };
  return (
    <div className='fixed inset-0 p-12'>
      <div onClick={() => showForm(false)} className='bg-black inset-0 absolute bg-opacity-75' />
      <form onSubmit={(e) => handleSubmit(e)} className='relative z-10 flex flex-col p-6 rounded mx-auto max-w-md bg-white'>
        <Input label='Name' id='name' value={formData.name} placeholder={"Enter name"} onChangeHandler={onChangeInput} isRequired />
        <Input label='Address 1' id='address1' value={formData.address1} placeholder={"Enter address 1"} onChangeHandler={onChangeInput} isRequired />
        <Input label='Address 2' id='address2' value={formData.address2} placeholder={"Enter address 2"} onChangeHandler={onChangeInput} />
        <Input label='City' id='city' value={formData.city} placeholder={"Enter city"} onChangeHandler={onChangeInput} isRequired />
        <Input label='State' id='state' value={formData.state} placeholder={"Enter state"} onChangeHandler={onChangeInput} isRequired />
        <Input label='Zip' id='zip' value={formData.zip} placeholder={"Enter zip"} onChangeHandler={onChangeInput} isRequired />
        <button className='bg-blue-500 hover:bg-blue-700 text-white rounded px-6 py-2 mt-4' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
