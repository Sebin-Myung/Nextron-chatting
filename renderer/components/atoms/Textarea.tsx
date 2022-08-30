import { forwardRef, Ref } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, {}>((_, ref: Ref<HTMLTextAreaElement>) => {
  return (
    <textarea
      ref={ref}
      className="grow h-full bg-white rounded-xl text-start resize-none overflow-y-auto p-2"
    />
  )
})

export default Textarea