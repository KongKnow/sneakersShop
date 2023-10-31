import {Link} from 'react-router-dom'
import cart from '../../assets/img/Group.svg'
import heart from '../../assets/img/heart.svg'
import profileLogo from '../../assets/img/Union.svg'
import logo from '../../assets/img/logo.svg'
import heartActive from '../../assets/img/heartActive.svg'
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth'

const Header = (props) => {
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const favorites = useSelector(state => state.cart.favorites)
    const {isAuth, email} = useAuth()

    return (
        <header className='header'>
                <nav className="header-inner">
                    <Link to="/" className="header-logo">
                        <div className="header-logo-image">
                            <img src={logo} alt="" />
                        </div>
                        <div className="header-titles">
                            <h1 className="header-title">SNEAKERS SHOP</h1>
                            <h3 className="header-subtitle">Best sneakers shop</h3>
                        </div>
                    </Link>
                    <div className="header-content">
                        <div className="header-cart" onClick={props.handleClick}>
                            <div className="header-cart-logo">
                                <img src={cart} alt="" />
                            </div>
                            <div className="header-cart-sum">{totalPrice}$</div>
                        </div>
                        <Link to="/favorites" className="header-favorites">
                            <div className="header-favorites-logo">
                                <img src={favorites.length && favorites.length ? heartActive : heart} alt="" />
                            </div>
                            <div className="header-favorites-title">Favorites</div>
                        </Link>
                        <Link to="/profile" className="header-profile">
                            <div className="header-profile-logo">
                                <img src={profileLogo} alt="" />
                            </div>
                            <div className="header-profile-name">{isAuth ? email : 'Profile'}</div>                                               
                        </Link>
                    </div>
                </nav>
        </header> 
    );
};

export default Header;