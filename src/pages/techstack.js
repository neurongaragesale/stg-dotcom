import React from "react"
import { PageTitle, PageLayout } from "../components"
import { Container } from "react-bootstrap"

export default () => {
  return (
    <PageLayout>
      <PageTitle>Technology Stack</PageTitle>
      <Container>
        <article className="w-75 m-auto pt-2 text-left">  
        <p>This site uses the following:</p>
      <ul>
        <li>It's built on <a href="https://www.gatsbyjs.com/">GatsbyJS</a></li>
        <li>It's based on this <a href="https://github.com/surudhb/gatsby-personal-site-template">template</a> by <a href="https://github.com/surudhb">surudhb</a></li>
      </ul> 
        </article>
        </Container> 


    </PageLayout>
  )
}
