import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleArtist, deleteArtist } from '../../utils/data/artistData';
import { getArtworksByArtist } from '../../utils/data/artworkData';
import ArtistCard from '../../components/ArtistCard';
import ArtworkCard from '../../components/ArtworkCard';
// import { deleteOrderItem, addOrderItem, getMenuItems } from '../../utils/data/orderItemData';

const ArtistDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artistDetails, setArtistDetails] = useState();
  // const [showModal, setShowModal] = useState(false);
  const [artistArtworks, setArtistArtworks] = useState([]);

  // const handleOpenModal = () => {
  //   getMenuItems().then(setMenuItems);
  //   setShowModal(true);
  // };

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

  // const createOrderItem = (itemId) => {
  //   const defaultQuantity = 1;
  //   addOrderItem(orderDetails.id, itemId, defaultQuantity).then(() => window.confirm('Item sucessfully added to order')).then(() => {
  //     getSingleOrder(id).then(setOrderDetails);
  //   });
  // };

  // const removeItem = (orderItemId, itemName) => {
  //   if (window.confirm(`Remove ${itemName}?`)) {
  //     deleteOrderItem(orderDetails.id, orderItemId).then(() => {
  //       // Refresh the order details to reflect the deletion
  //       getSingleOrder(id).then(setOrderDetails);
  //     });
  //   }
  // };

  return (
    <>
      <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>Artist: {artistDetails.name}</h1>
      <div id="single-artist-details">
        <ArtistCard artistObj={artistDetails} />
        <div className="btn-holder">
          {/* <Button onClick={() => router.push(`/orders/edit/${orderDetails.id}`)}>Edit Artist</Button> */}
          <Button onClick={deleteThisArtist}>Delete Artist</Button>
        </div>
      </div>

      <hr />

      <div>
        <div id="artist-artwork-container">
          <h3 style={{ padding: 20 }}>Artworks by {artistDetails.name}:</h3>
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
        <div id="artist-artworks-container">
          <div id="artist-container">
            {artistArtworks.map((artwork) => (
              <section key={`artwork--${artwork.id}`} className="artwork">
                <ArtworkCard key={artwork.id} artworkObj={artwork} />
              </section>
            ))}
          </div>
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

export default ArtistDetails;
