import React from 'react';
import headerLogo from './../../images/header/logo.svg';
import { Switch, Route, Link } from 'react-router-dom';

const Header = ( {email, signOut} ) => {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип сайт место" />
            <Switch>
            <Route path="/sign-up">
                <Link to="/sign-in" className="header__link">Войти</Link>
            </Route>
            <Route path="/sign-in">
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Route>
            <Route path="/">
                <div className="header__link-block">
                <p className="header__email">{email}</p>
                <Link to="/sign-in" onClick={signOut} className="header__link">Выйти</Link>
                </div>
            </Route>
            </Switch>
        </header>
    );
}
  
export default Header;