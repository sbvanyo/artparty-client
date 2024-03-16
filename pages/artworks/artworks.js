import React, { useEffect, useState } from 'react';
import ArtworkCard from '../../components/ArtworkCard';
import { getArtworks } from '../../utils/data/artworkData';
import { useAuth } from '../../utils/context/authContext';

function ArtworkHome() {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    console.warn(user);
    getArtworks(user.id).then((data) => setArtworks(data));
  }, [user.id]);

  return (
    <>
      <hr />
      <div className="page-title">
        <h1>EVERY ART EVER</h1>
      </div>
      <div id="artwork-container">
        {artworks.map((artwork) => (
          <section key={`artwork--${artwork.id}`} className="artwork">
            <ArtworkCard key={artwork.id} artworkObj={artwork} />
          </section>
        ))}
      </div>
    </>
  );
}

export default ArtworkHome;
