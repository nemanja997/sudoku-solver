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
                <div className="container mx-auto text-center">

                </div>
        );
    }
}
