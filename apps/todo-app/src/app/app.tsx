import { RecoilRoot } from 'recoil';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './views/Layout';
import LandingPage from './views/LandingPage';

export function App() {
  return (
    <>
      <RecoilRoot>
        <ToastContainer />
        <Layout>
          <LandingPage />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default App;
