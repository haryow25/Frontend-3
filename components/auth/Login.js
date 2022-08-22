import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../redux/actions/userActions';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ButtonLoader from '../../components/layout/ButtonLoader';
import GoogleLogin from 'react-google-login';
import Link from 'next/link';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, success, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        router.push('/home');
      }, 5500);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };

    dispatch(loginUser(loginData));
  };

  const responseGoogle = async (response) => {
    try {
      const tokenId = response.tokenId;
      const result = await axios.post(`${apiUrl}/loginGoogle`, {
        tokenId,
      });
      localStorage.setItem('accessToken', result.data.data.accessToken);
      router.push('/home');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="auth-background">
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3" style={{ textAlign: 'center' }}>
                SIGN IN
              </h1>
              <div className="form-group">
                <label htmlFor="username_field">Username</label>
                <input
                  type="text"
                  id="username_field"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="#" className="float-left mb-4">
                <Link href="/forgotpassword">Forgot Password?</Link>
              </a>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
                style={{ marginBottom: '10px' }}
              >
                {loading ? <ButtonLoader /> : 'LOGIN'}
              </button>
              <span>LOGIN WITH</span>
              <GoogleLogin
                clientId="82188546756-iikurufha30hocipiu2f6f8i0hq91aua.apps.googleusercontent.com"
                buttonText="GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <div>
                <span className="float-left mt-2">
                  Don't have an account?
                  <Link href="/register" class="float-right mt-3">
                    Sign Up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
