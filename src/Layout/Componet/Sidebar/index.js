//

export default function Sidebar() {
    return (
        <div
            className="offcanvas offcanvas-start text-bg-dark"
            tabindex="0"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                    Dark offcanvas
                </h5>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Link
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <form className="d-flex mt-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}
