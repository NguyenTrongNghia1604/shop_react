//
import { useEffect, useState } from 'react';
//
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import restfulApi from '../../../restfulApi';
//
import { useNavigate } from 'react-router-dom';
//
//import { api } from '../../../Request/Request';
import classNames from 'classnames/bind';
import style from './ToastCart.module.scss';
const cx = classNames.bind(style);
function ToastCart({ boolean, update, handleClear, id }) {
    const navigate = useNavigate();

    const [sileBtn, setSileBtn] = useState('');

    const [turns, setTurns] = useState(1);

    //
    const [toastData, setToastData] = useState([]);

    // data in shopping cart
    const [dataShoppingCart, setDataShoppingCart] = useState([]);

    // sile
    const handleSileBtn = (e) => {
        setSileBtn(e);
    };

    useEffect(() => {
        const takeData = async () => {
            let res = await restfulApi.toastCart(id || 0);
            if (res && res.data && res.data.EC === 0) {
                setToastData(res.data.DT);
            }
        };
        takeData();
    }, [id]);

    // take data form shopping cart
    useEffect(() => {
        const data = async () => {
            let res = await restfulApi.takeDataShoppingCart();
            if (res && res.data && res.data.EC === 0) {
                setDataShoppingCart(res.data.DT);
            }
        };
        data();
    }, []);

    // //
    // useEffect(() => {
    //     api({
    //         method: 'get',
    //         url: `products/${+id}`,
    //     }).then((res) => {
    //         setToastData(res.data);
    //     });
    // }, [id]);

    // dọc cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };

    // xử lý tạo sản phẩn trong giỏ hàng
    const handleAddCart = async (productId, title, price, size, amount, image, type) => {
        const status = getCookie('status');
        const userId = getCookie('userId');
        if (status === 'true') {
            let check = dataShoppingCart.find((item) => item.productId == productId);
            console.log('kieemt tra check', check);
            if (check) {
                toast.error('Sản phẩm đã có trong giở hàng');
            } else {
                const formData = new FormData();
                formData.append('userId', userId);
                formData.append('productId', productId);
                formData.append('title', title);
                formData.append('price', price);
                formData.append('size', size);
                formData.append('amount', amount);
                formData.append('image', image);
                formData.append('type', type);
                let res = await restfulApi.shoppingCart(formData);
                if (res && res.data && res.data.EC === 0) {
                    toast.success(res.data.EM);
                    update(false);
                    setTimeout(() => {
                        navigate(0);
                    }, 6000);
                }
            }
        } else {
            let cart = JSON.parse(localStorage.getItem('info_cart')) || [];
            const newProduct = { productId, title, price, size, amount, image, type };
            let checkCart = cart.some((item) => item.productId === newProduct.productId);
            if (checkCart) {
                toast.error('Sản phẩm đã có trong giở hàng');
            } else {
                toast.success('Đã thêm vào giỏ hàng');
                cart.push(newProduct);
                localStorage.setItem('info_cart', JSON.stringify(cart));
                navigate(0);
            }
        }
    };

    // xử lý đi vào giỏ hàng
    const handleLetGoShoppingCart = () => {
        navigate('/shoppingCart');
    };

    // turns
    // trừ
    const handleRemove = () => {
        setTurns((prev) => {
            if (prev <= 1) {
                return 1;
            } else {
                const resualt = prev - 1;
                return resualt;
            }
        });
    };
    // cộng
    const handleAdd = () => {
        setTurns((next) => {
            if (next <= 1 && next >= 100) {
                return 0;
            } else {
                const resualt = next + 1;
                return resualt;
            }
        });
    };

    // price
    const handlePrice = (number, km) => {
        const formattedNumber = number.toLocaleString('vi-VN');
        const kmPrice = number * (1 - km / 100);
        return {
            price: formattedNumber.toLocaleString('vi-VN'),
            km: kmPrice.toLocaleString('vi-VN'),
        };
    };
    return (
        <>
            <div className={cx('toast-cart', `${boolean ? 'toast-act' : ''}`)}>
                <div className={cx('info')}>
                    <div className={cx('clear')} onClick={handleClear}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div className={cx('pay-cart')}>
                        <img
                            src={`${process.env.REACT_APP_URL_BACKEND}/images/${toastData.image}`}
                            alt={toastData.title}
                        />
                        <div className={cx('cart-info')}>
                            <h3>{toastData.title}</h3>
                            <div className={cx('size')}>
                                {toastData.categoryId === 8 || toastData.categoryId === 9 ? (
                                    <select
                                        id="fruit"
                                        name="fruit"
                                        value={sileBtn}
                                        onChange={(e) => handleSileBtn(e.target.value)}
                                    >
                                        <option selected>size</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                    </select>
                                ) : (
                                    <>
                                        <button
                                            className={cx('sile-btn', `${sileBtn === 'XX' ? 'act' : ''}`)}
                                            onClick={() => handleSileBtn('XX')}
                                        >
                                            XX
                                        </button>
                                        <button
                                            className={cx('sile-btn', `${sileBtn === 'LG' ? 'act' : ''}`)}
                                            onClick={() => handleSileBtn('LG')}
                                        >
                                            LG
                                        </button>
                                        <button
                                            className={cx('sile-btn', `${sileBtn === 'LN' ? 'act' : ''}`)}
                                            onClick={() => handleSileBtn('LN')}
                                        >
                                            LN
                                        </button>
                                    </>
                                )}

                                <div className={cx('turns')}>
                                    <button onClick={handleRemove}>-</button>
                                    <input value={turns} />
                                    <button onClick={handleAdd}>+</button>
                                </div>
                            </div>
                            <div className={cx('promotion')}>
                                <h3>Khuyến mãi hót nhất</h3>
                                <ul>
                                    <li>
                                        <i class="fa-solid fa-truck-fast"></i>Miễn phí vận chuyển cho đơn hàng 200k
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-gift"></i>lên tới 100k
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-money-bill"></i>Phiếu giảm giá hàng trị giá 50k
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('price')}>
                                <p>
                                    <del>{handlePrice(`${toastData.price}`, `${toastData.priceKm || 0}`).price}đ</del>
                                    <ins>{handlePrice(`${toastData.price}`, `${toastData.priceKm || 0}`).km}đ</ins>
                                </p>
                            </div>
                            <div className={cx('add-to-cart')}>
                                <button
                                    onClick={() =>
                                        handleAddCart(
                                            id,
                                            toastData.title,
                                            handlePrice(`${toastData.price}`, `${toastData.priceKm || 0}`).km,
                                            sileBtn,
                                            turns,
                                            toastData.image,
                                            toastData.type,
                                        )
                                    }
                                >
                                    Thêm vào <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                                </button>
                                <button onClick={handleLetGoShoppingCart}>
                                    Đi vào <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('bg-cart', `${boolean ? 'toast-act' : ''}`)}></div>
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

export default ToastCart;
