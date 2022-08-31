interface ImageProps {
  type: "circle" | "square"
  src: string
}

const Image = ({type, src}: ImageProps) => {
  if(type === "circle") {
    return (
      <div className="avatar aspect-square h-full max-h-24">
        <div className="w-fit h-full rounded-full border">
          <img
            src={src === "" ? "/images/defaultProfileImage.png" : src}
            className="object-cover"
          />
        </div>
      </div>
    )
  } else if(type === "square") {
    return (
      <div className="w-full aspect-square p-4">
        <img
          src={src === "" ? "/images/defaultProfileImage.png" : src}
          className="object-contain"
        />
      </div>
    )
  }
}

export default Image