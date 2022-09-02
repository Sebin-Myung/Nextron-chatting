export interface TextProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "3xl";
  bold?: "semibold" | "bold";
  color?: "error" | "secondary";
  truncate?: boolean;
  children: string | JSX.Element;
}

const Text = ({ size = "base", bold, color, truncate, children }: TextProps) => {
  const classes = [];
  classes.push(`text-${size}`);
  if (bold) classes.push(`font-${bold}`);
  if (color) {
    if (color === "error") classes.push("text-error");
    if (color === "secondary") classes.push("text-secondary-content");
  }
  if (truncate) classes.push("truncate");

  return <p className={classes.join(" ")}>{children}</p>;
};

export default Text;
