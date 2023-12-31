import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Helmet } from "react-helmet";
import { FC } from "react";

const ChangePassword: FC = () => {

    const navigate = useNavigate()

    const handleReset = (email: string) => {
        const auth = getAuth()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert(`Check your email '${email}'`)
            })
            .then(() => {
                navigate('/log-in')
            })
            .catch(console.error)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('* invalid email').required('* required field')
        }),
        onSubmit: values => {
            handleReset(values.email)
        }
    })

    return (
        <>
            <Helmet>
                <title>Sneakers Shop - Reset Password</title>
                <meta name="description" content="home page" />
            </Helmet>
            <section className="form-wrapper">
                <div>
                    <h2 className="form-title">Reset password</h2>
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
                        <button type="submit" className="btn-form">Reset</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;