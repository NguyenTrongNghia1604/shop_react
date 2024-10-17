//
import restfulApi from '../../../restfulApi';
import { useNavigate } from 'react-router-dom';
//
import classNames from 'classnames/bind';
import style from './rederMenu.module.scss';
const cx = classNames.bind(style);
export const RederMenu = ({ list }) => {
    const navigate = useNavigate();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const userId = getCookie('userId');
    const handleClickRef = async (item) => {
        console.log('item', item);
        console.log('item.clear', item.clear);
        if (item.clear) {
            try {
                let res = await restfulApi.clearSessionLogin(userId);
                if (res && res.data && res.data.EC === 0) {
                    // Hoặc xóa tất cả cookie (nếu cần)
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i];
                        const eqPos = cookie.indexOf('=');
                        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
                    }
                    // const cookiesToDelete = ['userId', 'fullname', 'images', 'status']; // Danh sách cookie cần xóa
                    // cookiesToDelete.forEach((cookie) => {
                    //     document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                    // });
                    navigate('/');
                    window.location.reload();
                } else {
                    alert(res.data.EM);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (item.to) {
            navigate(item.to);
            window.location.reload();
        }
    };
    return (
        <div className={cx('wrapper')}>
            {' '}
            <ul>
                {list.map((item, index) => (
                    <li key={index} onClick={() => handleClickRef(item)}>
                        <a>
                            <i className={item.icon}></i>
                            {item.titile}
                        </a>
                    </li>
                ))}{' '}
            </ul>
        </div>
    );
};
