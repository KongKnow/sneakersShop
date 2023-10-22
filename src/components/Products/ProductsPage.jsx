import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSneakersById } from "../../redux/singleProductSlice/singleProductSlice";


const ProductsPage = () => {
    const dispatch = useDispatch()
    const {imageUrl, title, price} = useSelector(state => state.singleProduct.product)
    const loading = useSelector(state => state.singleProduct.loading)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getSneakersById(id))
    }, [])

    return (
        <>
            {loading || (<section className="product">
                <div className="product-img">
                    <img src={imageUrl} alt="" />
                </div>
                <div className="product-content">
                    <h2 className="product-title">{title}</h2>
                    <div className="product-subtitle">Men's sneakers</div>
                    <div className="product-price">{price}$</div>
                    <button className="btn-cart">Add to cart</button>
                    <button className="btn-favorite">Favorite</button>
                </div>
            </section>)}
        </>
    );
};

export default ProductsPage;