import "./Mosaic.css"
import Image from './Image'
import usePhotos from '../hooks/usePhotos';
import { useCallback, useEffect } from "react";
import useCounter from "../hooks/useCounter";
import { PHOTO_COUNT } from "../hooks/usePhotos";

const Mosaic = ({ rendering, imgCategory, nextStep }) => {
    const [loaded, increment] = useCounter();

    const [photos, updatePhotos] = usePhotos(imgCategory);

    const updateMosaic = useCallback(() => {
        /* eslint-disable */
        eval('$("#myMosaic").Mosaic()');  // Forgive me, Lord
        /* eslint-enable */
    }, []);

    useEffect(() => {
        if (loaded === PHOTO_COUNT) {
            nextStep();
        }
    }, [loaded, nextStep]);

    useEffect(() => {
        updateMosaic();
    }, [updateMosaic, photos]);

    return (
        <div id="myMosaic">
            {rendering && photos.map((photo) => (
                photo.visible && <Image key={photo.url} photo={photo} waiting={loaded < PHOTO_COUNT} onload={increment} update={updatePhotos} />
            ))}
        </div>  
    )
}

export default Mosaic;