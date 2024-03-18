import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div id="login-screen">
      <div id="login-msg">
        <h1>ART PARTY!</h1>
        <p>Art Party is a web app designed to take the overwhelm out of managing kids’ artwork. Never settle for stuffing creations in a dusty drawer again! Artists, teachers, parents, and caregivers of all kinds can archive artwork and share these creations with others via their public party page, giving them new life again and again.</p>
        <h4>Click the button below to get the party started!</h4>
      </div>
      <Button type="button" size="lg" id="signin-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
