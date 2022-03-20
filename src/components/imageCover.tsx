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
  margin: "1em 0em 1em 0em",
  fontSize: "1.3em",
  textAlign: "center" as const,
}

const boxStyles = {
  overflow: "hidden",
  position: "relative" as const,
}

export default function ImageCover({ image, title, slug }: ImageCoverProps) {
  const res = getImage(image)!

  return <div>
    <div style={boxStyles}>
      <div className="hover-box">
        <Link to={`/p/${slug}`}>
          <GatsbyImage image={res} alt={"test.jpg"} className="image-cover" />
          <div className="mask" />
        </Link>
      </div>
    </div>
    {title && (<div style={titleStyles}>{title}</div>)}
  </div>
}
