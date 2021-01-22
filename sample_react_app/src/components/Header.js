import React from 'react';

import logo from '../img/logo.png'

import Menu from './Menu';

import '../css/app.css';
import '../css/header.css';

class Header extends React.Component {
  
    implementBurger() {
        document.addEventListener('DOMContentLoaded', function () {
            var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            if ($navbarBurgers.length > 0) {
                $navbarBurgers.forEach(function ($el) {
                    $el.addEventListener('click', function () {
                        var target = $el.dataset.target;
                        var $target = document.getElementById(target);
                        $el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                });
            }
        });
    }
         
    render() {
        this.implementBurger();
        return (
            <nav className = "navbar is-primary">
                <div className = "navbar-brand">
                    <a className ="navbar-item" href="#">
                      <img className = "mxm-logo" src= { logo } alt = "Home"/>
                    </a>
                    <div className ="burger navbar-burger" data-target="navbarMxmenu">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                </div>
                
                <Menu />
            </nav>
        );
    }
}

export default Header;