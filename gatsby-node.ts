
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

type LoadTagResult = {
  allWpPage: {
    nodes: {
      slug: string,
      title: string,
      tagPageFields: {
        regex: string
      }
    }[]
  }
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/post.tsx`)
  const tagTemplate = path.resolve(`src/templates/tag.tsx`)


  await graphql<LoadTagResult>(`
    query LoadTagQuery {
      allWpPage(filter: {tagPageFields: {regex: {ne: null}}}) {
        nodes {
          title
          slug
          tagPageFields {
            regex 
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }
    result.data?.allWpPage.nodes.forEach((node) => {
      createPage({
        path: `t/${node.slug}`,
        component: tagTemplate,
        context: {
          regex: node.tagPageFields.regex,
          text: node.title,
        }
      })
    })
  })

  await graphql<LoadPostResult>(`
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
