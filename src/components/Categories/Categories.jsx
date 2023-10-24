import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getSneakers, selectCategory } from "../../redux/productsSlice/productsSlice";

const Categories = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.products.categories)
    const selectedCategory = useSelector(state => state.products.selectedCategory)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <div className="categories">
            <div className={`category${selectedCategory==='all' ? ' active' : ''}`} onClick={() => dispatch(selectCategory('all'))}>All</div>
            {categories.map((item, i) => {
                return <div className={`category${selectedCategory===item ? ' active' : ''}`} key={i} onClick={() => dispatch(selectCategory(item))}>{item}</div>
            })}
        </div>
    );
};

export default Categories;