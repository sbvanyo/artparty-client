import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div id="login-screen">
      <div id="login-msg">
        <p>get ready to...</p>
        <h1>ART PARTY!</h1>
      </div>
      <Button type="button" size="lg" id="signin-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
