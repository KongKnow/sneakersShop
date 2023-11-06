import heart from  '../../assets/img/cardHeart.svg'
import heartActive from '../../assets/img/heartActive.svg'
import add from '../../assets/img/plus.svg'
import checked from '../../assets/img/addedGreen.svg'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, toggleItemToFavorites } from '../../redux/cartSlice/cartSlice'

const ProductsCard = (props) => {
    const {imageUrl, title, price, id} = props

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const favorites = useSelector(state => state.cart.favorites)

    const productCart = cart.filter(item => item.id === id)
    const productFavorites = favorites.filter(item => item.id === id)

    const cartAdded = productCart.length ? (
        <div className="products-card-add active" onClick={() => {dispatch(addItemToCart({imageUrl, title, price, id, quantity: 1}))}}>
            <img src={checked} alt="" />
            <div className="products-card-counter">{productCart[0].quantity}</div>
        </div>
    ) : (
        <div className="products-card-add" onClick={() => {dispatch(addItemToCart({imageUrl, title, price, id, quantity: 1}))}}>
            <img src={add} alt="" />
        </div>
    )

    const favoriteAdded = productFavorites.length ? (
        <div className="products-card-favorite active" onClick={() => {dispatch(toggleItemToFavorites({imageUrl, title, price, id}))}}>
            <img src={heartActive} alt="" />
        </div>
    ) : (
        <div className="products-card-favorite" onClick={() => {dispatch(toggleItemToFavorites({imageUrl, title, price, id}))}}>
            <img src={heart} alt="" />
        </div>
    )

    return (
        <div className="products-card">
            <Link to={`/product/${id}`} className="products-card-image">
                <img src={imageUrl} alt="" />
            </Link>
            <div className='products-card-wrapper'>
                <Link to={`/product/${id}`} className="products-card-title">Men's sneakers {title}</Link>
                <div className="products-card-footer">
                    <div className="products-card-price">
                        <span>PRICE:</span>
                        {price}$
                    </div>
                    <div className="products-card-box">
                        {cartAdded}
                        {favoriteAdded}
                    </div>
                                
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;