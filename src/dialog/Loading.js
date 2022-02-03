import useLoadstring from '../hooks/useLoadstring.js';

const Loading = ({ step }) => {
    const loadstring = useLoadstring();

    const className = "dialog dialogTransition" + ( step === 2 ? " invisible clickThrough" : step === 3 ? " hidden" : "" );

    return (
        <div id="loading" className={className}>
            <div className="loader center"></div>
            <p>{loadstring}</p>
        </div>
    );
}

export default Loading;