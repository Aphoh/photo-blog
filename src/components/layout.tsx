import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Navbar } from "react-bulma-components"
import SimpleReactLightbox from "simple-react-lightbox"

const navbarStyles = {
  marginTop: 0,
  lineHeight: 1.0,

}

const brandStyles = {
  fontSize: "2.33rem",
}


const pageStyles = {
  padding: "3%",
  fontFamily: "'Bebas Neue',display",
}

const headerStyles = {
  fontSize: "30px",
  lineHeight: 1.2,
  marginTop: "0.2em",
  marginBottom: "0.2em",
  textAlign: 'center' as const,
}

const hrStyle = {
  marginTop: 0
}

type TagQuery = {
  allWpPage: {
    nodes: {
      title: string,
      slug: string,
    }[]
  }
}

type LayoutProps = {
  children: React.ReactNode
  title: string
}
export default function Layout(props: LayoutProps) {
  const [isActive, setIsActive] = React.useState(false)
  const data: TagQuery = useStaticQuery(graphql`
    query PageTagQuery {
      allWpPage(filter: {tagPageFields: {regex: {ne: null}}}) {
        nodes {
          title
          slug
        }
      }
    }
  `)
  return <SimpleReactLightbox key="lb">
    <title> Will's Photo Blog - {props.title} </title>
    <main style={pageStyles}>
      <div className="container">
        <Navbar style={navbarStyles} key={"navbar"}>
          <Navbar.Brand style={brandStyles} key="brand">
            <Navbar.Item key="mbrand" href="/">
              Will's Photo Blog
            </Navbar.Item>
            <Navbar.Burger key="burg" onClick={() => setIsActive(!isActive)} />
          </Navbar.Brand>
          <Navbar.Menu key="menu" className={isActive ? "is-active" : ""}>
            <Navbar.Container align="right">
              <Navbar.Item href="https://aphoh.us"> Blog </Navbar.Item>
              {
                data.allWpPage.nodes.map(({ title, slug }: { title: string, slug: string }) =>
                  <Navbar.Item href={`/t/${slug}`} textAlign="right"> {title}
                  </Navbar.Item>)
              }
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
        <hr style={hrStyle} />
        <h1 style={headerStyles} key={"title"}> {props.title} </h1>
        {props.children}
      </div>
    </main>
  </SimpleReactLightbox>
}
