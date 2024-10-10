//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useState } from 'react';
import restfulApi from '../../restfulApi';
import { useNavigate } from 'react-router-dom';

import image from '../../assets/Images';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
const cx = classNames.bind(style);
function Login() {
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
        if (!email) {
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
    const handleLogin = async () => {
        if (check()) {
            let formData = {
                email,
                password,
            };
            let res = await restfulApi.login(formData);
            if (res && res.data && res.data.EC === 0) {
                // Set cookies đúng cách
                document.cookie = `userId=${encodeURIComponent(res.data.DT.userId)}`;
                document.cookie = `fullname=${encodeURIComponent(res.data.DT.fullName)}`;
                document.cookie = `images=${encodeURIComponent(res.data.DT.images)}`;
                document.cookie = `status=${encodeURIComponent(res.data.ST)}`;

                // shopping cart
                const cart = JSON.parse(localStorage.getItem('info_cart')) || [];
                // Cập nhật mảng cart để thêm userId vào từng sản phẩm
                const userId = res.data.DT.userId;
                const updatedCart = cart.map((item) => ({
                    userId: item.userId || userId, // Thêm userId, nếu đã có thì giữ nguyên
                    ...item, // Sao chép tất cả các thuộc tính hiện tại
                }));

                // Lưu lại mảng cart đã cập nhật vào localStorage
                localStorage.setItem('info_cart', JSON.stringify(updatedCart));
                console.log('data', updatedCart);
                await restfulApi.shoppingCartLogin(updatedCart);

                navigate('/'); // Navigate after processing cart
                window.location.reload();

                // remove local
                localStorage.removeItem('info_cart');
            } else {
                toast.error('Đăng nhập thất bại');
            }
        } else {
            check();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn chặn hành vi mặc định
            handleLogin();
            
        }
    };
    return (
        <>
            <div className={cx('image-background')}>
                <img src={image.background} />
            </div>
            <div className={cx('login')}>
                <form className={cx('form')}>
                    <h4>Login with us</h4>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Email</label>
                        <input
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập Email"
                            onKeyDown={(e) => handleKeyDown(e)}
                            // onBlur={blur}
                        />
                        {!ck.email && <div className={cx('error')}>Không đúng email</div>}
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Password</label>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập Password"
                            onKeyDown={(e) => handleKeyDown(e)}
                            //onBlur={blur}
                        />
                        {!ck.password && <div className={cx('error')}>Password đẫ sai</div>}
                    </div>
                    <div className={cx('item')}>
                        <button type="button" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className={cx('or')}>
                        <span>OR</span>
                    </div>
                    <div className={cx('auth')}>
                        <button className={cx('facebook')}>
                            <i class="fa-brands fa-facebook"></i> Facebook
                        </button>
                        <button className={cx('google')}>
                            <i class="fa-brands fa-google"></i> Google
                        </button>
                    </div>
                    <span className={cx('re')}>
                        Not an account yet?<a href="/register">Register here</a>
                    </span>
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

export default Login;
