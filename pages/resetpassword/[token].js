import ResetPassword from '../../components/auth/ResetPassword';
import Layout from '../../components/layout/Layout';
import withAuthLogin from '../../HOC/withAuthLogin';

function ResetPass() {
  return (
    <Layout title="Reset Password">
      <ResetPassword />
    </Layout>
  );
}

export default withAuthLogin(ResetPass);
