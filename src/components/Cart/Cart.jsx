import { useDispatch, useSelector } from 'react-redux';
import box from '../../assets/img/box.svg'
import x from '../../assets/img/x.svg'
import CartEmpty from './CartEmpty';
import { removeItemFromCart, addQuantityToCart, removeQuantityFromCart, addItemsFromLocalStorage } from '../../redux/cartSlice/cartSlice';
import { useEffect } from 'react';

const Cart = (props) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const favorites = useSelector(state => state.cart.favorites)

    useEffect(() => {
        dispatch(addItemsFromLocalStorage({
            cart: localStorage.getItem("cart"),
            totalPrice: localStorage.getItem("totalPrice"),
            favorites: localStorage.getItem("favorites"),
        }))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("totalPrice", totalPrice)
    }, [cart])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    return (
        <>
            <div className={`aside-background${props.active ? ' active' : ''}`} onClick={props.handleClick}></div>
            <aside className={`cart${props.active ? ' active' : ''}`}>
                <div>

                <h2 className="cart-title">Cart</h2> 
                    {cart.length === 0 ? null : <div className="cart-list">
                        {cart.map(item => {
                            return (
                                <div className="cart-products-card" key={item.id}>
                                    <div className="cart-products-card-img">
                                        <img src={item.imageUrl} alt="" />
                                    </div>
                                    <div className="cart-products-card-content">
                                        <div className="cart-products-card-title">Men's sneakers {item.title}</div>
                                        <div className="cart-products-card-price">
                                        {item.price}$
                                        </div>
                                    </div>
                                    <div>
                                        <div className="cart-products-card-remove" onClick={() => {dispatch(removeItemFromCart(item))}}>
                                            <img src={x} alt="" />
                                        </div>
                                        <div className="cart-products-card-counter">
                                            <span onClick={() => {dispatch(removeQuantityFromCart(item))}}>&#8249;</span>
                                            {item.quantity ? item.quantity : 1}
                                            <span onClick={() => {dispatch(addQuantityToCart(item))}}>&#8250;</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                    {cart.length === 0 && <CartEmpty handleClick={props.handleClick} box={box}/>}
                    {cart.length === 0 ? null : (<div className="cart-footer">
                        <div className="cart-footer-total">
                            <div className="cart-footer-total-title">Total:</div>
                            <div className="cart-footer-total-line"></div>
                            <div className="cart-footer-total-price">{totalPrice}$</div>
                        </div>
                        <div className="cart-footer-tax">
                            <div className="cart-footer-tax-title">Tax 5%:</div>
                            <div className="cart-footer-tax-line"></div>
                            <div className="cart-footer-tax-price">{totalPrice*0.05}$</div>
                        </div>
                        <div className="btn">
                            Place the order 
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>)}
                {/* <div className="cart-confirmed"></div> */}
            </aside>
        </>
    );
};

export default Cart;