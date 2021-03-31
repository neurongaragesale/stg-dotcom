import React from "react"
import Container from "react-bootstrap/Container"
import { PageLayout, PageTitle,  } from "../components"
import SeriesHeader from "../components/SeriesHeader"
import SEO from "../utils/seo"

export default ({ title, excerpt, html, subTitle, series, seriesslug, inseries, ogimage, ogtype, seotags, summary}) => (

 
  <PageLayout>
    <SEO 
      title={title} 
      description={excerpt} 
      image={ogimage}
      ogtype={ogtype}
      seotags={seotags}
      summary={summary}

      
      />
    <Container className="text-center" fluid>
      <PageTitle title={title} />
      {subTitle}

      {inseries === "true"  && 
        <SeriesHeader series={series} seriesslug={seriesslug}/>
      }




      <Container className="text-left">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Container>
  </PageLayout>
)
