import useLoadstring from '../hooks/useLoadstring.js';

const Loading = ({ step }) => {
    const loadstring = useLoadstring();

    console.log(step);

    const className = "dialog dialogTransition" + ( step === 2 ? " invisible" : step === 3 ? " hidden" : "" );

    console.log(className);

    return (
        <div id="loading" className={className}>
            <div className="loader center"></div>
            <p>{loadstring}</p>
        </div>
    );
}

export default Loading;