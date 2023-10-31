import { useEffect, useState, useRef, useCallback } from "react";
import img from '../../assets/img/search.svg'
import Skeleton from '../Skeleton/Skeleton'
import ProductsCard from "./ProductsCard";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers, setSearchValue, setLoading } from "../../redux/productsSlice/productsSlice";
import debounce from "lodash.debounce";

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const selectedCategory = useSelector(state => state.products.selectedCategory)
    const filter = useSelector(state => state.products.filter)
    const searchValue = useSelector(state => state.products.searchValue)
    const [value, setValue] = useState('')
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const prevPage = useRef(null)
    const input = useRef(null)

    const onInputStopChanging = useCallback(
        debounce((value) => {
            dispatch(setSearchValue(value))
        }, 1000),
        []
    )

    useEffect(() => {
        dispatch(getSneakers({
            category: selectedCategory,
            page,
            filter: filter.url,
            search: searchValue
        }))            
        prevPage.current = 1
        
    }, [selectedCategory, page, filter, searchValue])

    useEffect(() => {
        setPage(1)  
        setItems([])
    }, [selectedCategory, filter])

    useEffect(() => {
        setPage(1)  
        setItems([])
    }, [searchValue])

    useEffect(() => {
        setValue('')
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
        onInputStopChanging(e.target.value)
    }

    const clickHandle = () => {
        if (products.length < 8) return
        setPage(page => page += 1)
    }

    const clearValue = () => {
        setValue('')
        dispatch(setSearchValue(''))
        input.current?.focus()
    }

    if(value === '' && searchValue !== '') {
        setValue(searchValue)
    }

    const productsRender = items.map(product => (
        <ProductsCard {...product} key={product.id}/>
    ))

    const loaded = loading ? <Skeleton/> : productsRender
    const empty = !productsRender.length ? <div className="products-list-empty">Your request yielded no results :{'('}</div> : null

    return (
        <section className="products">
            <div className="products-header">
                <h2 className="products-title">{selectedCategory.toUpperCase()} sneakers</h2>
                {selectedCategory === 'all' && <form action="" className="products-search">
                    <img src={img} alt="" />
                    <input ref={input} type="text" name="text" value={value} placeholder="Search..." autoComplete="off" onChange={(e) => {changeHandle(e)}}/>
                    {value === '' ? null : <svg onClick={clearValue} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#C4C4C4" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                            </svg>}
                </form>}
            </div>

            {empty && !loading ? empty : 
                <>
                    <div className="products-list">
                        {loaded}
                    </div>

                    <div className="btn-wrapper">
                        <button className={products.length < 8 ? 'btn-products active' : 'btn-products'} onClick={clickHandle}>Load more</button>
                    </div>
                </>
            }

        </section>
    );
};

export default Products;