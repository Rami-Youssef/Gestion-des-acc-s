import logo from './logo.svg';
import './App.css';
import Fiche from './fiche-demande/fiche';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './log-in/log-in.jsx';
import ListDemande from './ListDemande/ListDemande.jsx';
import Header from './layouts/header/header.jsx';
import Config from './config/config.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} index/>
        <Route element={<Header/>} path='/GDA'>
          <Route element={<Fiche/>} path='/GDA/demande'/>
          <Route element={<ListDemande/>} path="/GDA/List" />
          <Route element={<Config/>} path="/GDA/config/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
