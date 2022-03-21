import { ImageDataLike } from "gatsby-plugin-image"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import "./imageCover.scss"


export type ImageCoverProps = {
  image: ImageDataLike,
  title?: string
  slug: string
}

const titleStyles = {
  margin: ".5em 0em 1em 0em",
  fontSize: "1.3em",
  textAlign: "center" as const,
}

export default function ImageCover({ image, title, slug }: ImageCoverProps) {
  const res = getImage(image)!

  return <div>
    <div className="clip-box">
      <div className="hover-box">
        <Link to={`/p/${slug}`}>
          <GatsbyImage image={res} alt={"test.jpg"} className="image-cover" />
        </Link>
      </div>
    </div>
    {title && (<div style={titleStyles}>{title}</div>)}
  </div>
}
