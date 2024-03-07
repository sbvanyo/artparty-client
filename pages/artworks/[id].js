import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { getSingleArtwork, deleteArtwork, updateArtwork } from '../../utils/data/artworkData';
import { getArtworkTags } from '../../utils/data/artworkTagData';

const ArtworkDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artworkDetails, setArtworkDetails] = useState();
  const [artworkTags, setArtworkTags] = useState([]);
  const [featured, setFeatured] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => {
  //   getMenuItems().then(setMenuItems);
  //   setShowModal(true);
  // };

  // useEffect(() => {
  //   getSingleArtwork(id).then(setArtworkDetails);
  // }, [id]);

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
      <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>Artwork: {artworkDetails.title}</h1>

      <div id="single-artwork">
        <Image src={artworkDetails.img} id="single-artwork-img" />

        <FormGroup>
          <FormControlLabel
            control={<Switch checked={featured} onChange={toggleFeatured} />}
            label="this art wants to PARTY"
          />

        </FormGroup>
        <div id="single-artwork-details">
          <p>by: {artworkDetails.artist.name}, age {artworkDetails.age}</p>
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

        <div className="btn-holder">
          <Button onClick={() => router.push(`/artworks/edit/${artworkDetails.id}`)}>Edit Artwork</Button>
          <Button onClick={deleteThisArtwork}>Delete Artwork</Button>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetails;
