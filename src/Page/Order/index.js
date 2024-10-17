//
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import restfulApi from '../../restfulApi';
import Image from '../../Component/Images/image';
import classNames from 'classnames/bind';
import style from './Order.module.scss';
const cx = classNames.bind(style);
function Order() {
    const navigator = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        try {
            const fetchData = async () => {
                let res = await restfulApi.getOrderClientDB();
                if (res && res.data && res.data.EC === 0) {
                    setData(res.data.DT);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // handleDetailProduct
    const handleDetailProduct = (id, slug) => {
        console.log('check id', id, slug);
        window.location.href = `/detailsProduct/${slug}?id=${id}`;
    };
    return (
        <div className={cx('order')}>
            <div className={cx('row', 'wrapper')}>
                <div className={cx('col-lg-12', 'info')}>
                    <h3>Thông tin đơn hàng đã mua</h3>
                    <div className={cx('row', 'menu_order')}>
                        <div className={cx('col-lg-5', 'left')}>
                            <span>Đơn hàng</span>
                        </div>
                        <div className={cx('col-lg-7', 'right')}>
                            <ul>
                                <li>Giá</li>
                                <li>Status</li>
                                <li>Thao tác</li>
                            </ul>
                        </div>
                    </div>
                    {data &&
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <div className={cx('row', 'item')} key={index}>
                                    <div className={cx('col-lg-5', 'info_order')}>
                                        <Image
                                            className={cx('img')}
                                            src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.productImage}`}
                                        />
                                        <span onClick={(e) => handleDetailProduct(item.idProduct, item.slugProduct)}>
                                            {item.productTitle}
                                        </span>
                                    </div>
                                    <div className={cx('col-lg-7', 'price_act')}>
                                        <div className={cx('price')}>
                                            <ins>{item.price}đ</ins>
                                        </div>
                                        <div className={cx('status')}>
                                            <span>{item.payment_status}</span>
                                        </div>
                                        <button className={cx('info_act')}>
                                            <i class="fa-light fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    {/* 
                    <div className={cx('row', 'item')}>
                        <div className={cx('col-lg-5', 'info_order')}>
                            <Image className={cx('img')} src={images.error} />
                            <span>Áo Sơ Mi Vải Oxford Trơn Form Regular SM158 Màu Xa...</span>
                        </div>
                        <div className={cx('col-lg-7', 'price_act')}>
                            <div className={cx('price')}>
                                <ins>255.000đ</ins>
                            </div>
                            <div className={cx('status')}>
                                <span>Đang xử lý...</span>
                            </div>
                            <button className={cx('info_act')}>
                                <i class="fa-light fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div className={cx('row', 'item')}>
                        <div className={cx('col-lg-5', 'info_order')}>
                            <Image className={cx('img')} src={images.error} />
                            <span>Áo Sơ Mi Vải Oxford Trơn Form Regular SM158 Màu Xa...</span>
                        </div>
                        <div className={cx('col-lg-7', 'price_act')}>
                            <div className={cx('price')}>
                                <ins>255.000đ</ins>
                            </div>
                            <div className={cx('status')}>
                                <span>Đang xử lý...</span>
                            </div>
                            <button className={cx('info_act')}>
                                <i class="fa-light fa-trash"></i>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Order;
