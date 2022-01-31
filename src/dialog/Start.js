const CATEGORIES = [
    {value: "0", description: "Alla"},
    {value: "14", description: "Diskho"},
    {value: "1", description: "Hattar"},
    {value: "15", description: "Kläder"},
    {value: "5", description: "Lådor"},
    {value: "2", description: "Rymden"},
    {value: "7", description: "Slipsar"},
    {value: "4", description: "Solglasögon"},
];

const Start = ({setCategory, nextStep}) => {
    const handleOnChange = event => {
        setCategory(event.target.value);
    };

    return (
        <div id="ui" className="dialog">
            <h1>Katter!</h1>
            <button onClick={nextStep}>Fyll sidan med katter</button>
            <br />
            <span>Kategori:</span> 
            <select id="categories" onChange={handleOnChange} defaultValue="0">
                {CATEGORIES.map((option) => (
                    <option key={option.value} value={option.value}>{option.description}</option>
                ))}
            </select>
        </div>
    );
}

export default Start;