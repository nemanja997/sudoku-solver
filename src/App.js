import Header from './components/header'
import Cell from './components/cell'
import React from 'react'
import { cloneDeep } from 'lodash'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: [
                [1,'','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','','','','',''],
                ['','','','','',1,'','',''],
                ['','','','','','','','','']
            ]
        };

        this.setValue = this.setValue.bind(this);
    }

    async setValue(position, value) {
        await this.setState(prevState => {
            const matrix = cloneDeep(prevState.matrix);
            matrix[position.x][position.y] = value;
            return { matrix };
        });
    }



    render() {
        return (
            <div className="App text-indigo-400">
                <Header />

                <div className="grid mx-auto mt-10 grid-cols-3 gap-4 text-center sudoku-container">
                    {this.state.matrix.map((square,x) => {
                        return (
                            <div
                                className="text-4xl grid grid-cols-3 border border-indigo-400"
                                key={square.toString() + x}>
                                {square.map((val, y) => {
                                    return (<Cell position={{ x, y }} value={val} setValue={this.setValue} key={val.toString() + y.toString()}/>)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="container mx-auto text-center">
                    <button className="w-48 p-5 border border-indigo-400 text-xl bg-indigo-400 bg-opacity-10 mt-10 hover:bg-indigo-400 hover:bg-opacity-20">Solve</button>
                </div>
            </div>
        );
    }
}
