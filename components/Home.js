import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
//import Image from 'next/image';

const Home = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
  });

  const { first_name, last_name } = user;

  useEffect(() => {
    try {
      (async () => {
        const config = {
          headers: {
            "authorization": `${localStorage.getItem('accessToken')}`,
          },
        };
        const result = await axios.get('http://localhost:4000/api/me', config);
        setUser({
          first_name: result.data.user.first_name,
          last_name: result.data.user.last_name,
        });
      })();
    } catch (error) {
      console.log(error.response);
    }
  }, []);
  
  return (
    <div className="home-bg-image">
      <div className="home-background">
        <br />
        <div className="container home-box text-center">
          <br />
          <h1>
            Hello, {first_name} {last_name}!
          </h1>
          <br />
          <p>Welcome to Mini-Website Game.</p>
          <p>We've got many of free online games for you to play.</p>
          <br />
          <Link href="/game">
            <a className="btn">START YOUR FAVORITE GAME</a>
          </Link>
          <br />
          <br />
        </div>
        <br />
        <br />
        <div className="container home-img text-center">
          <a href="/game/1">
            <img
              src="https://miro.medium.com/max/700/1*8du96SQUQ0NlWmWvVu20Zw.png"
              className="image"
            />
          </a>
          <a href="/game/2">
            <img
              className="img-margin"
              src="https://cdn1-production-images-kly.akamaized.net/4CSD19GZFRUjQx29jJzWmwrhmcQ=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1035682/original/050130000_1446021579-monopoly-movie.jpg"
            />
          </a>
          <a href="/game/3">
            <img
              className="img-margin"
              src="https://cdn.medcom.id/dynamic/content/2021/11/23/1355963/dLvQqxg68A.jpg?w=480"
            />
          </a>
        </div>
        <div className="container text-center">
          <h3>
            <strong>...and more!</strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
