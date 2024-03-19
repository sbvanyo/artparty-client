import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleArtist } from '../utils/data/artistData';
import { getFeaturedArtworksByArtist } from '../utils/data/artworkData';
import ArtistCard from './ArtistCard';
import ArtworkCard from './ArtworkCard';

const PartyCard = ({ artistId }) => {
  const [artistDetails, setArtistDetails] = useState();
  const [artistArtworks, setArtistArtworks] = useState([]);

  useEffect(() => {
    if (artistId) {
      getSingleArtist(artistId).then(setArtistDetails);
      console.warn('artistId', artistId);
      getFeaturedArtworksByArtist(artistId).then((artworks) => {
        setArtistArtworks(artworks);
      });
    }
  }, [artistId]);

  if (!artistDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div id="party-card">
      <div id="single-artist-details">
        <ArtistCard artistObj={artistDetails} />
      </div>

      <div className="artwork-container">
        {artistArtworks.map((artwork) => (
          <section id="party-artwork" key={`artwork--${artwork.id}`}>
            <ArtworkCard key={artwork.id} artworkObj={artwork} />
          </section>
        ))}
      </div>
    </div>
  );
};

PartyCard.propTypes = {
  artistId: PropTypes.number.isRequired,
};

export default PartyCard;
