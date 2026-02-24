import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='border-b-2 py-3 text-center space-x-6'>
            <Link href="/">Home</Link>
            <Link href="/public">public</Link>
            <Link href="/private">private</Link>
            <Link href="/admin">admin</Link>
        </div>
    );
};

export default Navbar;