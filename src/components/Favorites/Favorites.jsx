import { Link, useNavigate } from 'react-router-dom';
import emoji from '../../assets/img/emojiSad.svg' 
import backArrow from '../../assets/img/backArrow.svg'
import ProductsCard from '../Products/ProductsCard';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const Favorites = () => {
    const favorites = useSelector(state => state.cart.favorites)
    

    return (
        <>
            <Helmet>
                <title>Sneakers Shop - Favorites</title>
                <meta name="description" content="home page" />
            </Helmet>
            <section className="favorites">
                {favorites.length ? (
                    <>
                    <div className="favorites-title">
                        <Link to="/"><img src={backArrow} alt="" /></Link>
                        My favorites
                    </div>
                    <div className="favorites-list">
                        {favorites.map(item => {
                            return <ProductsCard {...item} key={item.id}/>
                        })}
                    </div>
                    </>
                ) : (
                    <div className="favorites-inner">
                        <div className="favorites-img">
                            <img src={emoji} alt="" />
                        </div>
                        <div className="favorites-empty-title">No favorites yet :{'('}</div>
                        <div className="favorites-empty-descr">You didn't add anything to favorites</div>
                        <Link to="/" className="btn">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Get back
                        </Link>
                    </div>
                )}
                
            </section>
        </>
    );
};

export default Favorites;