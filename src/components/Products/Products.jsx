import { useState } from "react";
import img from '../../assets/img/search.svg'
import heart from  '../../assets/img/cardHeart.svg'
import heartActive from '../../assets/img/heartActive.svg'
import add from '../../assets/img/plus.svg'
import checked from '../../assets/img/addedGreen.svg'
import Skeleton from '../Skeleton/Skeleton'

const Products = () => {
    const [value, setValue] = useState('')

    const changeHandle = (e) => {
        setValue(e.target.value)
    }

    const favoriteState = false
    const addCartState = false

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
        <section className="products">
            <div className="products-header">
                <h2 className="products-title">{'All sneakers'}</h2>
                <form action="" className="products-search">
                    <img src={img} alt="" />
                    <input type="text" name="text" value={value} placeholder="Search..." autoComplete="off" onChange={(e) => {changeHandle(e)}}/>
                </form>
            </div>

            <div className="products-list">
                    <div className="products-card">
                         <div className="products-card-image">
                            <img src="https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/d706522a2e954ed686e9af9c00c51b3c_9366/x_plrboost-shoes.jpg" alt="" />
                        </div>
                        <div className="products-card-title">Men sneakers {'Adidas X_PLRBOOST'}</div>
                        <div className="products-card-footer">
                            <div className="products-card-price">
                                <span>PRICE:</span>
                                {160}$
                            </div>
                            <div className="products-card-box">
                                {favoriteAdded}
                                {cartAdded}
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

        </section>
    );
};

export default Products;