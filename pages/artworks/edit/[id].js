import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArtworkForm from '../../../components/ArtworkForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleArtwork } from '../../../utils/data/artworkData';

const UpdateArtwork = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [updateArtwork, setUpdateArtwork] = useState();

  useEffect(() => {
    getSingleArtwork(id).then(setUpdateArtwork);
  }, [id]);

  return (
    <div>
      <h2>Update Artwork</h2>
      <ArtworkForm
        user={user}
        initialArtwork={updateArtwork}
      />
    </div>
  );
};

export default UpdateArtwork;
