import React from 'react';

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            inputNumber: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        await this.setState({
            value: this.props.value,
            inputNumber: this.props.position.x * 9 + this.props.position.y
        });
    }
    async handleChange(event) {
        const number = parseInt(event.target.value);
        const value = Number.isNaN(number) ? '' : number;
        await this.setState({ value });
        this.props.setValue(this.props.position, value);

        if (!Number.isNaN(number)) {
            // focus nex cell
            const nextCell = document.querySelector(`input[name=cell-${this.state.inputNumber + 1}]`);
            if (nextCell !== null) {
                nextCell.focus();
            }
        }
    }

    render () {
        return (
            <div className="text-4xl cell">
                <input
                    className="w-full h-full text-center bg-gray-800 focus:bg-indigo-900 focus:outline-none"
                    type="text"
                    name={`cell-${this.state.inputNumber}`}
                    tabIndex={this.state.inputNumber + 1}
                    maxLength="1"
                    value={this.state.value}
                    onInput={this.handleChange}/>
            </div>
        )
    }
}
