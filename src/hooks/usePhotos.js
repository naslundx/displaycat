import { useState, useEffect, useCallback } from 'react';
import getCatUrl from './api.js'

const PHOTO_COUNT = 20;

const usePhotos = (category = 0) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        setPhotos([]);
        getCatUrl(PHOTO_COUNT, category)
            .then(result => {
                const reduced = result.map(({ breeds, id, categories, ...item }) => item);
                const augmented = reduced.map(data => ({...data, visible: true}));
                setPhotos(augmented);
            })
            .catch(reason => console.log(reason));
    }, [category]);

    const updatePhotos = useCallback(() => {
        setPhotos(e => [...e, {}]);
    }, []);

    return [photos, updatePhotos];
}

export default usePhotos;
export { PHOTO_COUNT };