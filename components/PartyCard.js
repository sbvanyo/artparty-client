import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleArtist } from '../utils/data/artistData';
import { getArtworksByArtist } from '../utils/data/artworkData';
import ArtistCard from './ArtistCard';
import ArtworkCard from './ArtworkCard';

const PartyCard = ({ artistId }) => {
  const [artistDetails, setArtistDetails] = useState();
  const [artistArtworks, setArtistArtworks] = useState([]);

  useEffect(() => {
    if (artistId) {
      getSingleArtist(artistId).then(setArtistDetails);
      getArtworksByArtist(artistId).then((artworks) => {
        const featuredArtworks = artworks.filter((artwork) => artwork.featured === true);
        setArtistArtworks(featuredArtworks);
        console.warn(featuredArtworks);
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

      <div id="party-artwork-container">
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
