import { Link } from 'react-router-dom';
import emoji from '../../assets/img/emojiSad.svg' 
import backArrow from '../../assets/img/backArrow.svg'
import ProductsCard from '../Products/ProductsCard';

const Favorites = () => {
    return (
        <section className="favorites ">
            <div className="favorites-title">
                <Link to="/"><img src={backArrow} alt="" /></Link>
                My favorites
            </div>
            <div className="favorites-list">
                <ProductsCard favoriteState={true} addCartState={false}/>
                <ProductsCard favoriteState={true} addCartState={false}/>
            </div>
            {/* <div className="favorites-inner">
                <div className="favorites-img">
                    <img src={emoji} alt="" />
                </div>
                <div className="favorites-empty-title">No favorites yes :{'('}</div>
                <div className="favorites-empty-descr">You didn't add anything to favorites</div>
                <Link to="/" className="btn">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7144 7L1.00007 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 13L1 7L7 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Get back
                </Link>
            </div> */}
        </section>
    );
};

export default Favorites;