import {Link} from 'react-router-dom'
import cart from '../assets/img/Group.svg'
import favorites from '../assets/img/heart.svg'
import profileLogo from '../assets/img/Union.svg'
import logo from '../assets/img/logo.svg'

const Header = () => {
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
                        <Link to="/" className="header-cart">
                            <div className="header-cart-logo">
                                <img src={cart} alt="" />
                            </div>
                            <div className="header-cart-sum">250$</div>
                        </Link>
                        <Link to="/" className="header-favorites">
                            <div className="header-favorites-logo">
                                <img src={favorites} alt="" />
                            </div>
                            <div className="header-favorites-title">Favorites</div>
                        </Link>
                        <Link to="/" className="header-profile">
                            <div className="header-profile-logo">
                                <img src={profileLogo} alt="" />
                            </div>
                            <div className="header-profile-name">Profile</div>                                               
                        </Link>
                    </div>
                </nav>
        </header> 
    );
};

export default Header;