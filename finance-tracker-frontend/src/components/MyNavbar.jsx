import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{padding: '1rem'}} expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/insights" onClick={() => setExpanded(false)}>Insights</Nav.Link>
            <Nav.Link as={Link} to="/transactions" onClick={() => setExpanded(false)}>Transactions</Nav.Link>
            <Nav.Link as={Link} to="/goals" onClick={() => setExpanded(false)}>Goals</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
