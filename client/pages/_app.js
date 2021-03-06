import ToNav from '../components/ToNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ToastContainer position='top-center' />
            <ToNav />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;