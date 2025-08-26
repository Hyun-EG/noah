import React from "react";

type InputType = {
  placeholder: string;
  width?: string;
  height?: string;
  value?: string | number;
  name?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  placeholder,
  width,
  height,
  value,
  name,
  type,
  onChange,
}: InputType) => {
  return (
    <input
      className={`${width ? width : "w-full"} ${
        height ? height : "h-16"
      } pl-3 border text-black bg-white outline-none focus:ring-sky-500 rounded-md`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
    />
  );
};

export default Input;
