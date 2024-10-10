//
import { useEffect, useState } from 'react';
import HeaderAdmin from '../Component/Header';
import SidebarAdmin from '../Component/Sidebar';
import restfulApi from '../../../restfulApi';

function MainLayoutAdmin({ children }) {
    // const [check, setCheck] = useState(null);
    // let timeout;
    // const resetTimer = () => {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //         // Xóa cookie khi không có thao tác trong 15 phút
    //         document.cookie = 'adminStatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    //         console.log('Cookie đã bị xóa do không có thao tác.');
    //     }, 15 * 60 * 1000); // 15 phút
    // };

    // // Gọi resetTimer mỗi khi có sự kiện người dùng
    // window.onload = resetTimer;
    // document.onmousemove = resetTimer;
    // document.onkeypress = resetTimer;
    // // Bạn có thể thêm các sự kiện khác tùy theo nhu cầu
    // const getCookie = (name) => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) {
    //         return decodeURIComponent(parts.pop().split(';').shift());
    //     }
    //     return null;
    // };

    // useEffect(() => {
    //     const status = getCookie('adminStatus');

    //     if (status) {
    //         setCheck(true);
    //     } else {
    //         setCheck(false);
    //         window.location.href = '/admin/login'; // Điều hướng đến trang đăng nhập nếu không có cookie
    //     }

    //     // Gọi resetTimer mỗi khi có sự kiện người dùng
    //     window.onload = resetTimer;
    //     document.onmousemove = resetTimer;
    //     document.onkeypress = resetTimer;

    //     // Dọn dẹp sự kiện khi component unmount
    //     return () => {
    //         clearTimeout(timeout);
    //         window.onload = null;
    //         document.onmousemove = null;
    //         document.onkeypress = null;
    //     };
    // }, []);
    // const [roleAdmin, setRoleAdmin] = useState([]);
    // useEffect(() => {
    //     const check = async () => {
    //         let res = await restfulApi.versionLogin();
    //         if (res && res.data && res.data.EC === 0) {
    //             setRoleAdmin(res.data.DT);
    //             console.log('check role', res.data.DT);
    //         }
    //     };
    //     check();
    // }, []);
    if (localStorage.getItem('role') === '1' && localStorage.getItem('token')) {
        return (
            <>
                <div className="main_admin">
                    <HeaderAdmin />
                    <div className="wrapper_admin">
                        <SidebarAdmin />
                        <div className="main" style={{ marginTop: '72px' }}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        window.location.href = '/admin/login';
    }
}
export default MainLayoutAdmin;
