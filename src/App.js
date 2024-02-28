
import Navbar from './components/Navbar'
import About from './components/About'
import Notes from './components/Notes'
import SignUpOrLogin from './components/SignUpOrLogin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './context/Notes/NoteState'
import { useState } from 'react';
import Toast from './components/Toast';
function App() {
  const [toast, setToast] = useState(null);
  const ShowToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null)
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {toast && <Toast message={toast.message} type={toast.type} />}
          <div className="flex bg-dark text-white">
            <Routes>
              <Route exact path='/' element={<SignUpOrLogin ShowToast={ShowToast} />}></Route>
              <Route exact path='/About' element={<About />}></Route>
              <Route exact path='/Notes' element={<Notes ShowToast={ShowToast} />}></Route>
              <Route exact path='/SignUpOrLogin' element={<SignUpOrLogin ShowToast={ShowToast} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
