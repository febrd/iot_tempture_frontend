'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DatePickerWithRange } from './DatePickerWithRange';
import { ModeToggle } from './ModeToggle';

export const links = [
    { href: '/', label: 'Latest Data' },
    { href: '/minute/3', label: '3 Minutes Ago' },
    { href: '/minute/5', label: '5 Minutes Ago' },
]

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="navbar bg-base-100 px-10 py-6 flex justify-between items-center">
            <ModeToggle />
            <div className="flex gap-x-4 items-center">
                <DatePickerWithRange />

                {links.map((link) => (
                    <Link key={link.href} href={link.href} className={`px-4 py-2 rounded-md ${pathname === link.href ? 'bg-blue-500 text-white dark:bg-white/10' : 'hover:bg-blue-500 hover:text-white dark:hover:bg-white/10'}`}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};