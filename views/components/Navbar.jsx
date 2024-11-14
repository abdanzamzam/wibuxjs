import React from 'react';

function Navbar({ navigate }) {
    const handleNavigation = (newPath, title) => {
        navigate(newPath, { title });
    };

    return (
        <nav>
            <ul>
                <li><a onClick={() => handleNavigation('/', 'Home Page')}>Home</a></li>
                <li><a onClick={() => handleNavigation('/about', 'About Page')}>About</a></li>
                <li><a onClick={() => handleNavigation('/contact', 'Contact Page')}>Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
