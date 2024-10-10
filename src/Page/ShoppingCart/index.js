//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import Images from '../../Component/Images/image';
//
import { useEffect, useState } from 'react';
//
import restfulApi from '../../restfulApi';
//
import { useNavigate } from 'react-router-dom';
//
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
//
import classNames from 'classnames/bind';
import style from './ShoppingCart.module.scss';
const cx = classNames.bind(style);
function ShoppingCart() {
    const navigator = useNavigate();
    //
    const [showClassification, setShowClassification] = useState({});
    const [showAction, setShowAction] = useState({});

    // size
    const [size, setSize] = useState('');

    // data from DB
    const [data, setData] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState({}); // Lưu trạng thái của từng checkbox

    const [countProductDB, setCountProductDB] = useState(0);
    const [totalPriceDB, setTotalPriceDB] = useState(0);

    // local
    // data shopping cart in localSto
    const [dataShoppingCartLocal, setDataShoppingCartLocal] = useState([]);

    const [selectedProductsLocal, setSelectedProductsLocal] = useState({}); // Lưu trạng thái của từng checkbox Local

    // xử lý đếm sản phẩm đã check
    const [countProduct, setCountProduct] = useState(0);
    // tính giá tiền
    const [countPrice, setCountPrice] = useState(0);

    // handle hide voucher
    const [showVoucher, setShowVoucher] = useState(false);

    // payUrl
    const [payUrl, setPayUrl] = useState('');
    const [showPayCK, setShowPayCK] = useState(false);

    // payment
    const [dataPayment, setDataPayment] = useState([]);

    // check login
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
        }
        return null;
    };
    const checkLogin = getCookie('status');

    // code Database
    // take data from DB
    useEffect(() => {
        const takeShoppingCart = async () => {
            let res = await restfulApi.takeDataShoppingCart();
            if (res && res.data && res.data.EC === 0) {
                setData(res.data.DT);
            }
        };
        takeShoppingCart();
    }, []);

    // Hàm xử lý khi thay đổi trạng thái checkbox của từng sản phẩm
    const handleCheckboxChange = (id) => {
        setSelectedProducts((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [id]: !prevSelectedProducts[id], // Đảo trạng thái checkbox
        }));
    };

    // xử lý show Classification
    const handleClassification = (id) => {
        setShowClassification((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // xử lý setShowAction
    const handleAction = (id) => {
        setShowAction((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // xử lý turn db
    const handleTurnPrevDB = (id) => {
        const updataTurnDB = data.map((item) =>
            item.productId === id && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item,
        );
        let updataTurnAndPrice = updataTurnDB.map((item) =>
            item.productId === id
                ? {
                      ...item,
                      priceT: item.amount * parseInt(item.price.replace(/\./g, ''), 10),
                  }
                : item,
        );
        setData(updataTurnAndPrice);
    };

    const handleTurnNextDB = (id) => {
        const updataTurnDB = data.map((item) => (item.productId === id ? { ...item, amount: item.amount + 1 } : item));
        let updataTurnAndPrice = updataTurnDB.map((item) =>
            item.productId === id
                ? { ...item, priceT: item.amount * parseInt(item.price.replace(/\./g, ''), 10) }
                : item,
        );
        setData(updataTurnAndPrice);
    };

    // xử lý size db
    const handleSizeDB = (id, e) => {
        let updateSize = data.map((item) => (item.productId === id ? { ...item, size: e } : item));
        setData(updateSize);
        setSize(e);
    };

    // xử lý delete sản phẩm trong giỏ hàng DB
    const handleDeleteDB = async (id) => {
        try {
            let res = await restfulApi.deleteShoppingCart(id);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                setTimeout(() => {
                    navigator(0);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // xử lý tính toán sản phẩm
    useEffect(() => {
        const handleCountProduct = () => {
            let countProduct = Object.keys(selectedProducts).filter((item) => selectedProducts[item] === true);
            let count = countProduct.length;
            let totalPrice = countProduct.reduce((sum, id) => {
                let result = data.find((item) => item.id == id);
                if (result) {
                    setDataPayment((prev) => {
                        // Thêm sản phẩm vào dataPayment nếu nó chưa tồn tại
                        if (!prev.some((product) => product.id === result.id)) {
                            return [...prev, result];
                        }
                        return prev; // Nếu đã tồn tại, giữ nguyên danh sách
                    });
                    return sum + parseInt(result.price.replace(/\./g, ''), 10) * result.amount;
                }
                return sum;
            }, 0);
            // Xóa các sản phẩm không được chọn (false)
            setDataPayment((prev) => prev.filter((item) => selectedProducts[item.id]));
            setTotalPriceDB(totalPrice);
            setCountProductDB(count);
        };
        handleCountProduct();
    }, [selectedProducts, data]);

    /////////////////////////////////////////////////////////

    // code localStory
    // xử lý on click out size
    const handleHide = (id) => {
        setShowClassification((prev) => ({ ...prev, [id]: false }));
    };

    // xử lý onClickoutsize delete
    const handleHideDelete = (id) => {
        setShowAction((prev) => ({ ...prev, [id]: false }));
    };
    // take data shopping car in localStory
    useEffect(() => {
        // Hàm lấy dữ liệu giỏ hàng từ localStorage
        const getDataFromLocalStorage = () => {
            let takeDataShoppingCartInLocal = JSON.parse(localStorage.getItem('info_cart')) || [];
            setDataShoppingCartLocal(takeDataShoppingCartInLocal);
        };
        // Lấy dữ liệu giỏ hàngkhi component mount
        getDataFromLocalStorage();
    }, []);
    // Hàm xử lý khi thay đổi trạng thái checkbox của từng sản phẩm
    const handleCheckboxChangeLocal = (id) => {
        setSelectedProductsLocal((prevSelectedProducts) => ({
            ...prevSelectedProducts,
            [id]: !prevSelectedProducts[id], // Đảo trạng thái checkbox
        }));
    };
    // xử lý turn in LocalStory
    const handleTurn = (id, e) => {
        const display = dataShoppingCartLocal.map((item) => (item.productId === id ? { ...item, amount: e } : item));
        setDataShoppingCartLocal(display);
    };
    const handlePrev = (id) => {
        const updataLocal = dataShoppingCartLocal.map((item) =>
            item.productId === id && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item,
        );
        const updataNew = updataLocal.map((item) =>
            item.productId === id
                ? { ...item, priceT: parseInt(item.price.replace(/\./g, ''), 10) * item.amount }
                : item,
        );
        setDataShoppingCartLocal(updataNew);
    };
    const handleNext = (id) => {
        const updataLocal = dataShoppingCartLocal.map((item) =>
            item.productId === id ? { ...item, amount: item.amount + 1 } : item,
        );
        const updataNew = updataLocal.map((item) =>
            item.productId === id
                ? { ...item, priceT: parseInt(item.price.replace(/\./g, ''), 10) * item.amount }
                : item,
        );

        setDataShoppingCartLocal(updataNew);
    };

    // xử lý size
    const handleSize = (id, newSize) => {
        const updata = dataShoppingCartLocal.map((item) => (item.productId === id ? { ...item, size: newSize } : item));
        setDataShoppingCartLocal(updata);
    };

    // xử lý xóa shopping cart
    const handleDeleteLocal = (id) => {
        let cart = JSON.parse(localStorage.getItem('info_cart')); // Lấy và chuyển đổi dữ liệu từ localStorage
        if (cart) {
            // Lọc bỏ sản phẩm có productId bằng với id
            let updatedCart = cart.filter((item) => item.productId !== id);
            // Cập nhật lại localStorage với mảng đã lọc
            localStorage.setItem('info_cart', JSON.stringify(updatedCart));
            // Cập nhật lại state với dữ liệu mới
            setDataShoppingCartLocal(updatedCart);
        }
    };

    // xử lý đếm sản phẩm đã check
    // lưu ý:
    // selectedProductsLocal là một object, nhưng bạn đang dùng .map()
    // để xử lý như một mảng. Thay vào đó, bạn cần dùng
    // Object.keys() để lấy danh sách các id sản phẩm đã được chọn.
    //
    // Object.keys(selectedProductsLocal) trả về danh sách các id của sản phẩm.
    // filter() kiểm tra xem sản phẩm nào có giá trị true (đã được check).
    useEffect(() => {
        const handleCountProduct = () => {
            let checkProduct = Object.keys(selectedProductsLocal).filter((id) => selectedProductsLocal[id] === true);
            let count = checkProduct.length;

            // Tính tổng giá tiền các sản phẩm đã được chọn
            let totalPrice = checkProduct.reduce((sum, selectedId) => {
                let product = dataShoppingCartLocal.find((item) => item.productId === selectedId); // Tìm sản phẩm theo ID
                if (product) {
                    console.log('product found', product);
                    return sum + parseInt(product.price.replace(/\./g, ''), 10) * product.amount; // Cộng giá vào tổng
                }
                return sum; // Nếu không tìm thấy sản phẩm, trả về sum hiện tại
            }, 0);

            setCountProduct(count);
            setCountPrice(totalPrice);
        };

        handleCountProduct();
    }, [selectedProductsLocal, dataShoppingCartLocal]);

    // xử lý chọn mã giảm giá
    const handleChooseVoucher = () => {
        setShowVoucher((prev) => !prev);
    };

    // xử lý mua hàng
    const handlePurchase = async () => {
        try {
            if (checkLogin === 'true') {
                setShowPayCK((prev) => !prev);
                let res = await restfulApi.payment({
                    listProduct: dataPayment,
                    totalPrice: totalPriceDB,
                });
                if (res && res.data && res.data.EC === 0) {
                    setPayUrl(res.data.DT);
                }
            } else {
                toast.warning('Vui lòng đăng nhập trước khi mua hàng');
                setTimeout(() => {
                    navigator('/login');
                }, 6000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlePayClose = () => {
        setShowPayCK(false);
    };
    const handlePayNext = () => {
        window.location.href = payUrl.payUrl;
    };
    return (
        <>
            <div className={cx('shopping-cart')}>
                {/*  */}
                {checkLogin === 'true' ? (
                    <>
                        <div className={cx('header-cart')}>
                            <div className="row">
                                <div className={cx('col-lg-6', 'left')}>
                                    <div className={cx('tick')}>
                                        <input
                                            type="checkbox"
                                            onClick={() => {
                                                // Hàm every trong JavaScript kiểm tra xem tất cả các phần tử trong mảng có thỏa mãn một điều kiện cụ thể hay không.
                                                // Nếu tất cả các phần tử trong mảng thỏa mãn điều kiện, hàm sẽ trả về true;
                                                // nếu chỉ cần một phần tử không thỏa mãn, nó sẽ trả về false
                                                const allSelected = data.every((item) => selectedProducts[item.id]);
                                                // Hàm reduce trong JavaScript cho phép bạn giảm (reduce) một mảng xuống thành một giá trị duy nhất,
                                                // bằng cách thực thi một hàm lên mỗi phần tử của mảng (từ trái sang phải) và giữ lại kết quả trong một biến tích lũy.
                                                const updatedSelected = data.reduce((acc, item) => {
                                                    acc[item.id] = !allSelected;
                                                    return acc;
                                                }, {});
                                                setSelectedProducts(updatedSelected);
                                            }}
                                            checked={data.every((item) => selectedProducts[item.id])} // Kiểm tra tất cả checkbox đã được chọn hay chưa/>
                                        />
                                        <span>Sản phẩm </span>
                                    </div>
                                </div>
                                <div className={cx('col-lg-6', 'right')}>
                                    <ul>
                                        <li>Đơn giá</li>
                                        <li>Số lượng</li>
                                        <li>Số tiền</li>
                                        <li>Thao tác</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <div className={cx('info-product')} key={index}>
                                        <div className="row">
                                            <div className={cx('col-lg-6', 'left')}>
                                                <div className={cx('info-wrapper')}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts[item.id] || false}
                                                        onChange={() => handleCheckboxChange(item.id)} // Sự kiện thay đổi trạng thái checkbox
                                                    />
                                                    <div className={cx('product')}>
                                                        <Images
                                                            src={`http://localhost:8081/images/${item.images}`}
                                                            alt="error"
                                                            className={cx('img')}
                                                        />
                                                        <div className={cx('tit')}>
                                                            <span>{item.title}</span>
                                                            <p>Đổi trả trong 17 ngày </p>
                                                        </div>
                                                    </div>
                                                    <div className={cx('classification')}>
                                                        <Tippy
                                                            visible={showClassification[item.id] || false}
                                                            interactive={true}
                                                            onClickOutside={() => handleClassification(item.id)}
                                                            placement="bottom"
                                                            theme={'light'}
                                                            content={
                                                                <div className={cx('wrapper')}>
                                                                    <span>Thể loại:</span>
                                                                    <div className={cx('catagory')}>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'áo' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Áo
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'quần' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Quần
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'giầy' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Giầy
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${
                                                                                    item.type === 'phụ kiện'
                                                                                        ? 'act'
                                                                                        : ''
                                                                                }`,
                                                                            )}
                                                                        >
                                                                            Phụ kiện
                                                                        </button>
                                                                    </div>
                                                                    <span>Size:</span>
                                                                    <div className={cx('size')}>
                                                                        {item.size === 'XX' ||
                                                                        item.size === 'LG' ||
                                                                        item.size === 'LN' ? (
                                                                            <>
                                                                                <button
                                                                                    className={cx(
                                                                                        'item',
                                                                                        `${
                                                                                            item.size === 'LG'
                                                                                                ? 'act'
                                                                                                : ''
                                                                                        }`,
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        handleSizeDB(
                                                                                            item.productId,
                                                                                            'LG',
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    LG
                                                                                </button>
                                                                                <button
                                                                                    className={cx(
                                                                                        'item',
                                                                                        `${
                                                                                            item.size === 'XX'
                                                                                                ? 'act'
                                                                                                : ''
                                                                                        }`,
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        handleSizeDB(
                                                                                            item.productId,
                                                                                            'XX',
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    XX
                                                                                </button>
                                                                                <button
                                                                                    className={cx(
                                                                                        'item',
                                                                                        `${
                                                                                            item.size === 'XL'
                                                                                                ? 'act'
                                                                                                : ''
                                                                                        }`,
                                                                                    )}
                                                                                    onClick={() =>
                                                                                        handleSizeDB(
                                                                                            item.productId,
                                                                                            'XL',
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    XL
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <select
                                                                                className={cx('size')}
                                                                                id="fruit"
                                                                                name="fruit"
                                                                                value={size}
                                                                                //onClick={() => handleSileBtn(size)}
                                                                                onChange={(e) =>
                                                                                    handleSizeDB(
                                                                                        item.productId,
                                                                                        e.target.value,
                                                                                    )
                                                                                }
                                                                            >
                                                                                <option selected>size</option>
                                                                                <option value="39">39</option>
                                                                                <option value="40">40</option>
                                                                                <option value="41">41</option>
                                                                                <option value="42">42</option>
                                                                            </select>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <span onClick={() => handleClassification(item.id)}>
                                                                {' '}
                                                                Phân loại{' '}
                                                                <i
                                                                    className={`fa-solid fa-caret-${
                                                                        showClassification[item.id] ? 'up' : 'down'
                                                                    }`}
                                                                ></i>
                                                            </span>
                                                        </Tippy>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('col-lg-6', 'right')}>
                                                <ul>
                                                    <li>
                                                        <span>{item.price}đ</span>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <button onClick={() => handleTurnPrevDB(item.productId)}>
                                                                -
                                                            </button>
                                                            <input type="text" value={item.amount} />
                                                            <button onClick={() => handleTurnNextDB(item.productId)}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <ins>{(item.priceT || item.price).toLocaleString('vn')}đ</ins>
                                                    </li>
                                                    <li>
                                                        <Tippy
                                                            visible={showAction[item.id] || false}
                                                            interactive={true}
                                                            onClickOutside={() => handleAction(item.id)}
                                                            placement="bottom"
                                                            theme={'light'}
                                                            content={
                                                                <div className={cx('action')}>
                                                                    <button onClick={() => handleDeleteDB(item.id)}>
                                                                        Xóa
                                                                    </button>
                                                                </div>
                                                            }
                                                        >
                                                            <span
                                                                className={cx('ac')}
                                                                onClick={() => handleAction(item.id)}
                                                            >
                                                                thao tác{' '}
                                                                <i
                                                                    className={`fa-solid fa-caret-${
                                                                        showAction[item.id] ? 'up' : 'down'
                                                                    }`}
                                                                ></i>
                                                            </span>
                                                        </Tippy>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                ) : (
                    <>
                        <div className={cx('header-cart')}>
                            <div className="row">
                                <div className={cx('col-lg-6', 'left')}>
                                    <div className={cx('tick')}>
                                        <input
                                            type="checkbox"
                                            onClick={() => {
                                                // Hàm every trong JavaScript kiểm tra xem tất cả các phần tử trong mảng có thỏa mãn một điều kiện cụ thể hay không.
                                                // Nếu tất cả các phần tử trong mảng thỏa mãn điều kiện, hàm sẽ trả về true;
                                                // nếu chỉ cần một phần tử không thỏa mãn, nó sẽ trả về false
                                                const allSelected = dataShoppingCartLocal.every(
                                                    (item) => selectedProductsLocal[item.productId],
                                                );
                                                // Hàm reduce trong JavaScript cho phép bạn giảm (reduce) một mảng xuống thành một giá trị duy nhất,
                                                // bằng cách thực thi một hàm lên mỗi phần tử của mảng (từ trái sang phải) và giữ lại kết quả trong một biến tích lũy.
                                                const updatedSelected = dataShoppingCartLocal.reduce((acc, item) => {
                                                    acc[item.productId] = !allSelected;
                                                    return acc;
                                                }, {});
                                                setSelectedProductsLocal(updatedSelected);
                                            }}
                                            checked={dataShoppingCartLocal.every(
                                                (item) => selectedProductsLocal[item.productId],
                                            )} // Kiểm tra tất cả checkbox đã được chọn hay chưa/>
                                        />
                                        <span>Sản phẩm </span>
                                    </div>
                                </div>
                                <div className={cx('col-lg-6', 'right')}>
                                    <ul>
                                        <li>Đơn giá</li>
                                        <li>Số lượng</li>
                                        <li>Số tiền</li>
                                        <li>Thao tác</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {dataShoppingCartLocal &&
                            dataShoppingCartLocal.length > 0 &&
                            dataShoppingCartLocal.map((item, index) => {
                                return (
                                    <div className={cx('info-product')} key={index}>
                                        <div className="row">
                                            <div className={cx('col-lg-6', 'left')}>
                                                <div className={cx('info-wrapper')}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProductsLocal[item.productId] || false}
                                                        onChange={() => handleCheckboxChangeLocal(item.productId)} // Sự kiện thay đổi trạng thái checkbox
                                                    />
                                                    <div className={cx('product')}>
                                                        <Images
                                                            src={`http://localhost:8081/images/${item.image}`}
                                                            alt="error"
                                                            className={cx('img')}
                                                        />
                                                        <div className={cx('tit')}>
                                                            <span>{item.title}</span>
                                                            <p>Đổi trả trong 17 ngày </p>
                                                        </div>
                                                    </div>
                                                    <div className={cx('classification')}>
                                                        <Tippy
                                                            visible={showClassification[item.productId] || false}
                                                            onClickOutside={() => handleHide(item.productId)}
                                                            interactive={true}
                                                            placement="bottom"
                                                            theme={'light'}
                                                            content={
                                                                <div className={cx('wrapper')}>
                                                                    <span>Thể loại:</span>
                                                                    <div className={cx('catagory')}>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'áo' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Áo
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'quần' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Quần
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.type === 'giầy' ? 'act' : ''}`,
                                                                            )}
                                                                        >
                                                                            Giầy
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${
                                                                                    item.type === 'phụ kiện'
                                                                                        ? 'act'
                                                                                        : ''
                                                                                }`,
                                                                            )}
                                                                        >
                                                                            Phụ kiện
                                                                        </button>
                                                                    </div>
                                                                    <span>Size:</span>
                                                                    <div className={cx('size')}>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.size === 'LG' ? 'act' : ''}`,
                                                                            )}
                                                                            onClick={() =>
                                                                                handleSize(item.productId, 'LG')
                                                                            }
                                                                        >
                                                                            LG
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.size === 'XX' ? 'act' : ''}`,
                                                                            )}
                                                                            onClick={() =>
                                                                                handleSize(item.productId, 'XX')
                                                                            }
                                                                        >
                                                                            XX
                                                                        </button>
                                                                        <button
                                                                            className={cx(
                                                                                'item',
                                                                                `${item.size === 'XL' ? 'act' : ''}`,
                                                                            )}
                                                                            onClick={() =>
                                                                                handleSize(item.productId, 'XL')
                                                                            }
                                                                        >
                                                                            XL
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <span onClick={() => handleClassification(item.productId)}>
                                                                {' '}
                                                                Phân loại{' '}
                                                                <i
                                                                    className={`fa-solid fa-caret-${
                                                                        showClassification[item.productId]
                                                                            ? 'up'
                                                                            : 'down'
                                                                    }`}
                                                                ></i>
                                                            </span>
                                                        </Tippy>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('col-lg-6', 'right')}>
                                                <ul>
                                                    <li>
                                                        <span>{item.price}đ</span>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <button onClick={() => handlePrev(item.productId)}>
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={item.amount}
                                                                onChange={(e) =>
                                                                    handleTurn(Number(item.productId, e.target.value))
                                                                }
                                                            />
                                                            <button onClick={() => handleNext(item.productId)}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <ins>{(item.priceT || item.price).toLocaleString('vi-VN')}</ins>
                                                    </li>
                                                    <li>
                                                        <Tippy
                                                            visible={showAction[item.productId] || false}
                                                            onClickOutside={() => handleHideDelete(item.productId)}
                                                            interactive={true}
                                                            placement="bottom"
                                                            theme={'light'}
                                                            content={
                                                                <div className={cx('action')}>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteLocal(item.productId)
                                                                        }
                                                                    >
                                                                        Xóa
                                                                    </button>
                                                                </div>
                                                            }
                                                        >
                                                            <span
                                                                className={cx('ac')}
                                                                onClick={() => handleAction(item.productId)}
                                                            >
                                                                thao tác{' '}
                                                                <i
                                                                    className={`fa-solid fa-caret-${
                                                                        showAction[item.id] ? 'up' : 'down'
                                                                    }`}
                                                                ></i>
                                                            </span>
                                                        </Tippy>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </>
                )}
                {/* thanh toán */}
                <div className={cx('info_pay')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-12', 'center')}>
                            <div className={cx('info_voucher')}>
                                <div className={cx('voucher')}>
                                    <i class="fa-sharp fa-light fa-ticket"></i>
                                    <span>Chọn Voucher</span>
                                </div>
                                <button className={cx('add_voucher')} onClick={handleChooseVoucher}>
                                    Chon hoặc nhập mã voucher
                                </button>
                            </div>
                            <div className={cx('pay')}>
                                <span className={cx('tit')}>{`Tổng thanh toán (${
                                    checkLogin === 'true' ? countProductDB : countProduct
                                } sản phẩm)`}</span>
                                <div className={cx('price')}>
                                    <div className={cx('total_price')}>
                                        <ins className={cx('pr')}>
                                            {(checkLogin === 'true' ? totalPriceDB : countPrice).toLocaleString(
                                                'vi-VN',
                                            )}
                                            đ
                                        </ins>
                                        <Tippy
                                            interactive
                                            placement="top"
                                            theme={'light'}
                                            content={
                                                <div className={cx('info')}>
                                                    <h4 style={{ fontSize: '17px' }}>Chi tiết khuyến mãi</h4>
                                                    <ul>
                                                        <li
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <span>Tổng tiền hàng</span>
                                                            <ins style={{ color: '#ff4500' }}>
                                                                {(checkLogin === 'true'
                                                                    ? totalPriceDB
                                                                    : countPrice
                                                                ).toLocaleString('vi-VN')}
                                                                đ
                                                            </ins>
                                                        </li>
                                                        <li
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <span>Voucher giảm giá</span>
                                                            <ins style={{ color: '#ff4500' }}>0đ</ins>
                                                        </li>
                                                        <li
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <span>Tổng số tiền</span>
                                                            <ins style={{ color: '#ff4500' }}>
                                                                {(checkLogin === 'true'
                                                                    ? totalPriceDB
                                                                    : countPrice
                                                                ).toLocaleString('vi-VN')}
                                                                đ
                                                            </ins>
                                                        </li>
                                                        <li>
                                                            <p>Số tiền cuối cùng phải thanh toán</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            }
                                        >
                                            <i class="fa-solid fa-caret-up"></i>
                                        </Tippy>
                                    </div>
                                    <p>Tiết kiệm: </p>
                                </div>
                            </div>
                            <button className={cx('btn-buy')} onClick={() => handlePurchase()}>
                                Mua hàng
                            </button>
                        </div>
                    </div>
                </div>
                {/* end */}
            </div>
            {/* xử lý chọn mã giảm giá */}
            <div className={cx('choose_voucher', `${!showVoucher ? 'hide_voucher' : ''}`)}>
                <div className={cx('wrapper_voucher')}>
                    <div className={cx('enter_code')}>
                        <input placeholder="Nhập mã giảm giá nếu có" />
                    </div>
                    <div className={cx('choose')}></div>
                    <div className={cx('action')}>
                        <button className={cx('prev')} onClick={handleChooseVoucher}>
                            Trở lại
                        </button>
                        <button className={cx('ok')}>Chọn</button>
                    </div>
                </div>
            </div>
            <div className={cx('background', `${!showVoucher ? 'hide_voucher' : ''}`)}></div>
            {/* xác thực thanh toán */}
            <div className={cx('agree_to_pay', `${!showPayCK ? 'pay_hide' : ''}`)}>
                <div className={cx('wrapper')}>
                    <button className={cx('close')} onClick={handlePayClose}>
                        Close
                    </button>
                    <button className={cx('next')} onClick={handlePayNext}>
                        Tiếp tục
                    </button>
                </div>
            </div>
            {/*  */}
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

export default ShoppingCart;
