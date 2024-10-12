//
import { useEffect, useState } from 'react';
import Images from '../../../Component/Images/image';
//
import classNames from 'classnames/bind';
import style from './Category.module.scss';
import restfulApi from '../../../restfulApi';
const cx = classNames.bind(style);
function Category() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetData = async () => {
            try {
                let res = await restfulApi.takeDataCategory();
                if (res && res.data && res.data.EC === 0) {
                    setData(res.data.DT);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetData();
    }, []);
    console.log('check data tương thích', data);
    return (
        <div className={cx('col-lg-3', 'clg3')}>
            <div className={cx('category')}>
                <h3>Phụ kiện tương thích</h3>
                <ul>
                    {data &&
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={`/detailsProduct/${item.url}?id=${item.id}`}>
                                        <Images
                                            className={cx('img')}
                                            src={`${process.env.REACT_APP_URL_BACKEND}/images/${item.image}`}
                                        />
                                        <div>
                                            <span>{item.title}</span>
                                            <ins>250.000đ</ins>
                                        </div>
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

export default Category;
