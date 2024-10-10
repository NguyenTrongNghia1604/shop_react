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
    useEffect(() => {
        const fetchData = async () => {
            let res = await restfulApi.categoryDB();
            if (res && res.data && res.data.EC === 0) {
                setCategory(res.data.DT);
            }
        };
        fetchData();
    }, []);

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
                    Nguyễn Trọng Nghĩa
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
                            <i class="fa-solid fa-user"></i> NGUYỄN TRỌNG NGHĨA
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                                <a className="dropdown-item" href="/protify">
                                    PROTIFY
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/order">
                                    DƠN HÀNG
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
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <i className="fa-sharp fa-solid fa-right-from-bracket"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
