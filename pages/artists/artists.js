import React, { useEffect, useState } from 'react';
import ArtistCard from '../../components/ArtistCard';
import { getArtists } from '../../utils/data/artistData';
import { useAuth } from '../../utils/context/authContext';

function ArtistHome() {
  const { user } = useAuth();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists(user.id).then((data) => setArtists(data));
  }, [user.id]);

  return (
    <>
      <div>
        <h1 className="page-title">artists</h1>
      </div>
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
