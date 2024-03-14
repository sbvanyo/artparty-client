import { useRouter } from 'next/router';
import { React } from 'react';
import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
// import ArtistForm from '../components/ArtistForm';

function NewUser() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <>
      <div id="new-user-container">
        <h3>hey hey hey, {user.fbUser.displayName}!</h3>
        <p>Set up your first artist profile below to get the party started: </p>
        {/* <div>
          <ArtistForm userUid={user.uid} />
        </div> */}
        <Button onClick={handleClick}>go home</Button>
      </div>
    </>
  );
}

export default NewUser;
