import { useEffect, useState } from "react";
import img from '../../assets/img/search.svg'
import Skeleton from '../Skeleton/Skeleton'
import ProductsCard from "./ProductsCard";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../redux/productsSlice/productsSlice";

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(getSneakers())
    }, [])

    const changeHandle = (e) => {
        setValue(e.target.value)
    }

    const favoriteState = false
    const addCartState = false

    const productsRender = products.map(product => (
        <ProductsCard addCartState={addCartState} favoriteState={favoriteState} {...product} key={product.id}/>
    ))

    const loaded = loading ? <Skeleton/> : productsRender

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
                {loaded}
            </div>

        </section>
    );
};

export default Products;