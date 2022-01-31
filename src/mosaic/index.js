import "./Mosaic.css"
import Image from './Image'
import usePhotos from '../hooks/usePhotos';
import { useEffect } from "react";
import useCounter from "../hooks/useCounter";
import { PHOTO_COUNT } from "../hooks/usePhotos";

const Mosaic = ({ rendering, imgCategory, nextStep }) => {
    const [loaded, increment] = useCounter();

    const urls = usePhotos(imgCategory);

    useEffect(() => {
        if (loaded === PHOTO_COUNT) {
            nextStep();
        }
    }, [loaded, nextStep])

    const onload = () => {
        increment();
        /* eslint-disable */
        eval('$("#myMosaic").Mosaic()');  // Forgive me, Lord
        /* eslint-enable */
    };

    return (
        <div id="myMosaic">
            {rendering && urls.map((url) => (
                <Image key={url} src={url} waiting={loaded < PHOTO_COUNT} onload={onload} />
            ))}
        </div>  
    )
}

export default Mosaic;