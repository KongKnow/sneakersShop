import { useSelector } from 'react-redux';
import x from '../../assets/img/x.svg';
import CartEmpty from './CartEmpty';
import {
  removeItemFromCart,
  addQuantityToCart,
  removeQuantityFromCart,
  addItemsFromLocalStorage,
} from '../../redux/cartSlice/cartSlice';
import { FC, useEffect } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';

type TypeProps = {
  handleClick:()=>void,
  active: boolean
}

const Cart: FC<TypeProps> = (props) => {
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const favorites = useSelector((state: RootState) => state.cart.favorites);

  useEffect(() => {
    const propsLS = {
      cart: [],
      totalPrice: 0,
      favorites: []
    }
    let cartLS: string | null = localStorage.getItem('cart')
    if(typeof(cartLS) === 'string') propsLS.cart = JSON.parse(cartLS)
    let totalPriceLS: string | null = localStorage.getItem('totalPrice')
    if(typeof(totalPriceLS) === 'string') propsLS.totalPrice = +totalPriceLS
    let favoritesLS: string | null = localStorage.getItem('favorites')
    if(typeof(favoritesLS) === 'string') propsLS.favorites = JSON.parse(favoritesLS)
    
    dispatch(
      addItemsFromLocalStorage({
        ...propsLS
      }),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', `${totalPrice}`);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <div
        className={`aside-background${props.active ? ' active' : ''}`}
        onClick={props.handleClick}></div>
      <aside className={`cart${props.active ? ' active' : ''}`}>
        <div>
          <h2 className="cart-title">
            Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={props.handleClick}
              className="cart-close bi bi-x-lg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </h2>
          {cart.length && cart.length === 0 ? null : (
            <div className="cart-list">
              {cart.map((item) => {
                return (
                  <div className="cart-products-card" key={item.id}>
                    <div className="cart-products-card-img">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="cart-products-card-content">
                      <div className="cart-products-card-title">Men's sneakers {item.title}</div>
                      <div className="cart-products-card-price">{item.price}$</div>
                    </div>
                    <div>
                      <div
                        className="cart-products-card-remove"
                        onClick={() => {
                          dispatch(removeItemFromCart(item));
                        }}>
                        <img src={x} alt="" />
                      </div>
                      <div className="cart-products-card-counter">
                        <span
                          onClick={() => {
                            dispatch(removeQuantityFromCart(item));
                          }}>
                          &#8249;
                        </span>
                        {item.quantity ? item.quantity : 1}
                        <span
                          onClick={() => {
                            dispatch(addQuantityToCart(item));
                          }}>
                          &#8250;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {cart.length === 0 && <CartEmpty handleClick={props.handleClick} />}
        {cart.length === 0 ? null : (
          <div className="cart-footer">
            <div className="cart-footer-total">
              <div className="cart-footer-total-title">Total:</div>
              <div className="cart-footer-total-line"></div>
              <div className="cart-footer-total-price">{totalPrice}$</div>
            </div>
            <div className="cart-footer-tax">
              <div className="cart-footer-tax-title">Tax 5%:</div>
              <div className="cart-footer-tax-line"></div>
              <div className="cart-footer-tax-price">{totalPrice * 0.05}$</div>
            </div>
            <div className="btn">
              Place the order
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 7H14.7143"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.71436 1L14.7144 7L8.71436 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
        {/* <div className="cart-confirmed"></div> */}
      </aside>
    </>
  );
};

export default Cart;
