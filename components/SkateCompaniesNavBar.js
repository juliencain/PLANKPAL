/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';

export default function SkateCompanyNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Navbar.Brand>PLANK BY COMPANNY:</Navbar.Brand>
            <Link passHref href="/element">
              <Nav.Link>ELEMENT</Nav.Link>
            </Link>
            <Link passHref href="/zero">
              <Nav.Link>ZERO</Nav.Link>
            </Link>
            <Link passHref href="/baker">
              <Nav.Link>BAKER</Nav.Link>
            </Link>
            <Link passHref href="/santacruz">
              <Nav.Link>SANTA CRUZ</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
