import React from "react"
import { useStaticQuery, graphql } from "gatsby"


export default () => {
  const { author } = useStaticQuery(query).site.siteMetadata
  return (
    <div>
    <div className="footer text-muted text-center">
      <span className="m-auto">
        <b>{author}</b> &copy; {new Date().getFullYear()}. Made with&nbsp;
        <span className="heart">&nbsp;❤&nbsp;</span> &&nbsp;
        <a href="https://www.gatsbyjs.org/">Gatsby</a> &&nbsp;
        <a href="/techstack">other stuff</a>
      </span>
    </div>
    <div className="footer text-muted text-center">
      <a href="/disclaimer">Site Disclaimer</a>
    </div>
    </div>
  )
}
const query = graphql`
  query Author {
    site {
      siteMetadata {
        author
      }
    }
  }
`
