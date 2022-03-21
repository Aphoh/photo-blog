import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { ImageDataLike } from "gatsby-plugin-image"
import Gallery from "../components/gallery"


type AlbumData = {
  wpPost: {
    title: string
  }
  allWpMediaItem: {
    nodes: {
      id: string,
      caption: string,
      localFile: {
        childImageSharp: {
          gatsbyImageData: ImageDataLike
        }
        publicURL: string,
      }
    }[]
  }
}

type PageContext = {
  regex: string,
  text: string
}

export default function Album({ data, pageContext }: PageProps<AlbumData, PageContext>) {
  return <Layout title={pageContext.text}>
    <Gallery nodes={data.allWpMediaItem.nodes} />
  </Layout>
}

export const query = graphql`
  query($regex: String!) {
    allWpMediaItem(filter: {caption: {regex: $regex}}) {
      nodes {
        id
        caption
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


