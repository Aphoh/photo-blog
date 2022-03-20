
import type { GatsbyNode } from "gatsby"
import path from "path"

type LoadPostResult = {
  allWpPost: {
    nodes: {
      tagForImages: {
        tagForImages: string
      },
      slug: string
    }[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/post.tsx`)

  return graphql<LoadPostResult>(`
    query LoadPostsQuery {
      allWpPost {
        nodes {
          tagForImages {
            tagForImages
          }
          slug
        }
      } 
    }
  `).then(result => {
      if (result.errors) {
        throw result.errors
      }

      result.data?.allWpPost.nodes.forEach(node => {
        createPage({
          path: `p/${node.slug}`,
          component: postTemplate,
          context: {
            slug: node.slug,
            imgtag: node.tagForImages.tagForImages,
          }
        })
      })
  })

}
