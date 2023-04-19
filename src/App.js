import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './utils/style.css';
// routes
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "./ic-fpt-landing-style/globals.css";
import "./ic-fpt-landing-style/react-slick.css";
import Router from './routes';


// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


const token = localStorage.getItem('token');
const user= sessionStorage.getItem('user');
console.log("token", token)
console.log("token", user)
// ----------------------------------------------------------------------
if (token) {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => Promise.reject.error
  );
 
  
 } 


export default function App() {
  return (
    <GoogleOAuthProvider clientId="871108526539-b5v11q9qmnu1bbda312e1dnprh3p5asg.apps.googleusercontent.com">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      <BrowserRouter>
        <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <div className="App">
              <Router />
          
            </div>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
