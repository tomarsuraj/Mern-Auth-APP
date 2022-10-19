import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFount from './pages/PageNotFount';
import Header from './Components/Header';
import { Contactus } from './pages/Contactus';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
