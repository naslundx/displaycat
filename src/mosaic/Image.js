const Image = ({ src, onload, waiting }) => {
    const className = "transition" + (waiting ? " preload" : "");

    return (
        <img src={src} alt="It's a cat" onLoad={onload} className={className} />
    )
}

export default Image;