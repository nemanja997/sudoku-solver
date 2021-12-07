import Cell from '../components/cell'
import React from 'react'
import { cloneDeep } from 'lodash'

export default class Solve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                matrix: [
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', '', '', '']
                ]
            };

        this.setValue = this.setValue.bind(this);
        this.sudokuSolver = this.sudokuSolver.bind(this);
        this.solve = this.solve.bind(this);
    }

    async setValue(position, value) {
        await this.setState(prevState => {
            const matrix = cloneDeep(prevState.matrix);
            matrix[position.x][position.y] = value;
            return { matrix };
        });
    }

    isValid (board, row, col, k) {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
                return false;
            }
        }
        return true;
    }

    async solve () {
        const board = cloneDeep(this.state.matrix);
        this.sudokuSolver(board);
        await this.setState({ matrix: cloneDeep(board)})
    }

    sudokuSolver (board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '') {
                    for (let k = 1; k <= 9; k++) {
                        if (this.isValid(board, i, j, k)) {
                            board[i][j] = k;
                            if (this.sudokuSolver(board)) {
                                return true;
                            } else {
                                board[i][j] = '';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        return (
            <div>
                <div className="text-center mb-6 mt-10 text-2xl">
                    Enter your numbers...
                </div>
                <div className="grid mx-auto grid-cols-3 gap-4 text-center sudoku-container">
                    {this.state.matrix.map((square,i) => {
                        return (
                            <div
                                className="text-4xl grid grid-cols-3 border border-indigo-400"
                                key={square.toString() + i}>
                                {square.map((val, j) => {
                                    const x = (Math.floor(i/3) * 3) + Math.floor(j/3);
                                    const y = j%3 + ((i%3) * 3);
                                    return (<Cell
                                        position={{ x, y }}
                                        value={this.state.matrix[x][y]}
                                        setValue={this.setValue}
                                        key={x.toString() + y.toString()}
                                    />)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="container mx-auto text-center">
                    <button
                        className="w-48 p-5 border border-indigo-400 text-xl bg-indigo-400 bg-opacity-10 mt-10 hover:bg-indigo-400 hover:bg-opacity-20"
                        onClick={this.solve}>Solve</button>
                </div>
            </div>
        );
    }
}
