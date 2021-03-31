import React from "react"

export default ({ series, seriesslug }) => (

    <div className="mb-5 seriesheader">
        <span>Hey</span>, If you like this post, you should check out the series: &nbsp; 
        <a href={"/series/" + seriesslug}>{series}</a>

    </div>





  )