import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';

function App(props) {
  if (props.shoes === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes" element={<ShoesList shoes={props.shoes} />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
