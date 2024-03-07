import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

const ArtworkCard = ({ artworkObj }) => (
  <Card id="artwork-card">
    {/* <Card.Header>Artist: {artistObj.name}</Card.Header> */}
    <Card.Body id="artwork-card-body">
      {/* <Card.Title>{artistObj.name}</Card.Title> */}
      <Link href={`/artworks/${artworkObj.id}`} passHref>
        <Card.Img src={artworkObj.img} id="artwork-img" style={{ cursor: 'pointer' }} />
      </Link>
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
    artist: PropTypes.shape({
      user: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkCard;
