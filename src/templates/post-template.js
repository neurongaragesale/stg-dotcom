import React from "react"
import Container from "react-bootstrap/Container"
import {Alert} from 'react-bootstrap/Alert'
import { PageLayout, PageTitle,  } from "../components"
import SeriesHeader from "../components/SeriesHeader"

import SEO from "../utils/seo"

export default ({ title, excerpt, html, subTitle, series, seriesslug }) => (

 
  <PageLayout>
    <SEO title={title} description={excerpt} />
    <Container className="text-center" fluid>
      <PageTitle title={title} />
      {subTitle}

      {series != ""  && 
        <SeriesHeader series={series} seriesslug={seriesslug}/>
      }




      <Container className="text-justify">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Container>
  </PageLayout>
)
