import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ArtistCard = ({ artistObj }) => (
  <Card id="artist-card">
    <Card.Header>Artist: {artistObj.name}</Card.Header>
    <Card.Body id="artist-card-body">
      <Card.Title>{artistObj.name}</Card.Title>
      <Card.Img src={artistObj.img} id="artist-img"/>
      <Button
        id="btn-view-artist"
        onClick={() => {
          Router.push(`/artists/${artistObj.id}`);
        }}
      >
        View Artist
      </Button>
    </Card.Body>
    {/* <Card.Footer className="text-muted">Order Type: {orderObj.type}</Card.Footer> */}
  </Card>
);

ArtistCard.propTypes = {
  artistObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtistCard;
