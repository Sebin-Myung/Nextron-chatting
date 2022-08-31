import { UseFormRegisterReturn } from "react-hook-form"

export interface InputProps {
  type: "email" | "password" | "text" | "checkbox"
  name?: string
  placeholder?: string
  isChecked?: boolean
  onChange?: Function
  register?: UseFormRegisterReturn
}

const Input = ({type, name, placeholder, isChecked = false, onChange, register}: InputProps) => {
  if(type === "checkbox") {
    return (
      <input type="checkbox" className="checkbox checkbox-secondary" checked={isChecked} onChange={() => onChange()} />
    )
  } else {
    return (
      <input type={type} name={name} placeholder={placeholder} className="input input-bordered w-full" {...register}/>
    )
  }
}

export default Input