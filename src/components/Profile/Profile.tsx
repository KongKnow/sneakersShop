import { Link, useNavigate } from 'react-router-dom';
import emoji from '../../assets/img/emojiEyes.svg'
import { FC, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import {removeUser} from '../../redux/userSlice/userSlice'
import { Helmet } from 'react-helmet';

const Profile: FC = () => {
    const {isAuth, email} = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuth) {
            navigate('/sign-up') 
        }
    }, [isAuth])

    const handleClick = () => {
        dispatch(removeUser())
        localStorage.removeItem('ss-account')
    }

    return (
        <>
            <Helmet>
                <title>Sneakers Shop - {`${email}`}</title>
                <meta name="description" content="home page" />
            </Helmet>
            <section className="profile">
                <div className="profile-wrapper">
                    <div className="profile-actions">
                        <Link to="/change-password" className="profile-actions-password">Change password</Link>
                        <button className="profile-actions-exit" onClick={handleClick}>Log out</button>
                    </div>
                    {/* <div className="profile-title">
                        <Link to="/"><img src={backArrow} alt="" /></Link>
                        My orders
                    </div> */}
                    {/* <div className="profile-list">
                        <ProductsCard/>
                        <ProductsCard/>
                    </div> */}
                    <div className="profile-inner">
                        <div className="profile-img">
                            <img src={emoji} alt="" />
                        </div>
                        <div className="profile-empty-title">No orders yet :{'('}</div>
                        <div className="profile-empty-descr">You didn't order anything</div>
                        <Link to="/" className="btn">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7144 7L1.00007 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Get back
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;