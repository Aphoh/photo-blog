import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import React from "react"
import Masonry from "react-masonry-css"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import htmlToText from "html-to-text";
import "./gallery.scss"

type GalleryProps = {
  nodes: {
    localFile: {
      publicURL: string,
      childImageSharp: {
        gatsbyImageData: ImageDataLike
      }
    },
    id: string,
    caption: string,
  }[]
}

export const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1
};

const srlopts = {
  settings: {
    disableWheelControls: true,
    autoplaySpeed: 0,
    slideTransitionSpeed: 0.3,
  },
  thumbnails: {
    showThumbnails: false
  }
}

export default function Gallery({ nodes }: GalleryProps) {
  return <SRLWrapper options={srlopts}>
    <Masonry breakpointCols={breakpointColumnsObj} className="album-grid" columnClassName="album-grid-col">
      {nodes.map((node) => {
        const caption = htmlToText.convert(node.caption)
        const image = getImage(node.localFile.childImageSharp.gatsbyImageData)!
        return (
          <a
            href={node.localFile.publicURL}
            target="_blank"
            rel="noreferrer"
          >
            <div className="album-clip-box">
              <GatsbyImage image={image} alt={caption} className="hover-box" />
            </div>
          </a>
        )
      })}
    </Masonry>
  </SRLWrapper>
}
