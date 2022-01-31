import { useState, useEffect } from 'react';
import getCatUrl from './api.js'

const PHOTO_COUNT = 20;

const usePhotos = (category = 0) => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        setUrls([]);
        getCatUrl(PHOTO_COUNT, category)
            .then(result => setUrls(result),
                  reason => console.log(reason));
    }, [category]);

    return urls;
}

export default usePhotos;
export { PHOTO_COUNT };