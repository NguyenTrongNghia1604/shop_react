//
import { TippyList } from '../../TippyList/listMenu';
//
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light.css';
//
import { useNavigate } from 'react-router-dom';
//
import '../../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
//
import restfulApi from '../../../restfulApi';
//
import Images from '../../../Component/Images/image';
import images from '../../../assets/Images';
//
import Search from '../../Search';
//
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import Sidebar from '../Sidebar';
import { useState, useEffect } from 'react';
import User from '../User';
const cx = classNames.bind(style);

export default function Header() {
    const navigate = useNavigate();

    const [turnsCart, setTurnsCart] = useState(5);

    // data shopping cart
    const [dataShoppingCart, setDataShoppingCart] = useState([]);

    // data shopping cart in localSto
    const [dataShoppingCartLocal, setDataShoppingCartLocal] = useState([]);

    // take data category
    const [dataCategory, setDataCategory] = useState([]);

    // check login
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const checkLogin = getCookie('status');

    // handle show
    const [show, setShow] = useState(false);
    const handleClickOutside = () => {
        setShow(false);
    };

    // take data shopping car when login success and take data when not login
    useEffect(() => {
        const takeDataShoppingCart = async () => {
            let res = await restfulApi.takeDataShoppingCart();
            if (res && res.data && res.data.EC === 0) {
                setDataShoppingCart(res.data.DT);
                let count = res.data.DT.length;
                setTurnsCart(count);
            }
        };
        takeDataShoppingCart();
    }, []);

    // take data shopping car in localStory
    useEffect(() => {
        // Hàm lấy dữ liệu giỏ hàng từ localStorage
        const getDataFromLocalStorage = () => {
            let takeDataShoppingCartInLocal = JSON.parse(localStorage.getItem('info_cart')) || [];
            setDataShoppingCartLocal(takeDataShoppingCartInLocal);
            let count = takeDataShoppingCartInLocal.length;
            setTurnsCart(count);
        };
        // Lấy dữ liệu giỏ hàngkhi component mount
        getDataFromLocalStorage();
    }, []);

    // take data category
    useEffect(() => {
        try {
            const fetchData = async () => {
                let res = await restfulApi.takeCategory();
                if (res && res.data && res.data.EC === 0) {
                    setDataCategory(res.data.DT);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleShoppingCart = () => {
        setShow((prev) => !prev);
    };
    // price
    const handlePrice = (number, amount) => {
        let price = number.replace(/\./g, '');
        let resualt = price * amount;
        const formattedNumber = resualt.toLocaleString('vi-VN');
        return {
            price: formattedNumber.toLocaleString('vi-VN'),
        };
    };
    // handleMoveAllShoppingCart
    const handleMoveAllShoppingCart = () => {
        navigate('/shoppingCart');
        setShow(false);
    };

    // handleChooseCategory
    const handleChooseCategory = (id, name) => {
        const trimmedQuery = name.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
        const convertedQuery = trimmedQuery.replace(/\s+/g, '+'); // Thay thế khoảng trắng bằng '+'
        navigate(`/category?category_query=${convertedQuery}`, { state: id });
    };
    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Sidebar />
                    <div className={cx('logo')}>
                        <a href="/">
                            <Images src={images.logo} className={cx('img')} />
                        </a>
                    </div>
                    <ul className={cx('hd')}>
                        <li className={cx('item')}>
                            <a href="/">TRANG CHỦ</a>
                        </li>
                        <li className={cx('item')}>
                            <a href="/shirt-men">ÁO NAM</a>
                        </li>
                        <li className={cx('item')}>
                            <a href="/pants">QUẦN NAM</a>
                        </li>
                        <li className={cx('item')}>
                            <a href="/phu-kien">PHỤ KIỆN</a>
                        </li>
                        <li className={cx('item')}>
                            <span className={cx('info_cate')}>DANH MỤC</span>
                            <ul className={cx('cate')}>
                                {dataCategory &&
                                    dataCategory.length > 0 &&
                                    dataCategory.map((item, index) => {
                                        return (
                                            <li className={cx('item_c2')} key={index}>
                                                <span className={cx('c2_tit')}>{item.type}</span>
                                                <ul className={cx('c2')}>
                                                    {item.Category.map((sub, subIndex) => {
                                                        return (
                                                            <li
                                                                key={subIndex}
                                                                onClick={() => handleChooseCategory(sub.id, sub.name)}
                                                            >
                                                                <span>{sub.name}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </li>
                        <li className={cx('item')}>
                            <a href="/khuyen-mai">SALE</a>
                        </li>
                    </ul>
                    <div className={cx('wrapper-opration')}>
                        <div className={cx('operation')}>
                            <div className={cx('cart')}>
                                <span className={cx('turns')}>{turnsCart >= 5 ? `5+` : turnsCart}</span>
                                <Tippy
                                    visible={show}
                                    onClickOutside={handleClickOutside}
                                    interactive={true}
                                    placement="bottom"
                                    theme={'light'}
                                    content={
                                        <div className={cx('resualt')}>
                                            <div className={cx('add-cart')}>
                                                <ul>
                                                    {checkLogin === 'true'
                                                        ? dataShoppingCart &&
                                                          dataShoppingCart.map((item, index) => {
                                                              return (
                                                                  <li key={index}>
                                                                      <Images
                                                                          className={cx('img')}
                                                                          src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.images}`}
                                                                          alt="error"
                                                                      />
                                                                      <span>{item.title}</span>
                                                                      <ins>
                                                                          {handlePrice(item.price, item.amount).price}đ
                                                                      </ins>
                                                                  </li>
                                                              );
                                                          })
                                                        : dataShoppingCartLocal &&
                                                          dataShoppingCartLocal.map((item, index) => {
                                                              return (
                                                                  <li key={index}>
                                                                      <Images
                                                                          className={cx('img')}
                                                                          src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.image}`}
                                                                          alt="error"
                                                                      />
                                                                      <span>{item.title}</span>
                                                                      <ins>
                                                                          {handlePrice(item.price, item.amount).price}đ
                                                                      </ins>
                                                                  </li>
                                                              );
                                                          })}
                                                </ul>
                                                <button className={cx('move-cart')} onClick={handleMoveAllShoppingCart}>
                                                    Xem giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                    }
                                >
                                    <i class="fa-sharp fa-solid fa-cart-shopping" onClick={handleShoppingCart}></i>
                                </Tippy>
                            </div>
                            <div className={cx('plane')}>
                                <Tippy content={<span>Tin nhắn</span>}>
                                    <i class="fa-solid fa-paper-plane"></i>
                                </Tippy>
                            </div>
                            <div className={cx('user')}>
                                <TippyList>
                                    <User />
                                </TippyList>
                            </div>
                        </div>
                        <button
                            className={cx('navbar-toggler', 'action')}
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasDarkNavbar"
                            aria-controls="offcanvasDarkNavbar"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
                <Search />
            </nav>
        </>
    );
}
