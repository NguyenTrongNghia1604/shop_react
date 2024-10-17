//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useState } from 'react';
import restfulApi from '../../restfulApi';
import { useNavigate } from 'react-router-dom';
//
import image from '../../assets/Images';
import classNames from 'classnames/bind';
import style from './Register.module.scss';
const cx = classNames.bind(style);
function Register() {
    const navigater = useNavigate();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ck, setCk] = useState({
        fullName: true,
        username: true,
        email: true,
        password: true,
    });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const check = () => {
        let valid = true;
        if (fullName === '') {
            setCk((prev) => ({ ...prev, fullName: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, fullName: true }));
        }

        if (username === '') {
            setCk((prev) => ({ ...prev, username: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, username: true }));
        }

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
    const handleRegister = async () => {
        if (check()) {
            const formData = {
                fullName,
                username,
                email,
                password,
            };
            let res = await restfulApi.register(formData);

            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                navigater('/login');
            } else {
                toast.error(res.data.EM || 'Đăng ký thất bại, vui lòng thử lại.');
            }
        } else {
            check();
        }
    };
    const handleKeyDowm = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
            e.preventDefault();
        }
    };
    return (
        <>
            <div className={cx('image-background')}>
                <img src={image.background} />
            </div>
            <div className={cx('register')}>
                <form className={cx('form')}>
                    <h4>Register with us</h4>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Fullname</label>
                        <input
                            value={fullName}
                            type="text"
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập Họ & Tên"
                            onKeyDown={(e) => handleKeyDowm(e)}
                            //onBlur={blur}
                        />
                        {!ck.fullName && <div className={cx('error')}>Vui lòng nhập Fullname</div>}
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Username</label>
                        <input
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập username"
                            onKeyDown={(e) => handleKeyDowm(e)}
                            //onBlur={blur}
                        />
                        {!ck.username && <div className={cx('error')}>Vui lòng nhập username</div>}
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Email</label>
                        <input
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập Email"
                            onKeyDown={(e) => handleKeyDowm(e)}
                            //onBlur={blur}
                        />
                        {!ck.email && <div className={cx('error')}>Vui lòng nhập email</div>}
                    </div>
                    <div className={cx('item')}>
                        <label className={cx('text')}>Password</label>
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập Password"
                            onKeyDown={(e) => handleKeyDowm(e)}
                            //onBlur={blur}
                        />
                        {!ck.password && <div className={cx('error')}>Vui lòng nhập Password</div>}
                    </div>
                    <div className={cx('item')}>
                        <button type="button" onClick={handleRegister}>
                            Register
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
                        I already have an account.?<a href="/login">Login here</a>
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

export default Register;
