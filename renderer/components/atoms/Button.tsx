import Router from "next/router"
import { BsArrowLeft, BsPlusLg, BsXLg } from "react-icons/bs"

interface ButtonProps {
  btnType?: "add" | "back" | "close"
  isSubmit?: boolean
  fullWidth?: boolean
  color?: "primary" | "secondary"
  size?: "medium"
  rounded?: "xl"
  onClick?: Function
  children?: String
}

const Button = ({btnType, isSubmit = false, fullWidth = false, color = "primary", size, rounded, onClick, children}: ButtonProps) => {
  if(btnType) {
    switch(btnType) {
      case "add":
        return (
          <button className="btn btn-secondary btn-circle" onClick={() => onClick()}>
            <BsPlusLg />
          </button>
        )
      case "back":
        return (
          <button
            className="btn btn-circle btn-outline btn-primary w-10 h-10 min-h-[2.5rem]"
            onClick={() => Router.back()}
          >
            <BsArrowLeft />
          </button>
        )
      case "close":
        return (
          <button
            className="btn btn-circle btn-outline w-8 h-8 min-h-[2rem]"
            onClick={() => onClick()}
          >
            <BsXLg />
          </button>
        )
    }
  }

  const classes = ["btn"]
  if(fullWidth) classes.push("btn-block")
  classes.push(`btn-${color}`)
  if(size && size === "medium") {
    classes.push("min-h-8")
    classes.push("h-8")
  }
  if(rounded && rounded === "xl") classes.push("rounded-xl")

  return (
    <button type={isSubmit ? "submit" : "button"} className={classes.join(" ")} onClick={() => onClick()}>{children}</button>
  )
}

export default Button