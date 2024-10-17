//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useState } from 'react';
import restfulApi from '../../../restfulApi';
import { useNavigate } from 'react-router-dom';

import image from '../../../assets/Images';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
const cx = classNames.bind(style);
function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ck, setCk] = useState({
        email: true,
        password: true,
    });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const check = () => {
        let valid = true;
        if (!regex.test(email)) {
            setCk((prev) => ({ ...prev, email: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, email: true }));
        }

        if (password.length < 6) {
            setCk((prev) => ({ ...prev, password: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, password: true }));
        }
        return valid;
    };
    // Tạo cookie với thời gian hết hạn là 15 phút
    const setCookie = (name, value, minutes) => {
        const now = new Date();
        now.setTime(now.getTime() + minutes * 60 * 1000); // Thiết lập thời gian hết hạn
        const expires = 'expires=' + now.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`; // Đặt cookie
    };
    const handleLogin = async () => {
        try {
            if (check()) {
                let formData = new FormData();
                formData.append('account', email);
                formData.append('password', password);
                let res = await restfulApi.loginAdmin(formData);
                if (res && res.data && res.data.EC === 0) {
                    const role = res.data.DT.role; // Giả sử token nằm trong `DT` của response
                    const token = res.data.ST;
                    localStorage.setItem('role', role); // Lưu token vào localStorage
                    localStorage.setItem('token', token);
                    navigate('/admin/home');
                    // Sử dụng hàm
                    setCookie('adminStatus', res.data.ST, 15); // Cookie sẽ tự động xóa sau 15 phút
                }
            }
        } catch (error) {
            toast.error(error.response.data.EM);
        }
    };
    // const blur = () => {
    //     check();
    // };
    return (
        <>
            <div className={cx('image-background')}>
                <img src={image.background} />
            </div>
            <div className={cx('login')}>
                <form className={cx('form')}>
                    <h4>Login by account Admin to open page management</h4>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Email</label>
                        <input
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập Email"
                            //onBlur={blur}
                        />
                        {/* {!ck.email && <div className={cx('error')}>Không đúng email</div>} */}
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Password</label>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập Password"
                            // onBlur={blur}
                        />
                        {/* {!ck.password && <div className={cx('error')}>Password đẫ sai</div>} */}
                    </div>
                    <div className={cx('item')}>
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default AdminLogin;
