import Cell from '../components/cell'
import React, {useState} from 'react'
import {cloneDeep} from 'lodash'

interface Position {
    x: number;
    y: number;
}

export default function Solve() {
    const [matrix, setMatrix] = useState<(string | number)[][]>([
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
    ])

    const setValue = async (position: Position, value: string | number) => {
        await setMatrix(prevMatrix => {
            const matrixCopy:(string | number)[][] = cloneDeep(prevMatrix);
            matrixCopy[position.x][position.y] = value;
            return matrixCopy;
        })
    }

    const isValid = (board:(string | number)[][], row:number, col:number, k:number) => {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] === k || board[i][col] === k || board[m][n] === k) {
                return false;
            }
        }
        return true;
    }

    const solve = async () => {
        const board = cloneDeep(matrix);
        sudokuSolver(board);
        setMatrix(cloneDeep(board));
    }

    const sudokuSolver = (board:(string | number)[][]) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '') {
                    for (let k = 1; k <= 9; k++) {
                        if (isValid(board, i, j, k)) {
                            board[i][j] = k;
                            if (sudokuSolver(board)) {
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
    return (
        <div>
            <div className="text-center mb-6 mt-10 text-2xl">
                Enter your numbers...
            </div>
            <div className="grid mx-auto grid-cols-3 gap-4 text-center sudoku-container">
                {matrix.map((square, i) => {
                    return (
                        <div
                            className="text-xl lg:text-3xl xl:text-4xl grid grid-cols-3 border border-indigo-400"
                            key={square.toString() + i}>
                            {square.map((val, j) => {
                                const x = (Math.floor(i / 3) * 3) + Math.floor(j / 3);
                                const y = j % 3 + ((i % 3) * 3);
                                return (<Cell
                                    position={{x, y}}
                                    value={matrix[x][y]}
                                    setValue={setValue}
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
                    onClick={solve}>Solve
                </button>
            </div>
        </div>
    );
}
