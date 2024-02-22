import React, { useEffect, useState } from 'react';
import ArtistCard from '../../components/ArtistCard';
import { getArtists } from '../../utils/data/artistData';

function ArtistHome() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists().then((data) => setArtists(data));
  }, []);

  return (
    <>
      <h1>Artists</h1>
      <div id="artist-container">
        {artists.map((artist) => (
          <section key={`artist--${artist.id}`} className="artist">
            <ArtistCard key={artist.id} artistObj={artist} />
          </section>
        ))}
      </div>
    </>
  );
}

export default ArtistHome;
