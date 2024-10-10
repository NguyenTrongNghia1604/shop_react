//
import useDebounce from '../../Hook/Debounce';
//
// import { request } from '../../Request/Request';
// //
// import SearchProducts from '../../Page/SearchProducts';
//
import restfulApi from '../../restfulApi';
//
import { useNavigate } from 'react-router-dom';
//
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional for styling
//
import classNames from 'classnames/bind';
import style from './Search.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);
function Search() {
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [showResualt, setShowResualt] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [restApi, setRestApi] = useState([]);

    //
    const deboun = useDebounce(search, 1000);

    useEffect(() => {
        if (!deboun.trim()) {
            return;
        }
        setShowLoading(true);
        const fetchData = async () => {
            let res = await restfulApi.getKeyWword();
            if (res && res.data && res.data.EC === 0) {
                let result = res.data.DT;
                const regex = new RegExp(deboun, 'i'); // "i" để không phân biệt chữ hoa, chữ thường
                let test = result.filter((item) => regex.test(item.keyword || item));
                setRestApi(test);
                // sau khi lấy dữ liệu thành công thì nó sẽ ngường lodaing
                setShowLoading(false);
            }
        };

        fetchData();

        // request({
        //     method: 'get',
        //     url: 'users/search',
        //     params: {
        //         q: deboun,
        //         type: 'less',
        //     },
        // })
        //     .then((res) => {
        //         setRestApi(res.data.data);
        //         setShowLoading(false);
        //     })
        //     .catch((e) => console.log(e));
    }, [deboun]);
    const searchOnchange = (e) => {
        const values = e.target.value; // Kiểm tra nếu `e` tồn tại
        if (values === '') {
            setRestApi([]);
        }
        setSearch(values);
    };
    const handleClear = () => {
        setSearch('');
        setRestApi([]);
    };

    const onClickOut = () => {
        setShowResualt(false);
        //setRestApi([]);
    };

    const handleClick = () => {
        setShowResualt(true);
    };

    // xử lý tìm kiếm sản phẩm
    const handleSearch = (search) => {
        const trimmedQuery = search.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
        const convertedQuery = trimmedQuery.replace(/\s+/g, '+'); // Thay thế khoảng trắng bằng '+'
        navigate(`/search-product?search_query=${convertedQuery}`, { state: trimmedQuery });
    };
    return (
        <>
            <div className={cx('search')}>
                <Tippy
                    interactive
                    visible={showResualt && search.length > 0}
                    placement="bottom"
                    render={(attrs) => (
                        <div className={cx('resualt')} tabIndex="-1" {...attrs}>
                            <h3>Search Reasualt</h3>
                            <ul>
                                {restApi.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => handleSearch(item.keyword)}>
                                            <i class="fa-regular fa-magnifying-glass"></i>
                                            {item.keyword}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    onClickOutside={onClickOut}
                >
                    <div className={cx('search-resualt')}>
                        <input
                            value={search}
                            onChange={(e) => searchOnchange(e)}
                            onFocus={handleClick}
                            placeholder="Tìm kiếm"
                        />
                        <div className={cx('action')}>
                            {!showLoading && search ? (
                                <div className={cx('clear')} onClick={handleClear}>
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            ) : (
                                showLoading && (
                                    <div className={cx('loading')}>
                                        <i class="fa-regular fa-spinner"></i>
                                    </div>
                                )
                            )}
                            <button className={cx('search-btn')} onClick={() => handleSearch(search)}>
                                <i class="fa-regular fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </Tippy>
            </div>
        </>
    );
}

export default Search;
