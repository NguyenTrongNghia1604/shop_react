//
import Image from '../../Component/Images/image';
import images from '../../assets/Images';
import classNames from 'classnames/bind';
import style from './Order.module.scss';
const cx = classNames.bind(style);
function Order() {
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
