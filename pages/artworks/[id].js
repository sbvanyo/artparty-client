import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { getSingleArtwork, deleteArtwork, updateArtwork } from '../../utils/data/artworkData';
import { getArtworkTags } from '../../utils/data/artworkTagData';
import ArtworkForm from '../../components/ArtworkForm';

const ArtworkDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artworkDetails, setArtworkDetails] = useState();
  const [artworkTags, setArtworkTags] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getSingleArtwork(id).then((artwork) => {
      setArtworkDetails(artwork);
      setFeatured(artwork.featured || false);
    });
  }, [id]);

  useEffect(() => {
    if (artworkDetails) {
      getArtworkTags(artworkDetails.id).then(setArtworkTags);
    }
  }, [artworkDetails]);

  const toggleFeatured = () => {
    const featuredSelection = !featured;
    setFeatured(featuredSelection);
    updateArtwork(id, { featured: featuredSelection });
    console.warn(featured);
  };

  if (!artworkDetails) {
    return <div>Loading...</div>;
  }

  const deleteThisArtwork = () => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      deleteArtwork(id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <h1 className="page-title">{artworkDetails.title}</h1>

      <div id="single-artwork">
        <Image src={artworkDetails.img} id="single-artwork-img" />

        <div id="single-artwork-details">
          <p>By: {artworkDetails.artist.name}, age {artworkDetails.age}</p>
          <p>Medium: {artworkDetails.medium}</p>
          <p>Description: {artworkDetails.description}</p>
          <p>Created on: {artworkDetails.date}</p>
        </div>

        <div id="artwork-tags-container">
          <>
            <h6 id="tags-header">TAGS:</h6>
            {artworkTags.map((artworkTag) => (
              <section key={artworkTag.id} className="artwork-tags">
                <div>#{artworkTag.tag.label}</div>
              </section>
            ))}
          </>
        </div>

        <FormGroup>
          <FormControlLabel
            control={<Switch checked={featured} onChange={toggleFeatured} />}
            label="this art wants to PARTY"
            id="party-toggle"
          />

        </FormGroup>

        <div id="artwork-btn-holder">
          <Button className="edit-btn" onClick={handleOpenModal}>Edit Artwork</Button>
          <Button className="delete-btn" onClick={deleteThisArtwork}>Delete Artwork</Button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModal && <ArtworkForm initialArtwork={artworkDetails} closeModal={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ArtworkDetails;
