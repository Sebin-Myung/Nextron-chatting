import Input, { InputProps } from "../atoms/Input"
import Text from "../atoms/Text"

interface InputCheckProps extends InputProps {
  children: string
}

const InputCheck = ({type, name, placeholder, register, children}: InputCheckProps) => {
  return (
    <div className="m-1">
      <Input type={type} name={name} placeholder={placeholder} register={register} />
      <div className="mt-1 ml-4">
        <Text size="xs" color="error">{children}</Text>
      </div>
    </div>
  )
}

export default InputCheck