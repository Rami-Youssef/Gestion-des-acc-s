import logo from './logo.svg';
import './App.css';
import Fiche from './fiche-demande/fiche';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './log-in/log-in.jsx';
import Header from './layouts/header/header.tsx';
import DemandePage from './pls'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>} path='/test'/>
          <Route element={<Fiche/>} path='/demande'/>
          <Route element={<Login/>} index/>
          <Route element={<DemandePage/>} path='yo' />
          
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
