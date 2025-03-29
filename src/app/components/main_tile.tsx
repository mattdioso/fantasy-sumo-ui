'use client';
//import AppSidebar from "./navbar";
import { useState, useEffect } from 'react';
import Team from "./team";
import Matchups from "./matchup";
import Scores from "./scores";
import Wrestlers from "./wrestlers";
import Draft from "./draft";

const MainTile = () => {

    const [content, setContent] = useState<string>('Home');

    const navigate = (page: string) => {
        setContent(page);
        window.history.pushState({}, `/${page.toLowerCase()}`);
    };

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.slice(1) || 'home';
            setContent(path);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [])

    return (
        <div className="w-5/8 h-4/5 bg-blue-950 border rounded-xl m-auto border-white">
            
        </div>
    )
}

export default MainTile;