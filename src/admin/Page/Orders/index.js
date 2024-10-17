//
// import Tippy from '@tippyjs/react/headless';
// import 'tippy.js/dist/tippy.css'; // optional for styling
import restfulApi from '../../../restfulApi';
//
import classNames from 'classnames/bind';
import style from './Order.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(style);
function Orders() {
    const [show, setShow] = useState({});

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const res = await restfulApi.ordersDB();
            if (res && res.data && res.data.EC === 0) {
                setOrders(res.data.DT);
            }
        };
        getOrders();
    }, []);

    const handleStatus = async (id, e) => {
        try {
            console.log('check id', id, e);
            const res = await restfulApi.updateOrderDB(id, e);
            if (res && res.data && res.data.EC === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('order')}>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserID</th>
                        <th scope="col">ShoppingCartID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                        <th scope="col">Payment_status</th>
                        <th scope="col">Payment_method</th>
                        <th scope="col">Trading_hours</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => {
                        const indexs = index + 1;
                        return (
                            <tr>
                                <th scope="row">{indexs}</th>
                                <td>{item.user_id}</td>
                                <td>{item.shopping_cart_id}</td>
                                <td>{item.amount}</td>
                                <td>{item.price}</td>
                                <td className={cx('status')}>
                                    {item.payment_status}{' '}
                                    <i
                                        onClick={() =>
                                            setShow((prev) => {
                                                return { ...prev, [indexs]: !prev[indexs] };
                                            })
                                        }
                                        className="fa-sharp fa-solid fa-caret-down"
                                    ></i>
                                    {show[indexs] && (
                                        <div className={cx('confirm-status')}>
                                            <ul>
                                                <li onClick={() => handleStatus(item.id, 'Đang xử lý...')}>
                                                    <span>{item.payment_status}</span>
                                                </li>
                                                <li onClick={() => handleStatus(item.id, 'Đã thanh toán')}>
                                                    <span>Đã thanh toán</span>
                                                </li>
                                                <li onClick={() => handleStatus(item.id, 'Đang vận chuyển')}>
                                                    <span>Đang vận chuyển</span>
                                                </li>
                                                <li onClick={() => handleStatus(item.id, 'Đã giao')}>
                                                    <span>Đã giao</span>
                                                </li>
                                                <li onClick={() => handleStatus(item.id, 'Đã hủy')}>
                                                    <span>Đã hủy</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                                <td>{item.payment_method}</td>
                                <td>{item.trading_hours}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
