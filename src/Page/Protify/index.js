//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useEffect, useState } from 'react';
import Images from '../../Component/Images/image';
import classNames from 'classnames/bind';
import style from './Protify.module.scss';
import axios from 'axios';
import restfulApi from '../../restfulApi';
import images from '../../assets/Images';
const cx = classNames.bind(style);
function Protify() {
    // lấy thông tin người dùng
    const [dataInfoUser, setDataInfoUser] = useState({});

    // xử lý hide sửa thông tin người dùng
    const [editInfo, setEditInfo] = useState(false);

    const [number, setNumber] = useState('');

    const [tinh, setTinh] = useState([]);
    const [quan, setQuan] = useState([]);
    const [phuong, setPhuong] = useState([]);

    const [idTinh, setIdTinh] = useState({});
    const [idQuan, setIdQuan] = useState({});
    const [namePhuong, setNamePhuong] = useState('');

    //
    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState('');
    // check login
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const userId = getCookie('userId');

    // lấy thhongo tin người dùng
    useEffect(() => {
        const getInfoUser = async () => {
            try {
                let res = await restfulApi.getUser(userId);
                if (res && res.data && res.data.EC === 0) {
                    setDataInfoUser(res.data.DT);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getInfoUser();
    }, [userId]);

    // axit address
    useEffect(() => {
        const fetchDataTinh = async () => {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
                if (res) {
                    setTinh(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataTinh();
    }, []);

    // lấy quận huyện
    useEffect(() => {
        const fetchDataQuan = async () => {
            try {
                let res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${idTinh.id || '01'} .htm`);
                if (res) {
                    setQuan(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataQuan();
    }, [idTinh]);

    const handleChangeTinhThanh = (e) => {
        setIdTinh(e);
    };

    // lấy
    useEffect(() => {
        const fetchDataPhuong = async () => {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${idQuan.id || '001'}.htm`);
                if (res) {
                    setPhuong(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataPhuong();
    }, [idQuan]);

    const handleChangeQuanHuyen = (e) => {
        setIdQuan(e);
    };

    const handleChangePhuongXa = (full_name) => {
        setNamePhuong(full_name);
        console.log('phương', full_name);
    };

    // xử lý save thông tin người dùng
    const handleSaveInfoUser = async (userId, fullName, image, number, tinh, quan, phuong) => {
        let address = tinh + ', ' + quan + ', ' + phuong;
        console.log('check ', userId, fullName, image, number, tinh, quan, phuong);
        try {
            // Tạo FormData để gửi dữ liệu và ảnh
            let formData = new FormData();
            formData.append('userId', userId);
            formData.append('fullName', fullName);
            formData.append('avatar', image);
            formData.append('number', number);
            formData.append('address', address);
            let res = await restfulApi.updataInfoUser(formData);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                setEditInfo(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('protify')}>
                <div className={cx('row', 'info_protify')}>
                    <div className={cx('col-lg-3', 'left')}>
                        <div className={cx('info')}>
                            <div className={cx('avatar')}>
                                <Images
                                    className={cx('img')}
                                    src={
                                        `${process.env.REACT_APP_URL_BACKEND}/images/${dataInfoUser.images}` ||
                                        images.user
                                    }
                                    alt="error"
                                />
                                <div className={cx('name')}>
                                    <h4>{dataInfoUser.fullName}</h4>
                                    <span onClick={() => setEditInfo(true)}>
                                        <i class="fa-solid fa-pen"></i> Sửa Hồ Sơ
                                    </span>
                                </div>
                            </div>
                            <div className={cx('sidebar')}>
                                <ul className={cx('ul')}>
                                    <li className={cx('item')}>
                                        <div className={cx('acc')}>
                                            <i class="fa-solid fa-user"></i>
                                            <span>Tài khoản của tôi</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-9', 'right')}>
                        <div className={cx('info')}>
                            <div className={cx('hs')}>
                                <h4>Hồ sơ người dùng</h4>
                                <span>Quản lý thông tin bảo mật</span>
                            </div>
                            <div className={cx('mb', 'form_hs')}>
                                <label>Tên người dùng:</label>
                                <input value={dataInfoUser.fullName} />
                            </div>
                            <div className={cx('mb', 'form_hs')}>
                                <label>Email:</label>
                                <span>{dataInfoUser.email}</span>
                            </div>
                            <div className={cx('mb', 'form_hs')}>
                                <label>Số điện thoại:</label>
                                <input value={dataInfoUser.phone} />
                            </div>
                            <div className={cx('mb', 'form_hs')}>
                                <label>Address:</label>
                                <input value={dataInfoUser.address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* sửa thông tin user */}
            <div className={cx('edit_info_user', `${!editInfo ? 'edit_hide' : ''}`)}>
                <div className={cx('info')}>
                    <button className={cx('exit')} onClick={() => setEditInfo((prev) => !prev)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div className={cx('hs')}>
                        <h4>Sửa Hồ sơ người dùng</h4>
                        <span>Quản lý thông tin bảo mật</span>
                    </div>
                    <div className={cx('mb', 'form_hs')}>
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])} // Lưu trữ File object
                            id="file-upload"
                        />
                    </div>
                    <div className={cx('mb', 'form_hs')}>
                        <label>Tên người dùng:</label>
                        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className={cx('mb', 'form_hs')}>
                        <label>Email:</label>
                        <span>nghia@gmail.com</span>
                    </div>
                    <div className={cx('mb', 'form_hs')}>
                        <label>Số điện thoại:</label>
                        <input value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>
                    <div className={cx('mb', 'form_hs')}>
                        <label>Address:</label>
                        <div className={cx('address')}>
                            <select
                                className={cx('tinh_thanh')}
                                onChange={(e) => {
                                    let select = JSON.parse(e.target.value);
                                    handleChangeTinhThanh(select);
                                }}
                            >
                                <option selected>Tỉnh thành</option>
                                {tinh.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={JSON.stringify({ id: item.id, full_name: item.full_name })}
                                        >
                                            {item.full_name}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                className={cx('quan_huỵen')}
                                onChange={(e) => {
                                    let select = JSON.parse(e.target.value);
                                    handleChangeQuanHuyen(select);
                                }}
                            >
                                <option selected>Quân huyện</option>
                                {quan.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={JSON.stringify({ id: item.id, full_name: item.full_name })}
                                        >
                                            {item.full_name}
                                        </option>
                                    );
                                })}
                            </select>
                            <select className={cx('phuong-xa')} onChange={(e) => handleChangePhuongXa(e.target.value)}>
                                <option selected>Phường Xã</option>
                                {phuong.map((item, index) => {
                                    return (
                                        <option key={index} value={item.full_name}>
                                            {item.full_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={cx('mb', 'save')}>
                        <button
                            onClick={() =>
                                handleSaveInfoUser(
                                    userId,
                                    fullName,
                                    image,
                                    number,
                                    idTinh.full_name,
                                    idQuan.full_name,
                                    namePhuong,
                                )
                            }
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('background', `${!editInfo ? 'edit_hide' : ''}`)}></div>
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

export default Protify;
