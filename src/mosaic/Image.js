import { useCallback } from "react";
import useHover from "../hooks/useHover";
import useRandomColor from "../hooks/useRandomColor";

const Image = ({ photo, onload, waiting, update }) => {
    const [inside, onMouseEnter, onMouseLeave] = useHover();
    
    const color = useRandomColor();

    const onremove = useCallback(() => {
        photo.visible = false;
        update();
    }, [photo, update]);

    const imgClassName = "transitionFast" + (waiting ? " preload" : "");
    const toolboxClassName = "toolbox transitionFast" + (inside ? " inside" : "");

    return (
        <div style={{background: color}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className={toolboxClassName}>
                <a href={photo.url} target="_blank" rel="noreferrer"><i className="fa fa-external-link-square"></i></a>
                <i className="fa fa fa-remove" onClick={onremove}></i>
            </div>
            <img src={photo.url} width={photo.width} height={photo.height} alt="It's a cat" onLoad={onload} className={imgClassName} />
        </div>
    )
}

export default Image;