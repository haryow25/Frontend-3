import ForgotPass from '../components/auth/ForgotPassword';
import Layout from '../components/layout/Layout';
import withAuthLogin from '../HOC/withAuthLogin';

function ForgotPassword() {
  return (
    <Layout title="Forgot Password">
      <ForgotPass />
    </Layout>
  );
}

export default withAuthLogin(ForgotPassword);
