import Link from "next/link";
import Span from "../atoms/Span"
import Text from "../atoms/Text"

interface LinkTagProps {
  text: string
  spanText: string
  link: string
}

const LinkTag = ({text, spanText, link}: LinkTagProps) => {
  return (
    <Text size="sm">
      <div className="flex gap-2">
        {text}
        <Link href={link} passHref>
          <a>
            <Span>{spanText}</Span>
          </a>
        </Link>
      </div>
    </Text>
  )
}

export default LinkTag

{/* <p className="text-sm mb-12">
  회원이신가요?
  <Link href="/login">
    <span className="ml-2 text-primary font-semibold cursor-pointer hover:underline hover:text-primary-focus">
      로그인
    </span>
  </Link>
</p> */}