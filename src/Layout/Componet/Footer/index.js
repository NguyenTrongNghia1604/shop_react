//
import '../../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
//
import images from '../../../assets/Images';
import classNames from 'classnames/bind';
import style from './Footer.module.scss';
const cx = classNames.bind(style);
function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('row', 'rw')}>
                <div className={cx('col-lg-4', 'clg-a4')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="error" />
                    </div>
                    <ul>
                        <li>Trang web sử dụng giao diện thân thiện, dễ sử dụng</li>
                        <li>Cho phép người dùng chọn danh mục các loại đồ mặc như và nhiều lựa chọn khác.</li>
                        <li>Khách hàng có thể dễ dàng đặt hàng trực tuyến,</li>

                        <li>thanh toán linh hoạt bằng nhiều phương thức, và theo dõi trạng thái đơn hàng.</li>
                        <li>Chương trình khuyến mãi, ưu đãi đặc biệt</li>
                        <li>Hệ thống tích điểm để thu hút và giữ chân khách hàng.</li>
                    </ul>
                </div>
                <div className={cx('col-lg-4', 'clg-b4')}>
                    <div className={cx('footer-category')}>
                        <h3>Danh mục</h3>
                        <ul>
                            <li>
                                <a href="/">ÁO NAM</a>
                            </li>
                            <li>
                                <a href="/">QUÀN NAM</a>
                            </li>
                            <li>
                                <a href="/">PHỤ KIỆN</a>
                            </li>
                            <li>
                                <a href="/">GIẦY DÉP</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('col-lg-4', 'clg-c4')}>
                    <div className={cx('footer-contact')}>
                        <h3>Contact come with us need</h3>
                        <ul>
                            <li>
                                <i class="fa-solid fa-phone"></i> (+84) 12345678
                            </li>
                            <li>
                                <a href="/">
                                    <i class="fa-brands fa-facebook"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i class="fa-brands fa-twitter"></i> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i class="fa-solid fa-envelope"></i> quanao@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span>@ShopThucAnNhanh hân hành tài chợ chương trình này @ktkt.edu</span>
            </div>
        </div>
    );
}

export default Footer;
