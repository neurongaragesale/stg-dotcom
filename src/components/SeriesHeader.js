import React from "react"
import Link from "react"
import {Alert} from 'react-bootstrap/Alert'
import { Jumbotron } from "react-bootstrap"
import Container from "react-bootstrap/Container"

export default ({ series, seriesslug }) => (

    <div className="mb-5 seriesheader">
        <span>Hey</span>, If you like this post, you should check out the series: &nbsp; 
        <a href={"/series/" + seriesslug}>{series}</a>

    </div>





  )
//   thinking this
//   background-color: grey;
//   border-style: double;
//   border-radius: 40px;
//   border-color: blue;
//   padding: 2px;