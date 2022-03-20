import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { ImageList, ImageListItem } from "@mui/material"
import ImageCover from "../components/imageCover"

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
      }
    }[]
  }
}

export default function Album({ data }: PageProps<AlbumData>) {
  console.log(data)
  return <Layout title={data.wpPost.title}>
    <ImageList variant="masonry" cols={2} gap={8}>
      {data.allWpMediaItem.nodes.map((node) => {
        const image = getImage(node.localFile.childImageSharp.gatsbyImageData)!
          return (
            <ImageListItem key={node.id}>
              <ImageCover image={image} slug={"/"}/>
            </ImageListItem>
          )
      })}
    </ImageList>
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


