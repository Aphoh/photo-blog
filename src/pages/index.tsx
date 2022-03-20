import * as React from "react"
import 'bulma/css/bulma.min.css';
import "@fontsource/bebas-neue";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/layout";
import ImageCover from "../components/imageCover";
import { Columns } from "react-bulma-components";
import { ImageDataLike } from "gatsby-plugin-image";

const IndexPage = ({ data }: PageProps<DataProps>) => {
  const titles = data.allWpPost.nodes.map(elt => {
    return <Columns.Column size="one-third">
      <ImageCover image={
        elt.featuredImage.node.localFile.childImageSharp.gatsbyImageData
      } title={elt.title} slug={elt.slug} />
    </Columns.Column>
  })

  return <Layout title="Albums">
    <Columns>
      {titles}
    </Columns>

  </Layout>
}

type DataProps = {
  allWpPost: {
    nodes: {
      title: string,
      slug: string,
      featuredImage: {
        node: {
          localFile: {
            childImageSharp: {
              gatsbyImageData: ImageDataLike
            }
          }
        }
      }
    }[]
  }
}


export const query = graphql`
query {
  allWpPost {
    nodes {
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 1280, height: 1920, placeholder: BLURRED)
            }
          }
        }
      }
      slug
      title
    }
  }
}

`

export default IndexPage
