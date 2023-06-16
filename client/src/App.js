import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';
import './App.css';
import ClassDetailsPage from './pages/ClassDetailsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<HomePage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/register' element = {<RegisterPage/>}/>
          <Route path='/class-details' element = {<ClassDetailsPage/>} />
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
