import React from "react"
import { graphql } from "gatsby"
import PostTemplate from "./post-template"
import Badge from "react-bootstrap/Badge"
import {Utils } from "../utils"

/* const SubTitle = ({ tags }) => (
  <div className="mb-5">
    {tags.map(tag => (
      <Badge key={tag} pill variant="dark" className="px-3 mr-1">
        <h5 className="text-white my-0">{tag}</h5>
      </Badge>
    ))}
  </div>
) */

export default ({ data }) => {
  const post = data.markdownRemark
  const allFeaturedImages = data.allFile.edges || []
  const regex = /\/[blog].*\/|$/
  const featuredImageMap = Utils.getImageMap(allFeaturedImages, regex)
  return (
    <PostTemplate
      title={post.frontmatter.title}
      subTitle={post.frontmatter.description}
      excerpt={post.excerpt}
      html={post.html}
      ogimage={featuredImageMap[post.fields.slug]}
      ogtype={post.frontmatter.ogtype}
      seotags={post.frontmatter.seotags}
      summary={post.frontmatter.description}
    />
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        ogtype
        seotags
      }
      fields {
        slug
      }
      excerpt
    }
    allFile(
      filter: {
        extension: { eq: "jpg" }
        relativePath: { regex: "/feature/" }
        relativeDirectory: { regex: "/content/series/" }
      }
    )
    {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
