import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="NavBar">
            <ul className="NavBar-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/stores">Stores</Link>
                </li>
                <li>
                    <Link to="/standings">Scores and Standings</Link>
                </li>
                <li>
                    <Link to="/players">Players</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;