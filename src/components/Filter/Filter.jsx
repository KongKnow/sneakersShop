import { useState } from "react";
import arrow from '../../assets/img/caret-down-fill.svg'

const Filter = () => {
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
    const [filter, setFilter] = useState(filters[0])
    const [dropMenu, setDropMenu] = useState(false)


    const handleClick = (item) => {
        setFilter(item)
        setDropMenu(false)
    }

    return (
        <div className="filter" >
            <div className="filter-active" onClick={() => {
                setDropMenu(dropMenu => !dropMenu)
            }}>
                <img src={arrow} alt="" />
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