import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Collection from './pages/Collection';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Compare from './pages/Compare';
import Mail from './pages/Mail';
import User from './pages/User';
import Option from './pages/Option';
import "./styles/App.css"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Compare' element={<Compare />} />
        <Route path='/Mail' element={<Mail />} />
        <Route path='/User' element={<User />} />
        <Route path='/Option' element={<Option />} />
    </Routes>
  );
}

export default App;
