const AlertBox = ({ children }: { children: string }) => {
  return (
    <div
      className="alert w-full justify-center bg-rose-100 shadow-lg"
    >
      {children}
    </div>
  )
}

export default AlertBox