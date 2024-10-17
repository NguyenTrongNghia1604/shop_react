//
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
//
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
const cx = classNames.bind(style);
function SidebarAdmin({ isOpen = true }) {
    const [show, setShow] = useState(false);

    console.log('check type', isOpen);
    useLayoutEffect(() => {
        const main = document.querySelector('.main');
        const styles = document.querySelector('.styles');
        if (main) {
            main.style.transition = 'margin-left 0.3s ease'; // Thêm transition để đồng bộ hóa
            main.style.marginLeft = isOpen ? '300px' : '0px';
            styles.style.width = isOpen ? '300px' : '0px';
            styles.style.transition = 'width 0.3s ease';
        }
    }, [isOpen]);
    return (
        // onClick={(e) => e.stopPropagation()  có nghĩa là chăn Bạn có thể sử dụng stopPropagation
        // để ngăn sự kiện click lan truyền lên các component cha và gây thay đổi không mong muốn:
        <div className={cx('sidebar', 'styles')} onClick={(e) => e.stopPropagation()}>
            <ul className={cx('sidebar-nav')}>
                <li className={cx('item', 'act')}>
                    <a className={cx('hr')} href="/admin/home">
                        <span>
                            <i className="fa-thin fa-grid-2"></i> Dashboard
                        </span>
                    </a>
                </li>
                <li className={cx('item')}>
                    <a className={cx('hr')} href="javascript:void(0)">
                        <span>
                            <i className="fa-thin fa-grid-2"></i> Component
                        </span>
                        <i className="fa-light fa-chevron-down" onClick={() => setShow((prev) => !prev)}></i>
                    </a>
                    <ul className={cx('component', `${show ? 'act' : ''}`)}>
                        <li className={cx('item_comp')}>
                            <a className={cx('hr_cp')} href="/admin/order">
                                <span>
                                    <i class="fa-light fa-cart-shopping"></i> Đơn hàng
                                </span>
                            </a>
                        </li>
                        <li className={cx('item_comp')}>
                            <a className={cx('hr_cp')} href="/admin/123">
                                <span>
                                    <i className="fa-thin fa-grid-2"></i> Dashboard
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className={cx('item')}>
                    <a className={cx('hr')} href="/admin/123">
                        <span>
                            <i className="fa-thin fa-grid-2"></i> Dashboard
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
SidebarAdmin.propTypes = {
    isOpen: PropTypes.bool,
};
export default SidebarAdmin;
