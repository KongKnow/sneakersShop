import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const SignUpForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useAuth()

    useEffect(() => {
        if(isAuth) navigate('/profile')
    }, [isAuth])
    

    const handleRegister = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                localStorage.setItem('ss-account', JSON.stringify({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/profile')
            })
            .catch(console.error)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5, '* minimum 5 symbols').required('* required field'),
            email: Yup.string().email('* invalid email').required('* required field'),
            password: Yup.string()
                        .min(8, '* password must contain at least 8 characters')
                        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {message: '* create a stronger password'})
                        .required('* required field')
        }),
        onSubmit: values => {
            dispatch(handleRegister(values.email, values.password))
        }
    })

    return (
        <section className="form-wrapper">
            <div>
                <h2 className="form-title">Sign Up form</h2>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div className="form-divider">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name..."
                            autoComplete="off"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
                    </div>
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
                    <button type="submit" className="btn-form">Sign Up</button>
                </form>
                <Link to={'/log-in'} className="form-descr">
                    I alredy have an account.
                </Link>
            </div>
        </section>
    );
};

export default SignUpForm;