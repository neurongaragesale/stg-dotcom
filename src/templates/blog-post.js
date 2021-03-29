import React from "react"
import { graphql } from "gatsby"
import PostTemplate from "./post-template"
import {Utils } from "../utils"

const SubTitle = ({ ttr, date, author }) => (
  <h5 className="blogSubTitle mb-5">
    Time to read: {ttr} <small>min</small> | {date} | {author}
  </h5>
)

export default ({ data }) => {
  const post = data.markdownRemark
  const allFeaturedImages = data.allFile.edges || []
  const regex = /\/[blog].*\/|$/
  const featuredImageMap = Utils.getImageMap(allFeaturedImages, regex)
  return (
    <PostTemplate
      title={post.frontmatter.title}
      subTitle={
        <SubTitle
          ttr={post.timeToRead}
          date={post.frontmatter.date}
          author={post.frontmatter.author}
        />
      }
      excerpt={post.excerpt}
      html={post.html}
      series={post.frontmatter.series}
      seriesslug={post.frontmatter.seriesslug}
      inseries={post.frontmatter.inseries}
      ogimage={featuredImageMap[post.fields.slug]}
      //ogimage={post.frontmatter.ogimage}
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
        author
        date(formatString: "DD MMMM, YYYY")
        series
        seriesslug
        inseries
        ogtype
        seotags
        description

      }
      fields {
        slug
      }
      excerpt
      timeToRead
    }
    allFile(
      filter: {
        extension: { eq: "jpg" }
        relativePath: { regex: "/feature/" }
        relativeDirectory: { regex: "/content/blog/" }
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
