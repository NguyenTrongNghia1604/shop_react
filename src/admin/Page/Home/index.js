//
// đường dẫn đến trang khi thành công
import { useNavigate } from 'react-router-dom';
//
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useRef } from 'react';
//
import restfulApi from '../../../restfulApi';
//
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import ToastConfirm from '../../Layout/Component/ToastConfirm';
const cx = classNames.bind(style);
function HomeAdmin() {
    const navigate = useNavigate();

    const clickRef = useRef(null);

    const [getProduct, setProducts] = useState([]);
    // phân trang
    // tạo pages = 1
    const [currentPages, setCurrentPages] = useState(1);
    // tạo limit = 2
    const [currentLimit, setCurrentLimit] = useState(10);
    // tạo totalPages ban đầu = 0
    const [totalPages, setTotalPages] = useState(20);

    //
    const [show, setShow] = useState(true);
    const [id, setId] = useState('');

    useEffect(() => {
        handleGetProducts();
    }, [currentPages]);
    const handleGetProducts = async () => {
        let res = await restfulApi.paginationProductsDB(currentPages, currentLimit);
        if (res && res.data && res.data.EC === 0) {
            console.log('check phân trang', res.data.DT);
            setTotalPages(res.data.DT.totalPages);
            setProducts(res.data.DT.products);
        }
    };

    // phân trang (Pagination)

    // handleEdit
    const handleEdit = (item) => {
        navigate('/admin/edit', { state: { item } });
    };

    // handleDelete
    const handleDelete = (id) => {
        setShow((prev) => !prev);
        setId(id);
    };

    // phân trang
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setCurrentPages(+event.selected + 1);
        clickRef.current.focus();
    };
    return (
        <>
            <div className={cx('home_admin')}>
                <a href="/admin/add" className={cx('btn btn-primary', 'add')}>
                    Thêm mới
                </a>
                <h1>Home</h1>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">CategoryID</th>
                            <th scope="col">Image</th>
                            <th scope="col">PriceKM</th>
                            <th scope="col">Count</th>
                            <th scope="col">Url</th>
                            <th scope="col">Type</th>

                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getProduct.map((item, index) => {
                            const indexs = index + 1;
                            return (
                                <>
                                    <tr key={index}>
                                        <th scope="row">{indexs}</th>
                                        <td className={cx('title')}>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td className={cx('desc')}>{item.description}</td>
                                        <td>{item.categoryId}</td>
                                        <td className={cx('images')}>
                                            <img
                                                src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.image}`}
                                                alt="error"
                                            />
                                        </td>
                                        <td>{item.priceKm}</td>
                                        <td>{item.count}</td>
                                        <td>{item.url}</td>
                                        <td>{item.type}</td>
                                        <td className={cx('action')}>
                                            <button className={cx('delete')} onClick={() => handleDelete(item.id)}>
                                                <i class="fa-light fa-trash"></i>
                                            </button>
                                            <button className={cx('edit')} onClick={() => handleEdit(item)}>
                                                <i class="fa-thin fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Phân Trang */}
            <div className={cx('pagination-video')}>
                {/* phân trang */}
                {totalPages && totalPages > 0 && (
                    <div className={cx('user-footer')} ref={clickRef}>
                        {/* <Items currentItems={currentItems} /> */}
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="<"
                            pageClassName={cx('page-item')}
                            pageLinkClassName={cx('page-link')}
                            previousClassName={cx('page-item')}
                            previousLinkClassName={cx('page-link')}
                            nextClassName={cx('page-item')}
                            nextLinkClassName={cx('page-link')}
                            breakLabel="..."
                            breakClassName={cx('page-item')}
                            breakLinkClassName={cx('page-link')}
                            containerClassName={cx('pagination')}
                            activeClassName={cx('active')}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                )}
            </div>

            {show ? '' : <ToastConfirm id={id} />}
        </>
    );
}

export default HomeAdmin;
