import React, {useState, FormEventHandler} from 'react';

interface Position {
    x: number;
    y: number;
}
interface Props {
    position: Position;
    value: string | number;
    setValue: (pos: Position, value: number | string) => any;
}
export default function Cell (props: Props) {
    const [value, setValue] = useState(props.value);
    const [inputNumber, setInputNumber] = useState(props.position.x * 9 + props.position.y);

    const handleChange: FormEventHandler = async (event: React.FormEvent<HTMLInputElement>) => {
        const number = parseInt(event.currentTarget.value);
        const value:string | number = Number.isNaN(number) ? '' : number;
        setValue(value);
        await props.setValue(props.position, value);

        if (!Number.isNaN(number)) {
            // focus nex cell
            const nextCell: HTMLElement | null = document.querySelector(`input[name=cell-${inputNumber + 1}]`);
            if (nextCell !== null) {
                nextCell.focus();
            }
        }
    }

    return (
        <div className="cell">
            <input
                className="w-full h-full text-center bg-gray-800 focus:bg-indigo-900 focus:outline-none"
                type="text"
                name={`cell-${inputNumber}`}
                tabIndex={inputNumber + 1}
                maxLength={1}
                value={value}
                onInput={handleChange}/>
        </div>
    )
}

