import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import Masonry from "react-masonry-css"
import "./post.scss"


type AlbumData = {
  wpPost: {
    tagForImages: {
      tagForImages: string
    }
    title: string
  }
  allWpMediaItem: {
    nodes: {
      id: string,
      localFile: {
        childImageSharp: {
          gatsbyImageData: ImageDataLike
        }
        publicURL: string,
      }
    }[]
  }
}

const srlopts = {
  settings: {
    disableWheelControls: true,
    autoplaySpeed: 0,
    slideTransitionSpeed: 0.3,
  }
}

const imageStyles = {
  margin: "1%",
}

const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1
};

export default function Album({ data }: PageProps<AlbumData>) {
  console.log(data)
  return <Layout title={data.wpPost.title}>
    <SimpleReactLightbox>
      <SRLWrapper options={srlopts}>
        <Masonry breakpointCols={breakpointColumnsObj} className="album-grid" columnClassName="album-grid-col">
          {data.allWpMediaItem.nodes.map((node) => {
            const image = getImage(node.localFile.childImageSharp.gatsbyImageData)!
            return (
              <a
                href={node.localFile.publicURL}
                target="_blank"
                rel="noreferrer"
              >
                <GatsbyImage image={image} alt={""} style={imageStyles} />
              </a>
            )
          })}
        </Masonry>
      </SRLWrapper>
    </SimpleReactLightbox>
  </Layout>
}

export const query = graphql`
  query($slug: String!, $imgtag: String!) {
    wpPost(slug: {eq: $slug}){
      tagForImages {
        tagForImages
      }
      slug
      title
    }
    allWpMediaItem(filter: {tags: {nodes: {elemMatch: {name: {eq: $imgtag}}}}}) {
      nodes {
        id
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              width: 4000
              layout: CONSTRAINED
              outputPixelDensities: [0.1, 0.25, 0.5, 1.0]
            )
          }
        }
      }
    }
  }
`


