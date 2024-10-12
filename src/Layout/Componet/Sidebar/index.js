//
import restfulApi from '../../../restfulApi';
import '../../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
export default function Sidebar() {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const fullName = getCookie('fullname');
    const status = getCookie('status');
    useEffect(() => {
        const fetchData = async () => {
            let res = await restfulApi.categoryDB();
            if (res && res.data && res.data.EC === 0) {
                setCategory(res.data.DT);
            }
        };
        fetchData();
    }, []);

    //
    const handleClickProtify = () => {
        if (status === 'true') {
            navigate('/protify');
        } else {
            navigate('/login');
        }
    };

    //
    const handleClieckDH = () => {
        if (status === 'true') {
            navigate('/shoppingCart');
        } else {
            navigate('/login');
        }
    };

    // xử lý logout
    const handleLogOut = async () => {
        let res = await restfulApi.clearSessionLogin();
        if (res && res.data && res.data.EC === 0) {
            // Hoặc xóa tất cả cookie (nếu cần)
            //const cookies = document.cookie.split(';');
            // for (let i = 0; i < cookies.length; i++) {
            //     const cookie = cookies[i];
            //     const eqPos = cookie.indexOf('=');
            //     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            //     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
            // }
            const cookiesToDelete = ['userId', 'fullname', 'images', 'status']; // Danh sách cookie cần xóa
            cookiesToDelete.forEach((cookie) => {
                document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            });
            navigate('/');
            window.location.reload();
        }
    };

    // handleChooseCategory
    const handleChooseCategory = (id, name) => {
        const trimmedQuery = name.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
        const convertedQuery = trimmedQuery.replace(/\s+/g, '+'); // Thay thế khoảng trắng bằng '+'
        navigate(`/category?category_query=${convertedQuery}`, { state: id });
    };
    return (
        <div
            className={cx('offcanvas offcanvas-end text-bg-dark', 'sidebar')}
            tabindex="0"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                    {fullName || 'User'}
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
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="/"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="fa-solid fa-user"></i> {fullName || 'User'}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li onClick={handleClickProtify}>
                                <a className="dropdown-item" href="/protify">
                                    PROTIFY
                                </a>
                            </li>
                            <li onClick={handleClieckDH}>
                                <a className="dropdown-item" href="/order">
                                    DƠN HÀNG
                                </a>
                            </li>
                            <li onClick={handleLogOut}>
                                <a className="nav-link" href="javascript:void(0)">
                                    <i className="fa-sharp fa-solid fa-right-from-bracket"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">
                            <i class="fa-sharp fa-solid fa-house"></i> TRANG CHỦ
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/shirt-men">
                            ÁO NAM
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/pants">
                            QUẦN NAM
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/phu-kien">
                            PHỤ KIỆN
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="/"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            DANH MỤC
                        </a>
                        <ul className={cx('dropdown-menu dropdown-menu-dark', 'category')}>
                            {category &&
                                category.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => handleChooseCategory(item.id, item.name)}>
                                            <a
                                                className={cx('dropdown-item', 'text-uppercase')}
                                                href="javascript:void(0)"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/khuyen-mai">
                            SALE
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
