import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import { FC, useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import Favorites from "../components/Favorites/Favorites";
import Profile from "../components/Profile/Profile";
import ProductsPage from "../components/Products/ProductsPage";
import SignUpForm from "../components/Profile/SignUpForm";
import LogInForm from "../components/Profile/LogInForm";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/userSlice/userSlice";
import ChangePassword from "../components/Profile/ChangePassword";
import { TypeInitialStateUser } from "../redux/userSlice/userSlice";
import logo from '../assets/img/logo.svg'

const App: FC = () => {
    const dispatch = useAppDispatch()
    const [showCart, setShowCart] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(false)

    const handleClick = () => {
        setShowCart(showCart => !showCart)
        document.body.classList.toggle('active')
    }

    useEffect(() => {
        setIsLoaded(true)
        const user: TypeInitialStateUser = JSON.parse(localStorage.getItem('ss-account') || '{}')
        if(!user) return
        dispatch(setUser(user))
    }, [])

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
        }
    }, [isLoaded]);

    return (
        <>
            
            <div className={isPageLoaded ? "curtain active" : "curtain"}>
                <img src={logo} alt="" />
            </div>
            
            <section className="container">
                <Header handleClick={handleClick}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/product/:id" element={<ProductsPage/>}/>
                    <Route path="/sign-up" element={<SignUpForm/>}/>
                    <Route path="/log-in" element={<LogInForm/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                </Routes>
                <Cart handleClick={handleClick} active={showCart}/>
            </section>
        </>
    );
};

export default App;