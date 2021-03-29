import React, { useContext } from "react"
import { PageLayout, PageTitle } from "../components"
import { Container, Image } from "react-bootstrap"
import { Link, graphql } from "gatsby"
import { ThemeContext, SEO } from "../utils"

export default ({ data }) => {
  const MediaLink = ({ title, author, link }) => (
    <li key={title} style={{ color: "gray" }}>
      <a rel="noopener noreferrer" href={link}>
        {title}
      </a>
      &nbsp;-<i>{author}</i>
    </li>
  )

  const {
    author,
    occupation,
    readingList,
    showsList,
    designations,
    unemployed,
  } = data.site.siteMetadata
  const { toString } = useContext(ThemeContext)

  const bookLinks = readingList.map(book => MediaLink(book))
  const showLinks = showsList.map(show => MediaLink(show))

  return (
    <PageLayout>
      <SEO title="About Me" />
      <PageTitle title="About Me" />
      <Container>
{/*         <Image
          rounded
          width="140"
          height="140"
          src={`../../icons/luke-${toString()}.png`}
          alt={author}
        /> */}
        <article className="w-75 m-auto pt-2 text-justify">
          <p className="text-center">
            {designations.map((attr, i) => (
              <span key={attr}>
                &nbsp;<b>{attr}</b>&nbsp;
                {i < designations.length - 1 && <>||</>}
              </span>
            ))}
          </p>
          
          <p className="mt-4 pt-2">
          The best way to describe myself is interdisciplinary. 
          </p>

          <p className="mt-4 pt-2">
          I spend a lot of time as a software engineer, architect, and consultant where I deliver cool solutions to complex problems. I’m educated in Political Science and Philosophy, have spent time teaching kids debate as well as doing do political work on occasion.   
          </p>

          <p className="mt-4 pt-2">
          Personally, I’m obsessed with quite a few things including: 
          </p>
          <ul>
            <li>Information architecture, search engines, and how technology integrates into human life  </li>
            <li>The process of creation – art, music, software, you name it, there is something that fascinates me about the workflow </li>
            <li>How language shapes our world </li>
            <li>The rhetoric of politics and the phenomena of politics becoming a “team” sport  </li>
          </ul>

          <p className="mt-4 pt-2">
          I also love Ludwig Wittgenstein, Albert Camus, and prefer classical over behavioral political science.  
          </p>

          <p className="mt-4 pt-2">
          I’m not sure what else there is to say, so feel free to reach out to me about any of the things I’m passionate about or to just ask a question.  
          </p>


          
        </article>
      </Container>
    </PageLayout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        unemployed
        occupation
        author
        designations
        readingList {
          title
          author
          link
        }
        showsList {
          title
          author
          link
        }
      }
    }
  }
`
