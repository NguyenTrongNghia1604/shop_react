//
import React, { useState } from 'react';
//
import '../../../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
//
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
//
import { RederMenu } from '../rederMenu';
//
//
import classNames from 'classnames/bind';
import style from './listMenu.module.scss';
const cx = classNames.bind(style);
//
const list = [
    {
        titile: 'Đăng Nhập',
        to: '/login',
    },
    {
        titile: 'Đăng Ký',
        to: '/register',
    },
];
const listLogin = [
    {
        titile: 'Protify',
        to: '/protify',
        icon: 'fa-duotone fa-solid fa-user',
    },
    {
        titile: 'Đơn hàng',
        to: '/order',
        icon: 'fa-solid fa-basket-shopping-simple',
    },
    {
        titile: 'Logout',
        icon: 'fa-sharp fa-solid fa-right-from-bracket',
        clear: true,
    },
];
export const TippyList = ({ children }) => {
    // Đọc JSON cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const status = getCookie('status');

    const [isOpen, setIsOpen] = useState(false);

    const handleShow = () => {
        setIsOpen((prev) => !prev);
    };
    const handleClickOutside = () => {
        setIsOpen(false);
    };
    console.log('check show', isOpen);
    return (
        <Tippy
            visible={isOpen}
            onClickOutside={handleClickOutside}
            interactive={true}
            placement="bottom"
            theme={'light'}
            content={
                <div className={cx('resualt')}>
                    <RederMenu list={!status ? list : listLogin} />
                </div>
            }
        >
            <button onClick={handleShow}>{children}</button>
        </Tippy>
    );
};
