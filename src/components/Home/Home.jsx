import Categories from "../Categories/Categories";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";
import SliderShop from "../Slider/SliderShop";

const Home = () => {
    return (
        <>
            <SliderShop/>
            <div className="sorting">
                <Categories/>
                <Filter/>
            </div>
            <Products/>
        </>
    );
};

export default Home;