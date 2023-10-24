import { useEffect, useState, useRef } from "react";
import img from '../../assets/img/search.svg'
import Skeleton from '../Skeleton/Skeleton'
import ProductsCard from "./ProductsCard";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../redux/productsSlice/productsSlice";

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const selectedCategory = useSelector(state => state.products.selectedCategory)
    const [value, setValue] = useState('')
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const prevPage = useRef(null)

    useEffect(() => {
        dispatch(getSneakers({
            category: selectedCategory,
            page
        }))            
        prevPage.current = 1
        
    }, [selectedCategory, page])

    useEffect(() => {
        setPage(1)  
        setItems([])  
    }, [selectedCategory])

    
    useEffect(() => {
        if(prevPage.current !== page) {
            setItems([...items, ...products])       
            
        } else {
            setItems([...products])
        }
    }, [products])
    
    useEffect(() => {
        prevPage.current = page      
    }, [products])  

    const changeHandle = (e) => {
        setValue(e.target.value)
    }

    const clickHandle = () => {
        if (products.length < 8) return
        setPage(page => page += 1)
    }

    const productsRender = items.map(product => (
        <ProductsCard {...product} key={product.id}/>
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

        <div className="btn-wrapper">
            <button className={products.length < 8 ? 'btn-products active' : 'btn-products'} onClick={clickHandle}>Load more</button>
        </div>

        </section>
    );
};

export default Products;