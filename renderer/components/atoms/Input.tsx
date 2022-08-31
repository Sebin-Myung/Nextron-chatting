export interface InputProps {
  type: "email" | "password" | "text" | "checkbox"
  name?: string
  placeholder?: string
  isChecked?: boolean
  onChange?: Function
}

const Input = ({type, name, placeholder, isChecked = false, onChange}: InputProps) => {
  if(type === "checkbox") {
    return (
      <input type="checkbox" className="checkbox checkbox-secondary" checked={isChecked} onChange={() => onChange()} />
    )
  } else {
    return (
      <input type={type} name={name} placeholder={placeholder} className="input input-bordered w-full" />
    )
  }
}

export default Input