import React from "react"
import { Container } from "react-bootstrap"
import Header from "./Header"
import Footer from "./Footer"
import SeriesHeader from "./SeriesHeader"
import CookieConsent from "react-cookie-consent";

export default ({ children }) => (
  <Container fluid className="px-0 theme-light app-container">
    <Header />
    <Container fluid className="pt-5 mt-5 text-center min-vh-100">
      {children}
    </Container>
    <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    enableDeclineButton
                    declineButtonText="Decline"
                    cookieName="gatsby-gdpr-google-analytics"
                    containerClasses="cookieFooterStyling"
                    contentClasses="cookieFooterStyling"

                    expires={150}>
                    This website stores cookies on your computer. These cookies are used to collect information about how you interact with this website and allow us to remember you.
                    We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors on this website.

                    If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be
      </CookieConsent>
    <Footer />
  </Container>
)
