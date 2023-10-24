import { Link, useNavigate } from 'react-router-dom';
import emoji from '../../assets/img/emojiEyes.svg' 
import backArrow from '../../assets/img/backArrow.svg'
import ProductsCard from '../Products/ProductsCard';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const {isAuth} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/sign-up') 
        }
    }, [])

    return (
        <section className="profile">
            <div className="profile-title">
                <Link to="/"><img src={backArrow} alt="" /></Link>
                My orders
            </div>
            {/* <div className="profile-list">
                <ProductsCard profiletate={false} addCartState={false}/>
                <ProductsCard profiletate={false} addCartState={false}/>
            </div> */}
            <div className="profile-inner">
                <div className="profile-img">
                    <img src={emoji} alt="" />
                </div>
                <div className="profile-empty-title">No orders yes :{'('}</div>
                <div className="profile-empty-descr">You didn't order anything</div>
                <Link to="/" className="btn">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.7144 7L1.00007 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7 13L1 7L7 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Get back
                </Link>
            </div>
        </section>
    );
};

export default Profile;