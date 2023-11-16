import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategories, selectCategory } from '../../redux/productsSlice/productsSlice';
import { RootState, useAppDispatch } from '../../redux/store';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.products.categories);
  const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="categories">
      <div
        className={`category${selectedCategory === 'all' ? ' active' : ''}`}
        onClick={() => dispatch(selectCategory('all'))}>
        All
      </div>
      {categories.map((item, i) => {
        return (
          <div
            className={`category${selectedCategory === item ? ' active' : ''}`}
            key={i}
            onClick={() => dispatch(selectCategory(item))}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
