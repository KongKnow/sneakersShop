import { useFormik } from "formik"
import { useAppDispatch } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { setUser } from "../../redux/userSlice/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState, FC } from "react";
import { Helmet } from "react-helmet";


const LogInForm: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isAuth} = useAuth()
    const [authError, setAuthError] = useState(false)

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])

    const handleLogIn = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                localStorage.setItem('ss-account', JSON.stringify({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                setAuthError(false)
                navigate('/profile')
            })
            .catch(err => {
                setAuthError(false)
                if(err.code === 'auth/too-many-requests') {
                    setAuthError(true)
                }
                console.error(err)
                
            })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('* invalid email').required('* required field'),
            password: Yup.string().required('* required field')
        }),
        onSubmit: values => {
            handleLogIn(values.email, values.password)
        }
    })

    return (
        <>
            <Helmet>
                <title>Sneakers Shop - Log In</title>
                <meta name="description" content="home page" />
            </Helmet>
            <section className="form-wrapper">
                <div>
                    <h2 className="form-title">Log in</h2>
                    {authError && <div className="form-error">The email or password are wrong / You've made to many requests - try again later</div>}
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <div className="form-divider">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email..."
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
                        </div>
                        <div className="form-divider">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password..."
                                autoComplete="off"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div> : null}
                        </div>
                        <button type="submit" className="btn-form">Log In</button>
                    </form>
                    <Link to={'/change-password'} className="form-descr pass">
                        Forgot password?
                    </Link>
                    <Link to={'/sign-up'} className="form-descr">
                        I don't have an account.
                    </Link>
                </div>
            </section>
        </>
    );
};

export default LogInForm;