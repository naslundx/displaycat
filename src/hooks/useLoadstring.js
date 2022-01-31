import { useState, useEffect } from 'react';

const loadstrings = [
    "Försöker jama...",
    "Puttar ner vaser från bord...",
    "Pekar med laserpekaren...",
    "Tar bort hundar...",
    "Öppnar tonfiskburkar...",
    "Lapar grädde...",
    "Säger kss kss kss...",
    "Gnider kinder mot möbler..."
];

const useLoadstring = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(idx => (idx + 1) % loadstrings.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return loadstrings[index];
}

export default useLoadstring;