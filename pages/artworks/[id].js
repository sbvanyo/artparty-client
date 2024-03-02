import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { getSingleArtwork, deleteArtwork } from '../../utils/data/artworkData';
import { getArtworkTags } from '../../utils/data/artworkTagData';
// import ArtworkCard from '../../components/ArtworkCard';
// import { deleteOrderItem, addOrderItem, getMenuItems } from '../../utils/data/orderItemData';

const ArtworkDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artworkDetails, setArtworkDetails] = useState();
  const [artworkTags, setArtworkTags] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => {
  //   getMenuItems().then(setMenuItems);
  //   setShowModal(true);
  // };

  useEffect(() => {
    getSingleArtwork(id).then(setArtworkDetails);
  }, [id]);

  useEffect(() => {
    if (artworkDetails) {
      getArtworkTags(artworkDetails.id).then(setArtworkTags);
    }
  }, [artworkDetails]);

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
        <Image src={artworkDetails.img} />
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

      <hr />

      <div>
        <div id="artist-artwork-container">
          {/* <h3 style={{ padding: 20 }}>Artworks by {artistDetails.name}:</h3> */}
          {/* {
            orderDetails.open
            && <Button onClick={handleOpenModal}>Add Item</Button>
          }
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add an Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {menuItems.map((menuItem) => (
                <section key={menuItem.id} className="menu-items">
                  <div className="order-item-name">{menuItem.name}</div>
                  <div>${menuItem.price}</div>
                  <Button onClick={() => createOrderItem(menuItem.id)}>Add Item</Button>
                </section>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
      {/* <div className="btn-holder">
        {
          orderDetails.open
          && <Button onClick={() => router.push(`/orders/checkout?id=${orderDetails.id}`)}>Continue to Checkout</Button>
        }
      </div> */}
    </>
  );
};

export default ArtworkDetails;
