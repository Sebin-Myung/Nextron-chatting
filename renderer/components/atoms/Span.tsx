const Span = ({children}: {children: string}) => {
  return (
    <span className="text-primary font-semibold cursor-pointer hover:underline hover:text-primary-focus">
      {children}
    </span>
  )
}

export default Span