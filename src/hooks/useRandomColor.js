import { useState, useEffect } from 'react';

const useRandomColor = () => {
    const [color, setColor] = useState("rgb(255,255,255)");

    useEffect(() => {
        const num = Math.round(0xffffff * Math.random());
        const r = num >> 16;
        const g = (num >> 8) & 255;
        const b = num & 255;
        setColor('rgb(' + r + ', ' + g + ', ' + b + ')');
    }, []);

    return color;
};

export default useRandomColor;