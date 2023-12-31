import { useEffect, useState, useRef, useCallback, FC } from 'react';
import img from '../../assets/img/search.svg';
import Skeleton from '../Skeleton/Skeleton';
import ProductsCard from './ProductsCard';
import { useSelector } from 'react-redux';
import { TypeProduct, getSneakers, setSearchValue } from '../../redux/productsSlice/productsSlice';
import debounce from 'lodash.debounce';
import { RootState, useAppDispatch } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';

const Products: FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory);
  const filter = useSelector((state: RootState) => state.products.filter);
  const searchValue = useSelector((state: RootState) => state.products.searchValue);
  const error = useSelector((state: RootState) => state.products.error)
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TypeProduct[]>([]);
  const prevPage = useRef(0);
  const input = useRef<HTMLInputElement>(null);

  const onInputStopChanging = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  useEffect(() => {
    if(selectedCategory && filter) {
      dispatch(
        getSneakers({
          category: selectedCategory,
          page,
          filter: filter.url,
          search: searchValue,
        }),
      );
    }
    prevPage.current = 1;
  }, [selectedCategory, page, filter, searchValue]);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [selectedCategory, filter]);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [searchValue]);

  useEffect(() => {
    setValue('');
  }, [selectedCategory]);

  useEffect(() => {
    if (prevPage.current !== page) {
      setItems([...items, ...products]);
    } else {
      setItems([...products]);
    }
  }, [products]);

  useEffect(() => {
    prevPage.current = page;
  }, [products]);

  const changeHandle = (e) => {
    setValue(e.target.value);
    onInputStopChanging(e.target.value);
  };

  const clickHandle = () => {
    if (products.length < 8) return;
    setPage((page) => (page += 1));
  };

  const clearValue = () => {
    setValue('');
    dispatch(setSearchValue(''));
    input.current?.focus();
  };

  if (value === '' && searchValue !== '') {
    setValue(searchValue);
  }

  const productsRender = items.map((product) => <ProductsCard {...product} key={product.id} />);

  const skeletonArr: any[] = []
  const counter = items.length !== 0 ? items.length : 8

  for (let i = 0; i < counter; i++) {
    skeletonArr.push(<Skeleton key={uuidv4()}/>)
  }

  const loaded = loading ? skeletonArr : productsRender;
  const empty = !productsRender.length ? (
    <div className="products-list-empty">Your request yielded no results :{'('}</div>
  ) : null;

  const errorShow = error ? <div className="products-list-empty">An error has occurred :{'('}</div> : null

  return (
    <section className="products">
      <div className="products-header">
        <h2 className="products-title">{selectedCategory.toUpperCase()} sneakers</h2>
        {selectedCategory === 'all' && (
          <form action="" className="products-search">
            <img src={img} alt="" />
            <input
              ref={input}
              type="text"
              name="text"
              value={value}
              placeholder="Search..."
              autoComplete="off"
              onChange={(e) => {
                changeHandle(e);
              }}
            />
            {value === '' ? null : (
              <svg
                onClick={clearValue}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#C4C4C4"
                viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            )}
          </form>
        )}
      </div>
      {errorShow || (empty && !loading && !error ? (
        empty
      ) : (
        <>
          <div className="products-list">{loaded}</div>

          <div className="btn-wrapper">
            <button
              className={products.length < 8 ? 'btn-products active' : 'btn-products'}
              onClick={clickHandle}>
              Load more
            </button>
          </div>
        </>
      ))}
      {}
    </section>
  );
};

export default Products;
