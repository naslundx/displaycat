import useHover from "../hooks/useHover";
import useRandomColor from "../hooks/useRandomColor";

const Image = ({ src, onload, waiting }) => {
    const [inside, onMouseEnter, onMouseLeave] = useHover();

    const imgClassName = "transitionFast" + (waiting ? " preload" : "");
    const toolboxClassName = "toolbox transitionFast" + (inside ? " inside" : "");
    const color = useRandomColor();

    return (
        <div style={{background: color}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className={toolboxClassName}>
                <a href={src} target="_blank" rel="noreferrer"><i className="fa fa-external-link-square"></i></a>
            </div>
            <img src={src} alt="It's a cat" onLoad={onload} className={imgClassName} />
        </div>
    )
}

export default Image;