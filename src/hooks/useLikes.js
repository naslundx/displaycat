import { useState, useCallback } from 'react';

const useLikes = () => {
    const [likes, setLikes] = useState(new Set());

    const toggleLike = useCallback((url) => setLikes(oldLikes => {
        const newLikes = new Set(oldLikes);
        if (oldLikes.has(url)) {
            newLikes.delete(url);
            return newLikes;
        } else {
            return newLikes.add(url);
        }
    }), []);

    return [likes, toggleLike];
}

export default useLikes;