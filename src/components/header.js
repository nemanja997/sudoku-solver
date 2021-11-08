import React from 'react';
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    render () {
        return (
            <header className="flex justify-center py-5 border-b border-indigo-400">
                <ul className="flex center">
                    <li>
                        <Link to="/" className="p-3">Solve</Link>
                    </li>
                    <li>
                        <Link to="/examples" className="p-3">See examples</Link>
                    </li>
                </ul>
            </header>
        );
    }
}

