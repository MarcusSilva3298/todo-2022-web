import { Nav, Navbar } from "react-bootstrap";
import './styles.css'

export function NavBar () {
  return (
    <Navbar className="navbar" variant="dark" sticky="top">
      <Navbar.Brand className="nav-brand">Todo List</Navbar.Brand>
    </Navbar>
  )
}