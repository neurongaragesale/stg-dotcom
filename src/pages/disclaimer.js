import React from "react"
import { PageLayout, PageTitle } from "../components"
import { Container } from "react-bootstrap"
import { SEO } from "../utils"

export default ({ data }) => {
  return (
    <PageLayout>
      <SEO title="Disclaimer" />
      <PageTitle title="Disclaimer" />
      <Container>
        <article className="w-75 m-auto pt-2 text-center">         
          <p className="mt-4 pt-2">
          This content on this site, associated videos and images do not represent any organization or institution which I may be affiliated with – they are strictly my own. I may address controversial topics and do so from a satirical manner, or by exploring the topic.  Sometimes this may illicit emotions in individuals, reader discretion is advised. 
          </p>

          <p className="mt-4 pt-2">
          I also understand that ideas and beliefs change over time, as new information and understanding is obtained.  As such my views on anything I write may change at any given time.  Furthermore, if I state something which is factually inaccurate, or you want to talk further with me about anything I’m interested about or write about, feel free to reach out to me in the following manners.
          </p>
          
        </article>
      </Container>
    </PageLayout>
  )
}
