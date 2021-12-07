import React, {useEffect, useState} from 'react';

export default function Cell (props) {
    const [value, setValue] = useState('');
    const [inputNumber, setInputNumber] = useState(0);

    useEffect(() => {
        setValue(props.value);
        setInputNumber(props.position.x * 9 + props.position.y)
    }, [])

    const handleChange = async (event) => {
        const number = parseInt(event.target.value);
        setValue(Number.isNaN(number) ? '' : number);
        props.setValue(props.position, value);

        if (!Number.isNaN(number)) {
            // focus nex cell
            const nextCell = document.querySelector(`input[name=cell-${inputNumber + 1}]`);
            if (nextCell !== null) {
                nextCell.focus();
            }
        }
    }

    return (
        <div className="text-4xl cell">
            <input
                className="w-full h-full text-center bg-gray-800 focus:bg-indigo-900 focus:outline-none"
                type="text"
                name={`cell-${inputNumber}`}
                tabIndex={inputNumber + 1}
                maxLength="1"
                value={value}
                onInput={handleChange}/>
        </div>
    )
}
