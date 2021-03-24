import React from "react"
import { graphql } from "gatsby"
import { PageLayout, PageTitle} from "../components"
import { SEO, Utils } from "../utils"
import Container from "react-bootstrap/Container"
import SeriesLink from "../components/SeriesLink"

export default ({ data }) => {
  const allSeries = data.allMarkdownRemark.edges || []
  const allFeaturedImages = data.allFile.edges || []
  const regex = /\/[series].*\/|$/
  const featuredImageMap = Utils.getImageMap(allFeaturedImages, regex, true, 3)

  return (
    <PageLayout>
      <SEO title="series" />
      <PageTitle title="series" />
      <Container className="text-left">
        <section>
          {allSeries.map(({ node }) => (
            <div key={node.id} className="p-3">
              <SeriesLink
                to={node.fields.slug}
                featuredImages={featuredImageMap[node.fields.slug]}
                title={node.frontmatter.title}
                tags={node.frontmatter.tags}
                excerpt={node.excerpt}
              />
              <hr className="itemDivider" />
            </div>
          ))}
        </section>
      </Container>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/series/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            description
            tags
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    allFile(
      filter: {
        extension: { eq: "jpg" }
        relativePath: { regex: "/feature/" }
        relativeDirectory: { regex: "/content/series/" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  }
`
