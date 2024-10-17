//
import images from '../../../assets/Images';
import Images from '../../../Component/Images/image';
import classNames from 'classnames/bind';
import style from './User.module.scss';
import { useEffect, useState } from 'react';
import restfulApi from '../../../restfulApi';
const cx = classNames.bind(style);

function User() {
    const [avatar, setAvatar] = useState({});
    const getCookie = (name) => {
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        console.log('All cookies:', cookies);
        return cookies[name] || null;
    };
    const status = getCookie('status');
    const userId = getCookie('userId');

    useEffect(() => {
        try {
            const takeInfoUser = async () => {
                let res = await restfulApi.getUser(userId);
                if (res && res.data && res.data.EC === 0) {
                    setAvatar(res.data.DT);
                }
            };
            takeInfoUser();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <>
            {status === 'true' ? (
                <div className={cx('images-user')}>
                    <Images
                        src={
                            avatar.images ? `${process.env.REACT_APP_URL_BACKEND}/images/${avatar.images}` : images.user
                        }
                        className={cx('images')}
                    />
                </div>
            ) : (
                <i class="fa-regular fa-ellipsis-stroke-vertical"></i>
            )}
        </>
    );
}

export default User;
