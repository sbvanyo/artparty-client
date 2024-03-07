import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getSingleArtist, deleteArtist } from '../../utils/data/artistData';
import { getArtworksByArtist } from '../../utils/data/artworkData';
import ArtistCard from '../../components/ArtistCard';
import ArtworkCard from '../../components/ArtworkCard';
import ArtistForm from '../../components/ArtistForm';

const ArtistDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artistDetails, setArtistDetails] = useState();
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getSingleArtist(id).then(setArtistDetails);
  }, [id]);

  useEffect(() => {
    getArtworksByArtist(id).then(setArtistArtworks);
  }, [id]);

  if (!artistDetails) {
    return <div>Loading...</div>;
  }

  const deleteThisArtist = () => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      deleteArtist(id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>Artist: {artistDetails.name}</h1>
      <div id="single-artist-details">
        <ArtistCard artistObj={artistDetails} />
        <div className="btn-holder">
          <Button onClick={handleOpenModal}>Edit Artist</Button>
          <Button onClick={deleteThisArtist}>Delete Artist</Button>
        </div>
      </div>

      <hr />

      <div>
        <div id="artist-artwork-container">
          <h3 style={{ padding: 20 }}>Artworks by {artistDetails.name}:</h3>
        </div>
        <div id="artist-artworks">
          {artistArtworks.map((artwork) => (
            <section key={`artwork--${artwork.id}`} className="artwork">
              <ArtworkCard key={artwork.id} artworkObj={artwork} />
            </section>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModal && <ArtistForm initialArtist={artistDetails} closeModal={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ArtistDetails;
