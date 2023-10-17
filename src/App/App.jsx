import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import { useState } from "react";
import Cart from "../components/Cart/Cart";

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
            </Routes>
            <Cart handleClick={handleClick} active={showCart}/>
        </section>
    );
};

export default App;