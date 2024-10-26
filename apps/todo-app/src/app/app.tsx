import { RecoilRoot } from 'recoil';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './views/Layout';

export function App() {
  return (
    <>
      <RecoilRoot>
        <ToastContainer />
        <Layout />
      </RecoilRoot>
    </>
  );
}

export default App;
