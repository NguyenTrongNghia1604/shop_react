//
import Carousel from '../../Layout/Componet/Carousel';
//
import restfulApi from '../../restfulApi';
//
import '../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
//
import classNames from 'classnames/bind';
import style from './Accessories.module.scss';
import { useEffect, useState } from 'react';
import ToastCart from '../../Layout/Componet/ToastCart';
import Category from '../../Layout/Componet/Category';
const cx = classNames.bind(style);
export default function Accessories() {
    const [toastShow, setToastShow] = useState(false);

    const [data, setData] = useState([]);

    const [dataToast, setDataToast] = useState('');

    // test
    useEffect(() => {
        const test = async () => {
            let res = await restfulApi.takeDataAccessories();
            if (res && res.data && res.data.EC === 0) {
                setData(res.data.DT);
            }
        };
        test();
    }, []);

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
                                    <h2>ÁO NAM</h2>
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
