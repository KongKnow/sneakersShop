import { useEffect, useState } from "react";
import {getSneakers, setFilter} from '../../redux/productsSlice/productsSlice'
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch()
    const filters = [
        {
            name: 'Order by price (asc)',
            url: '&sortBy=price&order=asc'
        },
        {
            name: 'Order by price (desc)',
            url: '&sortBy=price&order=desc'
        },
        {
            name: 'Order by title (asc)',
            url: '&sortBy=title&order=asc'
        },
        {
            name: 'Order by title (desc)',
            url: '&sortBy=title&order=desc'
        }
    ]
    const filter = useSelector(state => state.products.filter)
    // const [filter, setFilter] = useState(filters[0])
    const [dropMenu, setDropMenu] = useState(false)

    useState(() => {
        if(!Object.keys(filter).length) {
            dispatch(setFilter(filters[0]))
        }
    }, [])

    const handleClick = (item) => {
        dispatch(setFilter(item))
        setDropMenu(false)
    }

    return (
        <div className={dropMenu ? 'filter active' : 'filter'} >
            <div className={dropMenu ? 'filter-active active' : 'filter-active'} onClick={() => {
                setDropMenu(dropMenu => !dropMenu)
            }}>
                {/* <img className={dropMenu ? 'active' : ''} src={arrow} alt="" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" className={dropMenu ? 'active' : ''}  width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                {filter.name}
            </div>
            <div className={dropMenu ? 'filter-list active' : 'filter-list'}>
                {filters.map((item, i) => (
                    <div className="filter-list-item" key={i} onClick={() => handleClick(item)}>{item.name}</div>
                ))}
            </div>
        </div>
    );
};

export default Filter;