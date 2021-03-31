//import React, { useContext } from "react"
import React from "react"
import { PageLayout, PageTitle } from "../components"
import { Container } from "react-bootstrap"
import { graphql } from "gatsby"
//import { ThemeContext, SEO } from "../utils"
import { SEO } from "../utils"

export default ({ data }) => {


  const {
    designations,
  } = data.site.siteMetadata
  //const { toString } = useContext(ThemeContext)



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
        <article className="w-75 m-auto pt-2 text-left">
          <p className="text-center personalTags">
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

          <b>What's with the name NeuronGarageSale?</b>
          <p>
          The name initially came to me serendipitously when I was signing up for an online service back in the day, but I really liked it and it stuck.  It feels right because, as an information worker, IT architect, and consultant, I literally make money off renting out my neurons to solve other people’s problems. Often it is my hyperfocus that has made me successful.  So to the extend that manual labor trades your body for currency, I trade my mind for the same. I use it here for 2 reasons:  
          </p>

          <ul>
            <li>Since I'm hitting multiple topics, it seems fitting</li>
            <li>My name is often mispelled and not catchy</li>
          </ul>

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
        author
        designations
      }
    }
  }
`
