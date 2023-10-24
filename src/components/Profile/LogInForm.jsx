import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { setUser } from "../../redux/userSlice/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogIn = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
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
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('* invalid email').required('* required field'),
            password: Yup.string().required('* required field')
        }),
        onSubmit: values => {
            dispatch(handleLogIn(values.email, values.password))
        }
    })

    return (
        <section className="form-wrapper">
            <div>
                <h2 className="form-title">Log in</h2>
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
                <Link to={'/sign-up'} className="form-descr">
                    I don't have an account.
                </Link>
            </div>
        </section>
    );
};

export default LogInForm;