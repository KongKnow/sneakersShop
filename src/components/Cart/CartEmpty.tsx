import { FC } from "react";
import box from '../../assets/img/box.svg';

const CartEmpty: FC<{handleClick:()=>void}> = (props) => {
    return (
        <div className="cart-empty">
                        <div className="cart-empty-img">
                            <img src={box} alt="" />
                        </div>
                        <div className="cart-empty-title">The cart is empty</div>
                        <div className="cart-empty-descr">Add at least one pair of sneakers to place an order</div>
                        <button className="btn" onClick={props.handleClick}>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Get back
                        </button>
                    </div>
    );
};

export default CartEmpty;