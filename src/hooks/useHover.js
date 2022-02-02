import { useState, useCallback } from 'react';

const useHover = () => {
    const [inside, setInside] = useState(false);

    const onMouseEnter = useCallback(() => setInside(true), []);
    const onMouseLeave = useCallback(() => setInside(false), []);

    return [inside, onMouseEnter, onMouseLeave];
}

export default useHover;