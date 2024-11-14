import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App({ initialPath, initialData }) {
    // State untuk menyimpan path saat ini dan data
    const [path, setPath] = useState(initialPath);
    const [data, setData] = useState(initialData);

    // Mengubah konten berdasarkan path
    const renderPage = () => {
        if (path === '/') return <Home data={data} />;
        if (path === '/about') return <About data={data} />;
        if (path === '/contact') return <Contact data={data} />;
        return <Home data={data} />;
    };

    // Update state jika tombol back atau forward browser ditekan
    useEffect(() => {
        const onPopState = (event) => {
            const newPath = event.state ? event.state.path : '/';
            const newData = event.state ? event.state.data : initialData;
            setPath(newPath);
            setData(newData);
        };

        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, [initialData]);

    return (
        <div>
            <Navbar navigate={(newPath, newData) => {
                window.history.pushState({ path: newPath, data: newData }, '', newPath);
                setPath(newPath);
                setData(newData);
            }} />
            {renderPage()}
        </div>
    );
}

export default App;
