import React from 'react';
import { Nav, NavLogo, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElement';

const Navbar = () => {
    return (
        <>
        <nav class="bg-blue-600 h-screen w-32 justify-between items-center pl-2 pt-2 space-y-2">
            <NavLogo to="/">
                <img class="h-24 w-24" src="https://storage.googleapis.com/fantasy-sumo-409406.appspot.com/logo/logo.png" alt="sumo_logo"></img>
            </NavLogo>
            <Bars />
            <div class="items-center mr-[24px] space-y-2">
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
            </div>
        </nav>
        </>
    );
};

export default Navbar;