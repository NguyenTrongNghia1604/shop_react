//
import TippyAdmin from '../../../Component/TippyAdmin';
//
import SidebarAdmin from '../Sidebar';
//
//import { useNavigate } from 'react-router-dom';
//
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional for styling
import image from '../../../../assets/Images';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { useState } from 'react';
//import restfulApi from '../../../../restfulApi';
const cx = classNames.bind(style);
function HeaderAdmin() {
    const [showMessage, setShowMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    const handleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const handleOutSide = () => {
        setShowMessage(false);
        setShowNotification(false);
        setShowAdmin(false);
    };

    // xử lý đăng xuất
    const handleLogout = () => {
        window.location.href = '/admin/login';
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };
    return (
        <header className={cx('header')}>
            <div className={cx('wrapper')}>
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className={cx('navbar-brand', 'logo')} href="/">
                            <img src={image.logo} />
                        </a>
                        <div className={cx('navbar-collapse', 'menu')} style={{ flexBasis: '0' }}>
                            <button onClick={handleSidebar}>
                                <i className="fa-regular fa-bars"></i>
                            </button>
                        </div>
                        <div className={cx('wrapper-opration')}>
                            <div className={cx('message')}>
                                <Tippy
                                    interactive
                                    visible={showMessage}
                                    placement="bottom"
                                    render={(attrs) => (
                                        <div className={cx('resualt')} tabIndex="-1" {...attrs}>
                                            <div className={cx('title')}>
                                                <span>Bạn có 5 tin nhắn mới</span>
                                                <button>View All</button>
                                            </div>
                                            <TippyAdmin />
                                            <a href="/admin/123" className={cx('move_all')}>
                                                View all message
                                            </a>
                                        </div>
                                    )}
                                    onClickOutside={handleOutSide}
                                >
                                    <button onClick={() => setShowMessage((prev) => !prev)}>
                                        <i className="fa-solid fa-messages"></i>
                                    </button>
                                </Tippy>
                            </div>
                            <div className={cx('notification')}>
                                <Tippy
                                    interactive
                                    visible={showNotification}
                                    placement="bottom"
                                    render={(attrs) => (
                                        <div className={cx('resualt')} tabIndex="-1" {...attrs}>
                                            <div className={cx('title')}>
                                                <span>Bạn có 5 thông báo mới</span>
                                                <button>View All</button>
                                            </div>
                                            <TippyAdmin />
                                            <a href="/admin/123" className={cx('move_all')}>
                                                View all message
                                            </a>
                                        </div>
                                    )}
                                    onClickOutside={handleOutSide}
                                >
                                    <button onClick={() => setShowNotification((prev) => !prev)}>
                                        <i className="fa-light fa-bell"></i>
                                    </button>
                                </Tippy>
                            </div>
                            <div className={cx('admin')}>
                                <div className={cx('images')}>
                                    <img src={image.user} />
                                </div>
                                <Tippy
                                    interactive
                                    visible={showAdmin}
                                    placement="bottom"
                                    render={(attrs) => (
                                        <div className={cx('resualt')} tabIndex="-1" {...attrs}>
                                            <ul className={cx('info')}>
                                                <li>
                                                    <a href="/admin/123">
                                                        <i class="fa-light fa-user"></i> Protife
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/admin/123">
                                                        <i className="fa-regular fa-gear"></i> Setting
                                                    </a>
                                                </li>
                                                <li onClick={handleLogout}>
                                                    <a href="javascript:void(0)">
                                                        <i className="fa-light fa-right-from-bracket"></i> Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    onClickOutside={handleOutSide}
                                >
                                    <button onClick={() => setShowAdmin((prev) => !prev)}>
                                        Nguyễn Trọng Nghĩa <i className="fa-solid fa-caret-down"></i>
                                    </button>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <SidebarAdmin isOpen={showSidebar} />
        </header>
    );
}

export default HeaderAdmin;
