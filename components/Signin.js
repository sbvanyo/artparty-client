import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div id="login-screen">
      <Image id="logo-lg" src="https://firebasestorage.googleapis.com/v0/b/artparty-fb1dd.appspot.com/o/images%2Fartparty.JPG?alt=media&token=6b243006-082e-4356-bf77-67a1f9bfbd03" />
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
