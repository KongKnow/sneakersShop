import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Favorites from "../components/Favorites/Favorites";
import Profile from "../components/Profile/Profile";
import ProductsPage from "../components/Products/ProductsPage";
import SignUpForm from "../components/Profile/SignUpForm";
import LogInForm from "../components/Profile/LogInForm";

const App = () => {
    const [showCart, setShowCart] = useState(false)
    
    const handleClick = () => {
        setShowCart(showCart => !showCart)
        document.body.classList.toggle('active')
    }

    return (
        <section className="container">
            <Header handleClick={handleClick}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/product/:id" element={<ProductsPage/>}/>
                <Route path="/sign-up" element={<SignUpForm/>}/>
                <Route path="/log-in" element={<LogInForm/>}/>
            </Routes>
            <Cart handleClick={handleClick} active={showCart}/>
        </section>
    );
};

export default App;