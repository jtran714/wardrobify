import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import NewShoe from './NewShoe';
import React from 'react';
import HatForm from './HatForm';
import HatsList from './HatsList';

function App(props) {
  if (props.shoes === undefined && props.hats === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes" element={<ShoesList shoes={props.shoes} />} />
          <Route path="shoes/new" element={<NewShoe />} />
          <Route path="hats/new" element={<HatForm />} />
          <Route path="hats" element={<HatsList hats={props.hats} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
