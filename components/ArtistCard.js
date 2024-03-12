import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

const ArtistCard = ({ artistObj }) => (
  <>
    <Card id="artist-card">
      <Card.Body id="artist-card-body">
        <Link href={`/artists/${artistObj.id}`} passHref>
          <Card.Img src={artistObj.img} id="artist-img" style={{ cursor: 'pointer' }} />
        </Link>
        <Card.Title id="artist-name">{artistObj.name}</Card.Title>
      </Card.Body>
    </Card>
  </>
);

ArtistCard.propTypes = {
  artistObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtistCard;
