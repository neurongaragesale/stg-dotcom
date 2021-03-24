import React from "react"
import ThemeContext, { ThemeProvider } from "./src/utils/theme"
import "./src/styles/global.scss"
// gatsby-browser.js
require("prismjs/themes/prism-solarizedlight.css")
// gatsby-browser.js
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

/** This component wraps around the entire root div where we render our content.
 *  So, this piece of code is applying the theme-light/dark class on the top level
 */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <ThemeContext.Consumer>
      {({ toString }) => <div className={`theme-${toString()}`}>{element}</div>}
    </ThemeContext.Consumer>
  </ThemeProvider>
)
