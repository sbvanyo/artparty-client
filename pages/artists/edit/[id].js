import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArtistForm from '../../../components/ArtistForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleArtist } from '../../../utils/data/artistData';

const UpdateArtist = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [updateArtist, setUpdateArtist] = useState();

  useEffect(() => {
    getSingleArtist(id).then(setUpdateArtist);
  }, [id]);

  return (
    <div>
      <h2>Update Artist</h2>
      <ArtistForm
        user={user}
        initialArtist={updateArtist}
      />
    </div>
  );
};

export default UpdateArtist;
