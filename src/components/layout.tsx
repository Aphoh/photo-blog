import React from "react"
import { Navbar } from "react-bulma-components"

const tags = [
  {
    text: "Rollei 35",
    id: "rollei-35",
  }
]

const navbarStyles = {
  marginTop: 0,
  lineHeight: 1.2,

}

const brandStyles = {
  fontSize: "2.33rem",
}


const pageStyles = {
  color: "#232129",
  padding: "3%",
  fontFamily: "'Bebas Neue',display",
}

const headerStyles = {
  fontSize: "30px",
  lineHeight: 1.2,
  marginTop: "1em",
  marginBottom: "0.2em",
  textAlign: 'center' as const,
}

type LayoutProps = {
  children: React.ReactNode
  title: string
}
export default function Layout(props: LayoutProps) {
  const [isActive, setIsActive] = React.useState(false)
  return <main style={pageStyles}>
    <Navbar style={navbarStyles}>
      <Navbar.Brand style={brandStyles}>
        <Navbar.Item href="/">
          Will's Photo Blog
        </Navbar.Item>
        <Navbar.Burger onClick={() => setIsActive(!isActive)} />
      </Navbar.Brand>
      <Navbar.Menu className={isActive ? "is-active" : ""}>
        <Navbar.Container align="right">
          {
            tags.map(({ text, id }) =>
              <Navbar.Item href={id} textAlign="right"> {text}
              </Navbar.Item>)
          }
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    <h1 style={headerStyles}> {props.title} </h1>
    {props.children}
  </main>
}
