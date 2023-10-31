import Categories from "../Categories/Categories";
import Filter from "../Filter/Filter";
import Products from "../Products/Products";
import SliderShop from "../Slider/SliderShop";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Sneakers Shop - Home Page</title>
                <meta name="description" content="home page" />
            </Helmet>
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