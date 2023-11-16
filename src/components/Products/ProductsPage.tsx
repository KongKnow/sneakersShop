import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSneakersById } from "../../redux/singleProductSlice/singleProductSlice";
import { addItemToCart, toggleItemToFavorites } from "../../redux/cartSlice/cartSlice";
import { Helmet } from "react-helmet";
import { RootState, useAppDispatch } from "../../redux/store";


const ProductsPage: FC = () => {
    const dispatch = useAppDispatch()
    const {imageUrl, title, price} = useSelector((state: RootState) => state.singleProduct.product)
    const loading = useSelector((state: RootState) => state.singleProduct.loading)
    const cart = useSelector((state: RootState) => state.cart.cart)
    const favorites = useSelector((state: RootState) => state.cart.favorites)
    const {id} = useParams()

    const productCart = cart.filter(item => item.id === id)
    const productFavorites = favorites.filter(item => item.id === id)

    useEffect(() => {
        dispatch(getSneakersById(id))
    }, [])

    return (
        <>
            <Helmet>
                <title>Sneakers Shop - {`${title}`}</title>
                <meta name="description" content="home page" />
            </Helmet>
            <section className="product">
                {loading ||  (
                    <>
                        <div className="product-img">
                            <img src={imageUrl} alt="" />
                        </div>
                        <div className="product-content">
                            <h2 className="product-title">{title}</h2>
                            <div className="product-subtitle">Men's sneakers</div>
                            <div className="product-price">{price}$</div>
                            <button className={productCart.length ? 'btn-cart active' : 'btn-cart'} onClick={() => {dispatch(addItemToCart({imageUrl, title, price, id, quantity: 1}))}}>Add to cart: { productCart.length ? productCart[0].quantity : 0}</button>
                            <button className={productFavorites.length ? 'btn-favorite active' : 'btn-favorite'} onClick={() => {dispatch(toggleItemToFavorites({imageUrl, title, price, id}))}} >Favorite</button>
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default ProductsPage;