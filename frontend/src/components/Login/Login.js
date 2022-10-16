import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from './../../utils/auth.js';
import InfoToolTip from './../InfoToolTip/InfoToolTip.js';

const Login = ( {handleLogin} ) => {

    const [data, setData] = useState({
        password: '',
        email: ''
    });
    
    const history = useHistory();

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
            auth.authorize(password, email).then((data) => {
                if (data.token) {
                    handleLogin()
                    history.push('/')
                }
            }).catch((err) => {
                console.error(err)
                setStatus(false)
                setStatusPopup(true)}
            )
        }
    }

    function handleClose() {
        setStatusPopup(false);   
    }

    return (
        <div className='form'>
            <h1 className='form__title'>Вход</h1>
            <form className='form__content' onSubmit={handleSubmit}>
                <input className='form__input' type='email' name='email' placeholder='Email' minLength="5" maxLength="50" required onChange={handleChange} value={data.email} />
                <input className='form__input' type='password' name='password' placeholder='Пароль' minLength="5" maxLength="50" required onChange={handleChange} value={data.password} />
                <button className='form__button' type='submit'>Войти</button>
            </form>
            <InfoToolTip isOpen={statusPopup} onClose={handleClose} status={status} />
        </div>
    );
}

export default Login;