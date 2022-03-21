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

export default function Album({ data }: PageProps<AlbumData>) {
  return <Layout title={data.wpPost.title}>
    <Gallery nodes={data.allWpMediaItem.nodes} />
  </Layout>
}

export const query = graphql`
  query($slug: String!, $imgtag: String!) {
    wpPost(slug: {eq: $slug}){
      title
    }
    allWpMediaItem(filter: {tags: {nodes: {elemMatch: {name: {eq: $imgtag}}}}}) {
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


