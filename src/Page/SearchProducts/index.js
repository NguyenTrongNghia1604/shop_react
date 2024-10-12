//
import Carousel from '../../Layout/Componet/Carousel';
//
import restfulApi from '../../restfulApi';
//
import '../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
//
import { useLocation } from 'react-router-dom';
//
import classNames from 'classnames/bind';
import style from './SearchProducts.module.scss';
import { useEffect, useState } from 'react';
import ToastCart from '../../Layout/Componet/ToastCart';
import Category from '../../Layout/Componet/Category';
const cx = classNames.bind(style);
export default function SearchProducts() {
    const location = useLocation();
    const value = location?.state;

    const [toastShow, setToastShow] = useState(false);

    const [data, setData] = useState([]);

    const [dataToast, setDataToast] = useState('');

    // check login
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const userId = getCookie('userId');

    // test
    useEffect(() => {
        const test = async () => {
            const formData = new FormData();
            formData.append('search', value);
            formData.append('userId', userId);
            // Log dữ liệu của formData
            let res = await restfulApi.searchProducts(formData);
            if (res && res.data && res.data.EC === 0) {
                setData(res.data.DT);
                console.log('check resdataa DT', res.data.DT);
            }
        };
        test();
    }, [value, userId]);

    const handleCart = () => {
        setToastShow((prev) => !prev);
    };
    const handleClear = () => {
        setToastShow(false); // Đặt `toastShow` thành false khi muốn đóng ToastCart
        setDataToast('');
    };

    // price
    const handlePrice = (number, km) => {
        const formattedNumber = number.toLocaleString('vi-VN');
        const kmPrice = number * (1 - km / 100);
        return {
            price: formattedNumber.toLocaleString('vi-VN'),
            km: kmPrice.toLocaleString('vi-VN'),
        };
    };
    return (
        <>
            <div className={cx('home')}>
                <Carousel />
                <div className={cx('wrapper-home')}>
                    <div className={cx('row', 'wrapper')}>
                        {/* clg 3 */}
                        <Category />
                        <div className={cx('col-lg-9', 'clg9')}>
                            <div className={cx('product')}>
                                <div className={cx('row', 'pr')}>
                                    {/*  */}
                                    <h2>Danh sách đã tìm kiếm</h2>
                                    {data &&
                                        data.length > 0 &&
                                        data.map((item, index) => {
                                            return (
                                                <div key={index} className={cx('col-lg-3', 'pr-clg3')}>
                                                    <div className={cx('card', 'cd')}>
                                                        <a href={`/detailsProduct/${item.url}?id=${item.id}`}>
                                                            <img
                                                                src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.image}`}
                                                                className="card-img-top"
                                                                alt="..."
                                                            />
                                                        </a>
                                                        <div className={cx('card-body', 'cd-body')}>
                                                            <h5 className={cx('card-title', 'write')}>{item.title}</h5>
                                                            <p className={cx('price')}>
                                                                {item.priceKm === '0' ? (
                                                                    ''
                                                                ) : (
                                                                    <del>
                                                                        {
                                                                            handlePrice(
                                                                                `${item.price}`,
                                                                                `${item.priceKm}`,
                                                                            ).price
                                                                        }
                                                                        đ
                                                                    </del>
                                                                )}
                                                                <ins>
                                                                    {handlePrice(`${item.price}`, `${item.priceKm}`).km}
                                                                    đ
                                                                </ins>
                                                            </p>
                                                            <a
                                                                href="javascript:void(0)"
                                                                onClick={() => {
                                                                    handleCart();
                                                                    setDataToast(item.id);
                                                                }}
                                                                className="btn btn-primary"
                                                            >
                                                                Thêm Vào{' '}
                                                                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    {item.priceKm !== '0' ? (
                                                        <div className={cx('promotion')}>
                                                            <div className={cx('sale')}>
                                                                <i className="fa-sharp fa-solid fa-bolt-lightning"></i>
                                                                <span>-{item.priceKm}%</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={cx('promotion')} style={{ display: 'none' }}>
                                                            <div className={cx('sale')}>
                                                                <i className="fa-sharp fa-solid fa-bolt-lightning"></i>
                                                                <span>-{item.priceKm}%</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    {/*  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* toast cart */}
                <ToastCart boolean={toastShow} handleClear={handleClear} id={dataToast} />
                {/*  */}
            </div>
        </>
    );
}
