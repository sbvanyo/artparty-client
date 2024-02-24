import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ArtworkCard = ({ artworkObj }) => (
  <Card id="artwork-card">
    {/* <Card.Header>Artist: {artistObj.name}</Card.Header> */}
    <Card.Body id="artwork-card-body">
      {/* <Card.Title>{artistObj.name}</Card.Title> */}
      <Card.Img src={artworkObj.img} id="artwork-img" />
      <Button
        id="btn-view-artwork"
        onClick={() => {
          Router.push(`/artworks/${artworkObj.id}`);
        }}
      >
        View Artwork
      </Button>
    </Card.Body>
    {/* <Card.Footer className="text-muted">Order Type: {orderObj.type}</Card.Footer> */}
  </Card>
);

ArtworkCard.propTypes = {
  artworkObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
    artist: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArtworkCard;
