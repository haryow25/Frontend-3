import React, { Fragment, useState, useEffect, Component } from 'react';
import { useRouter, withRouter, NextRouter } from 'next/router';

import Image from 'next/image';
import style from '../styles/Monopoli.module.css';
import { connect } from 'react-redux';
import { setMonopoliScore } from '../redux/actions/monopoliScoreActions';

const mapStateToPros = (state) => {
  return {
    monopoliScore: state.monopoli,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMonopoliScore: (score) => dispatch(setMonopoliScore(score)),
  };
};

const clickHandel = (props) => {
  let randomScore = Math.ceil(Math.random() * 10);
  props.setMonopoliScore(props.monopoliScore.monopoliScore + randomScore);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  fetch(`${apiUrl}/score`, {
    method: 'put', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      gameId: '2',
      score: randomScore,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

function monopoli(props) {
  const router = useRouter();
  
  return (
    <Fragment>
      <div id={style['content-container']}>
        <section id={style['judul']}>
          <div className="container">
            <div
              className="row d-flex flex-column justify-content-center align-items-center"
              style={{ minHeight: '100vh' }}
            >
              <div className="col-11 d-flex flex-column justify-content-center">
                <h1
                  className="text-center text-uppercase mt-5"
                  style={{ color: 'black' }}
                >
                  {' '}
                  Total Score = {props.monopoliScore.monopoliScore}{' '}
                </h1>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    clickHandel(props);
                  }}
                >
                  Get Score
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
const ShowScore = connect(mapStateToPros, mapDispatchToProps)(monopoli);

export default ShowScore;
