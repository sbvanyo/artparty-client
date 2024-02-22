// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ArtistHome from './artists/artists';

function Home() {
  const { user } = useAuth();
  return (
    <>
      <div id="greeting">
        <h1>Hello {user.fbUser.displayName}!</h1>
      </div>
      <div id="home-container">
        <ArtistHome />
      </div>
    </>
  );
}

export default Home;
