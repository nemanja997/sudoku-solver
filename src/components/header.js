
function Header() {
    return (
        <header className="flex justify-center p-5 border-b border-indigo-400">
            <ul className="flex center">
                <li>
                    <a href="/" className="p-5">Solve</a>
                </li>
                <li>
                    <a href="/examples">See examples</a>
                </li>
            </ul>
        </header>
    );
}

export default Header;
