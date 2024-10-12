//
import { useEffect, useState } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import restfulApi from '../../restfulApi';
//
import images from '../../assets/Images';
//
import Images from '../../Component/Images/image';
//
import { useParams, useLocation, useNavigate } from 'react-router-dom';
//
import classNames from 'classnames/bind';
import style from './DetailsProducts.module.scss';
const cx = classNames.bind(style);

function DetailsProducts() {
    //const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy ID từ query string
    const id = new URLSearchParams(location.search).get('id');
    console.log('check id', id);

    const [sileBtn, setSileBtn] = useState('XX');

    const [turns, setTurns] = useState(1);

    const [likeProduct, setLikeProduct] = useState(false);

    const [useful, setUseful] = useState(false);
    //
    const [dataDetails, setDataDetails] = useState([]);
    //
    const [imageOnchange, setImageOnchange] = useState('');
    //
    const [reviewImage, setReviewImage] = useState([]);

    // data in shopping cart
    const [dataShoppingCart, setDataShoppingCart] = useState([]);

    // dọc cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const userId = getCookie('userId');
    // sile
    const handleSileBtn = (e) => {
        setSileBtn(e);
        console.log('cehck e siae', e);
    };

    // take data form product
    useEffect(() => {
        const takeData = async () => {
            let res = await restfulApi.toastCart(id || 0);
            if (res && res.data && res.data.EC === 0) {
                setDataDetails(res.data.DT);
                setReviewImage(res.data.DT.imagesReview);
                console.log('check review', res.data.DT.imagesReview);
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

    // xử lý like product
    useEffect(() => {
        if (likeProduct === true) {
            const fetchLike = async () => {
                try {
                    const formData = {
                        id: id,
                        userId: userId,
                    };
                    let res = await restfulApi.likeProduct(formData);
                    if (res && res.data && res.data.EC === 0) {
                        console.log('true');
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchLike();
        }
    }, [likeProduct, id, userId]);

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
            price: formattedNumber,
            km: kmPrice.toLocaleString('vi-VN'),
        };
    };

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

    // handleTranferImage
    const handleTranferImage = (image) => {
        setImageOnchange(image);
    };

    // đi đến giỏ hàng
    const handleLetGoCart = () => {
        navigate('/shoppingCart');
    };

    // usefull
    const handleLike = () => {
        setUseful((prev) => !prev);
    };

    // xử lý like product
    const handleLikeProduct = () => {
        setLikeProduct((prev) => !prev);
    };
    return (
        <>
            <div className={cx('details-product')}>
                <div className={cx('item-center')}>
                    <a href="/">Trang chủ</a>
                    <i className="fa-regular fa-chevron-right"></i>
                    <a href={`/detailsProduct/${dataDetails.url}?id=${id}`}>Chi tiết sản phẩm</a>
                    <i className="fa-regular fa-chevron-right"></i>
                    <span>{dataDetails.title}</span>
                </div>
                <div className={cx('row', 'details')}>
                    <div className={cx('col-lg-5', 'clg-5')}>
                        <img
                            className={cx('image')}
                            src={`${process.env.REACT_APP_URL_BACKEND}/images/${imageOnchange || dataDetails.image}`}
                            alt="error"
                        />
                        <div className={cx('sile-img')}>
                            {reviewImage.map((item, index) => {
                                return (
                                    <div
                                        className={cx('tab-img')}
                                        key={index}
                                        onClick={() => handleTranferImage(item.image_path)}
                                    >
                                        <img src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.image_path}`} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className={cx('item-info')}>
                            <div className={cx('share')}>
                                <span>Chia sẻ:</span>
                                <button>
                                    <i className="fa-brands fa-facebook"></i>
                                </button>
                                <button>
                                    <i className="fa-brands fa-twitter"></i>
                                </button>
                                <button>
                                    <i className="fa-brands fa-linkedin"></i>
                                </button>
                                <button>
                                    <i className="fa-brands fa-instagram"></i>
                                </button>
                            </div>
                            <div className={cx('like')}>
                                <button onClick={handleLikeProduct}>
                                    <i className={cx('fa-light fa-heart', `${likeProduct ? 'act' : ''}`)}></i>
                                </button>
                                <span>Đã thích (26)</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-7', 'clg-7')}>
                        <div className={cx('name')}>
                            <span>yêu thích</span>
                            <h4>{dataDetails.title}</h4>
                        </div>
                        <div className={cx('size')}>
                            <div className={cx('add-size')}>
                                {dataDetails.categoryId === 8 || dataDetails.categoryId === 9 ? (
                                    <select
                                        id="fruit"
                                        name="fruit"
                                        value={sileBtn}
                                        //onClick={() => handleSileBtn(size)}
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
                            </div>
                            <div className={cx('turns')}>
                                <span style={{ marginRight: '5px' }}>Số lượng: </span>
                                <button onClick={handleRemove}>-</button>
                                <input value={turns} />
                                <button onClick={handleAdd}>+</button>
                            </div>
                        </div>
                        <div className={cx('promotion')}>
                            <h3>Khuyến mãi hót nhất</h3>
                            <ul>
                                <li>
                                    <i className="fa-solid fa-truck-fast"></i>Miễn phí vận chuyển cho đơn hàng 200k
                                </li>
                                <li>
                                    <i className="fa-solid fa-gift"></i>Khi mua hàng có giá trị trên 200k có thể nhận
                                    quà lên tới 100k
                                </li>
                                <li>
                                    <i className="fa-solid fa-money-bill"></i>Phiếu giảm giá hàng trị giá 50k
                                </li>
                            </ul>
                        </div>
                        <div className={cx('price')}>
                            <p>
                                <del>{handlePrice(`${dataDetails.price}`, `${dataDetails.priceKm || 0}`).price}đ</del>
                                <ins>{handlePrice(`${dataDetails.price}`, `${dataDetails.priceKm || 0}`).km}đ</ins>
                            </p>
                        </div>
                        <div className={cx('add-to-cart')}>
                            <button
                                onClick={() =>
                                    handleAddCart(
                                        id,
                                        dataDetails.title,
                                        handlePrice(`${dataDetails.price}`, `${dataDetails.priceKm || 0}`).km,
                                        sileBtn,
                                        turns,
                                        dataDetails.image,
                                        dataDetails.type,
                                    )
                                }
                            >
                                Thêm vào <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                            </button>
                            <button onClick={handleLetGoCart}>
                                Đi đến <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('row', 'description')}>
                    <div className={cx('col-lg-9', 'clg-9')}>
                        <div className={cx('info-des')}>
                            <h3 className={cx('title')}>MÔ TẢ SẢN PHẨM</h3>
                            <ul>
                                <li>{dataDetails.description}</li>
                            </ul>
                        </div>
                        <div className={cx('evaluation')}>
                            <h3 className={cx('title')}>ĐÁNH GIÁ SẢN PHẨM</h3>
                            <div className={cx('overview-comment')}>
                                <div className={cx('star-overview')}>
                                    <div className={cx('number-star')}>
                                        <h3>4.9</h3>
                                        <span>trên 5</span>
                                    </div>
                                    <div className={cx('info-star')}>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>
                                <div className={cx('overview')}>
                                    <button>Tất cả</button>
                                    <button>5 sao (25)</button>
                                    <button>4 sao (25)</button>
                                    <button>3 sao (25)</button>
                                    <button>2 sao (25)</button>
                                    <button>1 sao (25)</button>
                                </div>
                            </div>
                            <div className={cx('list-comment')}>
                                <div className={cx('item')}>
                                    <div className={cx('img-display')}>
                                        <Images className={cx('img')} src={images.user} alt="error" />
                                    </div>
                                    <div className={cx('info-comment')}>
                                        <h4>Nguyễn Trọng Nghĩa</h4>
                                        <div className={cx('info-star')}>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <span>2024-07-27 09:38 | Phân loại hàng: Đồ ăn nhanh</span>
                                        <div className={cx('description')}>
                                            <div>
                                                <span>Đúng với mô tả:</span>
                                                <p>50/50</p>
                                            </div>
                                            <div>
                                                <span>Chất lượng sản phẩm:</span>
                                                <p>Ok</p>
                                            </div>
                                            <describe>dhadhasdhasdh</describe>
                                        </div>
                                        <div className={cx('cm-img')}>
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                        </div>
                                        <div className={cx('like')}>
                                            <i
                                                className={cx('fa-solid fa-thumbs-up', `${useful ? '' : 'color'}`)}
                                                onClick={handleLike}
                                            ></i>
                                            <span>Hữu ích(100)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('item')}>
                                    <div className={cx('img-display')}>
                                        <Images className={cx('img')} src={images.user} alt="error" />
                                    </div>
                                    <div className={cx('info-comment')}>
                                        <h4>Nguyễn Trọng Nghĩa</h4>
                                        <div className={cx('info-star')}>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <span>2024-07-27 09:38 | Phân loại hàng: Đồ ăn nhanh</span>
                                        <div className={cx('description')}>
                                            <div>
                                                <span>Đúng với mô tả:</span>
                                                <p>50/50</p>
                                            </div>
                                            <div>
                                                <span>Chất lượng sản phẩm:</span>
                                                <p>Ok</p>
                                            </div>
                                            <describe>dhadhasdhasdh</describe>
                                        </div>
                                        <div className={cx('cm-img')}>
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                        </div>
                                        <div className={cx('like')}>
                                            <i
                                                className={cx('fa-solid fa-thumbs-up', `${useful ? '' : 'color'}`)}
                                                onClick={handleLike}
                                            ></i>
                                            <span>Hữu ích(100)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('item')}>
                                    <div className={cx('img-display')}>
                                        <Images className={cx('img')} src={images.user} alt="error" />
                                    </div>
                                    <div className={cx('info-comment')}>
                                        <h4>Nguyễn Trọng Nghĩa</h4>
                                        <div className={cx('info-star')}>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <span>2024-07-27 09:38 | Phân loại hàng: Đồ ăn nhanh</span>
                                        <div className={cx('description')}>
                                            <div>
                                                <span>Đúng với mô tả:</span>
                                                <p>50/50</p>
                                            </div>
                                            <div>
                                                <span>Chất lượng sản phẩm:</span>
                                                <p>Ok</p>
                                            </div>
                                            <describe>dhadhasdhasdh</describe>
                                        </div>
                                        <div className={cx('cm-img')}>
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                            <Images className={cx('img')} src={images.error} alt="error" />
                                        </div>
                                        <div className={cx('like')}>
                                            <i
                                                className={cx('fa-solid fa-thumbs-up', `${useful ? '' : 'color'}`)}
                                                onClick={handleLike}
                                            ></i>
                                            <span>Hữu ích(100)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-3', 'clg-3')}></div>
                </div>
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

export default DetailsProducts;
