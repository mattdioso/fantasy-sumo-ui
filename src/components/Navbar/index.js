import React from 'react';
import { Nav, NavLogo, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElement';

const Navbar = () => {
    return (
        <>
        <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />
            <NavMenu>
                <NavLink to="/" style={isActive => ({
                    color: isActive ? "black": "white"
                })}>
                    Home
                </NavLink>
                <NavLink to="/about" style={isActive => ({
                    color: isActive ? "black": "white"
                })}>
                    About
                </NavLink>
                <NavLink to="/wrestlers" style={isActive => ({
                    color: isActive ? "black": "white"
                })}>
                    Wrestlers
                </NavLink>
                <NavLink to="/tournaments" style={isActive => ({
                    color: isActive ? "black": "white"
                })}>
                    Tournaments
                </NavLink>
                <NavLink to="/banzuke" style={isActive => ({
                    color: isActive ? "black" : "white"
                })}>
                    Banzuke
                </NavLink>
                <NavLink to="/fantasy" style={isActive => ({
                    color: isActive ? "black": "white"
                })}>
                    Fantasy
                </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
};

export default Navbar;