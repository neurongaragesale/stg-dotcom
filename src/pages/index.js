import React, { useContext } from "react"
import { graphql } from "gatsby"
import ThemeContext from "../utils/theme"
import { PageLayout } from "../components"
import { SEO } from "../utils"
import { Container, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ data }) => {
  const { unemployed, firstName, lastName, occupation } = data.site.siteMetadata
  const { dark } = useContext(ThemeContext)
  return (
    <PageLayout>
      <SEO title="Home" />
      <Container className="text-center pt-5 mt-5" fluid>
        <Image
        className="mobilehometext"
          width="150"
          height="150"
          fluid
          src={dark ? `../../icons/logo_reversed_transparent.png` : `../../icons/logo_transparent.png`}
          alt={dark ? "reversed logo" : "main logo"}
        />
{/*         {unemployed && (
          <p className="mt-2">
            <b> Hey! I am looking for new opportunities :)</b>
          </p>
        )} */}
        <Container className="py-0 my-0">
          <h1
          className="hometext"
            style={{
              fontSize: "5rem",
              color: "black",
            }}
          >
            <span className="first-name">{firstName}</span>
            <span className="last-name">{lastName}</span>
          </h1>
          <p>
            <i>
              I Do things, Sometimes.
            </i>
          </p>
        </Container>
        <hr className="my-3 w-25 itemDivider" />
        <div className="d-md-inline-flex icons-container">
          <a
            href="https://twitter.com/NeuronSale"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              className="icons twitter"
              title="Twitter"
            />
          </a>
          <a
            href="https://www.instagram.com/neurongaragesale"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="icons instagram"
              title="Instagram"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="disabled-feature"
          >
            <FontAwesomeIcon
              icon={["fab", "youtube"]}
              className="icons youtube"
              title="Youtube"
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="disabled-feature"
          >
            <FontAwesomeIcon
              icon={["fab", "facebook"]}
              className="icons facebook"
              title="Facebook"
            />
          </a>
          <a
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="disabled-feature"
          >
            <FontAwesomeIcon
              icon={["fab", "github"]}
              className="icons github"
              title="Github"
            />
          </a>
          <a
            href="rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={["fas", "rss"]}
              className="icons rss"
              title="RSS Feed"
            />
          </a>

        </div>
      </Container>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {

        firstName
        lastName
      }
    }
  }
`
