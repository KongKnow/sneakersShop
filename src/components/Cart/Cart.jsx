import box from '../../assets/img/box.svg'
import x from '../../assets/img/x.svg'

const Cart = (props) => {
    return (
        <>
            <div className={`aside-background${props.active ? ' active' : ''}`} onClick={props.handleClick}></div>
            <aside className={`cart${props.active ? ' active' : ''}`}>
                <div>

                <h2 className="cart-title">Cart</h2> 
                    {/* <div className="cart-list">
                        <div className="cart-products-card">
                        <div className="cart-products-card-img">
                        <img src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/d706522a2e954ed686e9af9c00c51b3c_9366/x_plrboost-shoes.jpg" alt="" />
                        </div>
                        <div className="cart-products-card-content">
                        <div className="cart-products-card-title">Men sneakers {'Adidas X_PLRBOOST'}</div>
                        <div className="cart-products-card-price">
                        {160}$
                        </div>
                        </div>
                        <div className="cart-products-card-remove">
                        <img src={x} alt="" />
                        </div>
                        </div>
                    </div> */}
                </div>
                    <div className="cart-empty">
                        <div className="cart-empty-img">
                            <img src={box} alt="" />
                        </div>
                        <div className="cart-empty-title">The cart is empty</div>
                        <div className="cart-empty-descr">Add at least one pair of sneakers to place an order</div>
                        <button className="btn" onClick={props.handleClick}>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7144 7L1.00007 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 13L1 7L7 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Get back
                        </button>
                    </div>
                    {/* <div className="cart-footer">
                        <div className="cart-footer-total">
                            <div className="cart-footer-total-title">Total:</div>
                            <div className="cart-footer-total-line"></div>
                            <div className="cart-footer-total-price">{160}$</div>
                        </div>
                        <div className="cart-footer-tax">
                            <div className="cart-footer-tax-title">Tax 5%:</div>
                            <div className="cart-footer-tax-line"></div>
                            <div className="cart-footer-tax-price">{160*0.05}$</div>
                        </div>
                        <div className="btn">
                            Place the order 
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div> */}
                {/* <div className="cart-confirmed"></div> */}
            </aside>
        </>
    );
};

export default Cart;