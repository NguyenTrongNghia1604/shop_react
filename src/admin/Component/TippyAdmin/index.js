//
import image from '../../../assets/Images';
import classNames from 'classnames/bind';
import style from './TippyAdmin.module.scss';
const cx = classNames.bind(style);
function TippyAdmin() {
    return (
        <div className={cx('wrapper')}>
            <a href="/admin/123" className={cx('item')}>
                <img className={cx('img')} src={image.user} />
                <div className={cx('info')}>
                    <h4>Nguyễn Trọng Nghĩa</h4>
                    <span>
                        Từng ngày anh cứ vấng lặng thinh, chờ ngày em theo người ta bước đi anh không nghĩ gì, trái tim
                        đã mang tổn thương
                    </span>
                    <p>4 giờ trước</p>
                </div>
            </a>
            <a href="/admin/123" className={cx('item')}>
                <img className={cx('img')} src={image.user} />
                <div className={cx('info')}>
                    <h4>Nguyễn Trọng Nghĩa</h4>
                    <span>
                        Từng ngày anh cứ vấng lặng thinh, chờ ngày em theo người ta bước đi anh không nghĩ gì, trái tim
                        đã mang tổn thương
                    </span>
                    <p>4 giờ trước</p>
                </div>
            </a>
        </div>
    );
}

export default TippyAdmin;
