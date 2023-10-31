import './App.css';
import { useState } from 'react';
import Navbar from './component/Navbar';
import { Home } from './component/Home';
import About from './component/About';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';
import Footer from './component/footer/Footer';
function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  
  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar  />
          <Alert alert={alert} />
          <div className='conatainer'>
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert}  ></Home>}></Route>
              <Route path='/about' element={<About></About>}></Route>
              <Route path='/login' element={<Login showAlert={showAlert}></Login >}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert}></Signup >}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
      <Footer/>
    
    
      

    </>
  );
}

export default App;
