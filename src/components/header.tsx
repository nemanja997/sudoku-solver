import React from 'react';
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component {
    render () {
        return (
            <header className="flex justify-center py-5 border-b border-indigo-400">
                <ul className="flex center">
                    <li>
                        <NavLink exact to="/" className={(isActive: boolean) => "p-3 py-5 " + (isActive ? "underline" : "")}>Solve</NavLink>
                    </li>
                    <li>
                        <NavLink to="/examples" className={(isActive: boolean) => "p-3 py-5 " + (isActive ? " underline" : "")}>See examples</NavLink>
                    </li>
                </ul>
            </header>
        );
    }
}

