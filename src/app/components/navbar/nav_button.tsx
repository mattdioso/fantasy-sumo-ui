'use client'
import Link from 'next/link';
const NavButton = ({ buttonName, href, navigate }: {buttonName: string, href: string, navigate: (page: string) => void; } ) => {
    return (
        <button onClick={() => navigate(href)} className="h-10 w-auto px-2 bg-green-300">
            <Link href={href}>
                {buttonName}
            </Link>
        </button>
    )    
}

export default NavButton;