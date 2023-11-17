import { FC, useEffect, useState } from 'react';
import { setFilter } from '../../redux/productsSlice/productsSlice';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { TypeFilter } from '../../redux/productsSlice/productsSlice';

const Filter: FC = () => {
  const dispatch = useAppDispatch();
  const filters = [
    {
      name: 'Order by price (asc)',
      url: '&sortBy=price&order=asc',
    },
    {
      name: 'Order by price (desc)',
      url: '&sortBy=price&order=desc',
    },
    {
      name: 'Order by title (asc)',
      url: '&sortBy=title&order=asc',
    },
    {
      name: 'Order by title (desc)',
      url: '&sortBy=title&order=desc',
    },
  ];
  const filter = useSelector((state:RootState) => state.products.filter);
  const [dropMenu, setDropMenu] = useState(false);

  useEffect(() => {
    const filterLC = localStorage.getItem('filter')
    if(typeof(filterLC) === 'string' && !!filterLC) {
      console.log('hheh')
      dispatch(setFilter(JSON.parse(filterLC)))
    } else {
      dispatch(setFilter(filters[0]));
    }
  }, []);

  useEffect(() => {}, [filter])

  const handleClick = (item: TypeFilter) => {
    dispatch(setFilter(item));
    localStorage.setItem('filter', JSON.stringify(item))
    setDropMenu(false);
  };

  return (
    <div className={dropMenu ? 'filter active' : 'filter'}>
      <div
        className={dropMenu ? 'filter-active active' : 'filter-active'}
        onClick={() => {
          setDropMenu((dropMenu) => !dropMenu);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={dropMenu ? 'active' : ''}
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
        {filter.name}
      </div>
      <div className={dropMenu ? 'filter-list active' : 'filter-list'}>
        {filters.map((item, i) => (
          <div className="filter-list-item" key={i} onClick={() => handleClick(item)}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
