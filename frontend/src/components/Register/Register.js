import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoToolTip from './../InfoToolTip/InfoToolTip.js';
import * as auth from './../../utils/auth.js';

const Register = () => {

    const history = useHistory();

    const [data, setData] = useState({
        password: '',
        email: ''
    });

    const [status, setStatus] = useState(false);
    const [statusPopup, setStatusPopup] = useState(false);
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.password && data.email) {
            const { password, email} = data;
            auth.register(password, email).then((res) => {
                if (res) {
                    setStatus(true);
                    setStatusPopup(true);
                }
            }).catch((err) => {
                console.error(err)
                setStatus(false);
                setStatusPopup(true)}
            )
        }
    }

    const handleClose = () => {
        setStatusPopup(false);
        if (status) {
            history.push('/sign-in');
        }
    }

    return (
        <div className='form'>
            <h1 className='form__title'>Регистрация</h1>
            <form className='form__content' onSubmit={handleSubmit}>
                <input className='form__input' type='email' name='email' placeholder='Email' minLength="5" maxLength="50" required onChange={handleChange} value={data.email} />
                <input className='form__input' type='password' name='password' placeholder='Пароль' minLength="5" maxLength="50" required onChange={handleChange} value={data.password} />
                <button className='form__button' type='submit'>Зарегистрироваться</button>
                <Link to='/sign-in' className='form__link'>Уже зарегистрированы? Войти</Link>
            </form>
            
            <InfoToolTip isOpen={statusPopup} onClose={handleClose} status={status} />
        </div>
    );
}

export default Register;