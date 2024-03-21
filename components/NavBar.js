/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
} from 'react-bootstrap';
import ArtistForm from './ArtistForm';
import ArtworkForm from './ArtworkForm';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container id="nav-item-container">
          <Link passHref href="/">
            <Navbar.Brand id="app-title">ART PARTY</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div id="nav-links">
                <Link passHref href="#">
                  <Nav.Link onClick={() => handleOpenModal('artwork')}>add artwork</Nav.Link>
                </Link>
                <Link passHref href="#">
                  <Nav.Link onClick={() => handleOpenModal('artist')}>add artist</Nav.Link>
                </Link>
              </div>
              <div id="nav-btns">
                <Link passHref href="/partytime">
                  <Button id="btn-party">PARTY TIME!</Button>
                </Link>
                <Button id="btn-signout" variant="dark" onClick={signOut}>
                  SEE YA
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent === 'artwork' ? 'Add Artwork' : 'Add Artist'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === 'artwork' ? <ArtworkForm closeModal={handleCloseModal} /> : <ArtistForm closeModal={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </>
  );
}
