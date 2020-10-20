// import React from 'react';
import Link from 'next/link';

export default ({
    children
}) => (
    <>
        <div className="nav">
            <Link href="/about">About</Link>
            <Link href="/home">Home</Link>
        </div>
        {children}
    </>
);
