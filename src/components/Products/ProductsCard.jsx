import heart from  '../../assets/img/cardHeart.svg'
import heartActive from '../../assets/img/heartActive.svg'
import add from '../../assets/img/plus.svg'
import checked from '../../assets/img/addedGreen.svg'
import {Link} from 'react-router-dom'

const ProductsCard = (props, {addCartState, favoriteState}) => {

    const {imageUrl, title, price, id} = props

    const cartAdded = addCartState ? (
        <div className="products-card-add active">
            <img src={checked} alt="" />
        </div>
    ) : (
        <div className="products-card-add">
            <img src={add} alt="" />
        </div>
    )

    const favoriteAdded = favoriteState ? (
        <div className="products-card-favorite active">
            <img src={heartActive} alt="" />
        </div>
    ) : (
        <div className="products-card-favorite">
            <img src={heart} alt="" />
        </div>
    )

    return (
        <div className="products-card">
            <Link to={`/product/${id}`} className="products-card-image">
                <img src={imageUrl} alt="" />
            </Link>
            <Link to={`/product/${id}`} className="products-card-title">Men's sneakers {title}</Link>
            <div className="products-card-footer">
            <div className="products-card-price">
                <span>PRICE:</span>
                {price}$
            </div>
            <div className="products-card-box">
                {favoriteAdded}
                {cartAdded}
            </div>
                            
            </div>
        </div>
    );
};

export default ProductsCard;