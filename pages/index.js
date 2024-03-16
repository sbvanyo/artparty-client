// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import ArtistHome from './artists/artists';
import ArtworkHome from './artworks/artworks';

function Home() {
  return (
    <>
      <div id="home-container">
        {/* <div id="greeting">
          <h3>Hello {user.fbUser.displayName}!</h3>
        </div> */}
        <div id="home-components-container">
          <div className="home-component">
            <ArtistHome />
          </div>
          <div className="home-component">
            <ArtworkHome />
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
