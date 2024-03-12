import React, { useEffect, useState } from 'react';
import PartyCard from '../components/PartyCard';
import { getArtists } from '../utils/data/artistData';

export default function PartyTime() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists().then(setArtists);
  }, []);

  return (
    <div id="party-page">
      <div className="page-title">
        <h1 className="page-title">PARTY TIME!</h1>
        <hr />
        {artists.map((artist) => (
          <>
            <PartyCard key={artist.id} artistId={artist.id} />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}
