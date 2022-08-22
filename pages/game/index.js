import React, { Fragment, useState, useEffect, Component } from 'react';
import Layout from '../../components/layout/Layout';
import withAuth from '../../HOC/withAuth';
import Image from 'next/image';
import axios from 'axios';

import Pic1 from '../../public/img/RockPaperScissor.jpg';
// import Pic2 from '../images/Coolsoccer.jpg'
// import Pic3 from '../images/Spaceinvaders.jpg'
// import Pic4 from '../images/Streetfighter.jpeg'

import { connect } from 'react-redux';
import { getPlayedGame } from '../../redux/actions/getPlayedActions';

import style from '../../styles/ListGame.module.css';

const mapStateToPros = (state) => {
  return {
    playedGames: state.played,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayedGame: () => dispatch(getPlayedGame()),
  };
};

const playedTag = () => {
  return <p>sudah dimainkan</p>;
};

const renderGameData = (game, playedGame) => {
  return game.map((game, index) => {
    let isPlayed = false;
    playedGame.playedGames.map((played) => {
      if (game.id == played.gameId) {
        isPlayed = true;
      }
    });

    return (
      <div
        className={`card ${style['card-container']}`}
        style={{ width: '300px', marginTop: '20px' }}
      >
        <Image className="card-img-top mt-3" src={Pic1}></Image>
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <p className="card-text">{game.description}</p>
          <a
            href={`/game/${game.id}`}
            className="btn"
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Play Game
          </a>
          {isPlayed ? playedTag() : null}
        </div>
      </div>
    );
  });
};

const ListGame = (props) => {
  const [game, setGame] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    props.getPlayedGame();
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/game`)
      .then((response) => response.json())
      .then((result) => {
        setGame(result.data);
        console.log(result.data);
      });
  }, [apiUrl]);

  return (
    <Fragment>
      <Layout title="List Game">
        <div
          className={'container-fluid game-list-bg'}
          style={{
            backgroundColor: '#F6F8FF',
            height: '222mm',
            paddingTop: '20px',
          }}
        >
          <div className="row d-flex justify-content-around">
            {renderGameData(game, props.playedGames)}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};
const ShowGame = connect(mapStateToPros, mapDispatchToProps)(ListGame);

export default withAuth(ShowGame);
