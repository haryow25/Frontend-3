import jwt_decode from 'jwt-decode';
import Login from '../components/auth/Login';
import Layout from '../components/layout/Layout';
import withAuthLogin from '../HOC/withAuthLogin';

function LoginPage() {
  return (
    <Layout title="Login">
      <Login />
    </Layout>
  );
}

export default withAuthLogin(LoginPage);
