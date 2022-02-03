import "./Mosaic.css"
import Image from './Image'
import usePhotos from '../hooks/usePhotos';
import { useCallback, useEffect } from "react";
import useCounter from "../hooks/useCounter";
import { PHOTO_COUNT } from "../hooks/usePhotos";

/* eslint-disable */
const Mosaic = ({ rendering, imgCategory, nextStep }) => {
    const [loaded, increment] = useCounter();

    const [photos, updatePhotos] = usePhotos(imgCategory);

    const updateMosaic = useCallback(() => {
        console.log("updateMosaic");        
        eval('$("#myMosaic").Mosaic()');  // Forgive me, Lord
    }, []);

    const onload = useCallback(() => {
        increment();
        updateMosaic();
    }, [increment, updateMosaic]);

    useEffect(() => {
        if (loaded === PHOTO_COUNT) {
            nextStep();
        }
    }, [loaded, nextStep]);

    useEffect(() => {
        updateMosaic();
    }, [updateMosaic, photos.reduce((p, c) => p + c.visible, 0)]);

    return (
        <div id="myMosaic">
            {rendering && photos.map((photo) => (
                photo.visible && <Image key={photo.url} photo={photo} waiting={loaded < PHOTO_COUNT} onload={onload} update={updatePhotos} />
            ))}
        </div>  
    )
}
/* eslint-enable */

export default Mosaic;