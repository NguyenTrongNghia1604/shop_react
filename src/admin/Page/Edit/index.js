//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
// đường dẫn đến trang khi thành công
import { useNavigate, useLocation } from 'react-router-dom';
//
import { useEffect, useState } from 'react';
import restfulApi from '../../../restfulApi';
//
import classNames from 'classnames/bind';
import style from './Edit.module.scss';
const cx = classNames.bind(style);
function Edit() {
    const navigate = useNavigate();

    // lấy dữ liều
    const location = useLocation();
    const item = location.state?.item; // Kiểm tra nếu dữ liệu tồn tại
    //
    const [getCategory, setGetCategory] = useState([]);
    //
    const [title, setTitle] = useState(item.title);
    const [price, setPrice] = useState(item.price);
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [image, setImage] = useState(null);
    const [image_path, setImage_path] = useState([]);
    const [priceKm, setPriceKm] = useState(item.priceKm);
    const [count, setCount] = useState(item.count);
    const [url, setUrl] = useState(item.url);
    const [type, setType] = useState(item.type);

    useEffect(() => {
        handleGetCategory();
    }, []);
    const handleGetCategory = async () => {
        let res = await restfulApi.categoryDB();
        if (res && res.data && res.data.EC === 0) {
            setGetCategory(res.data.DT);
        }
    };

    // Sử dụng state để lưu trữ trạng thái kiểm tra
    const [ck, setCk] = useState({
        title: true,
        price: true,
        description: true,
        category: true,
        image: true,
        image_path: true,
        count: true,
        url: true,
        type: true,
    });

    const check = () => {
        let valid = true;
        if (title === '') {
            setCk((prev) => ({ ...prev, title: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, title: true }));
        }

        if (price === '') {
            setCk((prev) => ({ ...prev, price: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, price: true }));
        }

        if (description === '') {
            setCk((prev) => ({ ...prev, description: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, description: true }));
        }
        if (category === '') {
            setCk((prev) => ({ ...prev, category: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, category: true }));
        }

        if (image === null) {
            setCk((prev) => ({ ...prev, image: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, image: true }));
        }

        if (image_path.length === 0) {
            setCk((prev) => ({ ...prev, image_path: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, image_path: true }));
        }

        if (count === '') {
            setCk((prev) => ({ ...prev, count: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, count: true }));
        }

        if (url === '') {
            setCk((prev) => ({ ...prev, url: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, url: true }));
        }
        if (type === '') {
            setCk((prev) => ({ ...prev, type: false }));
            valid = false;
        } else {
            setCk((prev) => ({ ...prev, type: true }));
        }
        return valid;
    };

    const handleImagePathChange = (e) => {
        setImage_path(Array.from(e.target.files)); // Chuyển đổi FileList thành mảng
    };

    const handleUpdateProduct = async () => {
        if (check()) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('image', image); // Đảm bảo tên trường là 'image'
            formData.append('priceKm', priceKm);
            formData.append('url', url);
            formData.append('type', type);
            // Append tất cả các file review
            for (const file of image_path) {
                formData.append('image_path', file); // Thêm từng file review
            }
            console.log('check');
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(key, value.name); // Log tên file thay vì toàn bộ đối tượng File
                } else {
                    console.log(key, value);
                }
            }

            let res = await restfulApi.updateProductsDB(formData, item.id);
            if (res && res.data && res.data.EC === 0) {
                toast.success(res.data.EM);
                navigate('/admin/123');
            } else {
                toast.error(res.data.EM);
            }
        }
    };

    const handleBlur = () => {
        check();
    };
    return (
        <>
            <div className={cx('add')}>
                <h3>Edit Products</h3>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className={cx('form-label')}>
                        Title
                    </label>
                    <input
                        value={title}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className={cx('form-control')}
                        id="exampleFormControlInput1"
                        placeholder="Title"
                        onBlur={handleBlur}
                    />
                    {ck.title ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className={cx('form-label')}>
                        Price
                    </label>
                    <input
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        className={cx('form-control')}
                        id="exampleFormControlInput1"
                        placeholder="Price"
                        onBlur={handleBlur}
                    />
                    {ck.price ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className={cx('form-label')}>
                        Description
                    </label>
                    <textarea
                        value={description}
                        className={cx('form-control')}
                        onChange={(e) => setDescription(e.target.value)}
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onBlur={handleBlur}
                    ></textarea>
                    {ck.description ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">
                        Chọn thẻ loại:
                    </label>
                    <br />
                    <select
                        id="fruit"
                        className={cx('category')}
                        name="fruit"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option selected>Thể loại</option>
                        {getCategory.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>
                    {ck.category ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className={cx('form-label')}>
                        Images
                    </label>
                    <br />
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])} // Lưu trữ File object
                        id="file-upload"
                        onBlur={handleBlur}
                    />
                    <br />
                    <img
                        src={image === null ? `http://localhost:8081/images/${item.image}` : URL.createObjectURL(image)}
                    />
                    {ck.image ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className={cx('form-label')}>
                        Images Review
                    </label>
                    <br />
                    <input
                        type="file"
                        name="image_path"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImagePathChange(e)} // Sử dụng hàm mới
                        id="file-upload"
                        onBlur={handleBlur}
                    />
                    <br />
                    {ck.image_path ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">
                        PriceKM
                    </label>
                    <input
                        value={priceKm}
                        type="number"
                        onChange={(e) => setPriceKm(e.target.value)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="PriceKM"
                        onBlur={handleBlur}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">
                        Count
                    </label>
                    <input
                        value={count}
                        type="number"
                        onChange={(e) => setCount(e.target.value)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="PriceKM"
                        onBlur={handleBlur}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">
                        Url
                    </label>
                    <input
                        value={url}
                        type="text"
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="PriceKM"
                        onBlur={handleBlur}
                    />
                    {ck.url ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">
                        Type:
                    </label>
                    <br />
                    <select
                        id="fruit"
                        name="fruit"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        onBlur={handleBlur}
                    >
                        <option selected>Thể loại</option>
                        <option value="1">Áo</option>
                        <option value="4">Quần</option>
                        <option value="2">Phụ kiện</option>
                        <option value="3">Giầy dép</option>
                    </select>
                    {ck.type ? '' : <div className={cx('text-danger')}>errr</div>}
                </div>
                <div className={cx('mb-3', 'mb3_create')}>
                    <button className={cx('btn btn-primary', 'create')} onClick={handleUpdateProduct}>
                        Update
                    </button>
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

export default Edit;
