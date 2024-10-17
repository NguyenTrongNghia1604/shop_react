//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//;
import restfulApi from '../../../../restfulApi';
//
import classNames from 'classnames/bind';
import style from './ToastConfirm.module.scss';
import { useState } from 'react';
const cx = classNames.bind(style);
function ToastConfirm({ id }) {
    const [show, setShow] = useState(true);
    const handleNext = async () => {
        let res = await restfulApi.deleteProductDB(id);
        if (res && res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            setShow(true);
            window.location.reload();
        }
    };
    const handleClose = () => {
        setShow((prev) => !prev);
    };
    return (
        <>
            <div className={cx('toast-confirm', show ? '' : 'hide')}>
                <div className={cx('info')}>
                    <div className={cx('tit')}>
                        <h4>Bạn Có Chắc Chắn Muốn Xóa id {id}!</h4>
                        <button onClick={handleClose}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className={cx('action')}>
                        <button className={cx('next')} onClick={() => handleNext()}>
                            Next
                        </button>
                        <button className={cx('close')} onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('background', show ? '' : 'hide')}></div>
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

export default ToastConfirm;
