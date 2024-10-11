//
//import { Fragment } from 'react';
//
import restfulApi from './restfulApi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Fragment } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import Main from './Layout/Main';
import MainLayoutAdmin from './admin/Layout/MainLayout';
import { publicConfig, privateConfig } from './Router/router';
import { useEffect, useState } from 'react';
// Tạo một component wrapper để sử dụng các hook của React Router
import { useNavigate } from 'react-router-dom';
function AuthWrapper({ children }) {
    // const location = useLocation();
    const navigate = useNavigate();
    // client
    useEffect(() => {
        // Đọc JSON cookie
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return decodeURIComponent(parts.pop().split(';').shift());
            }
            return null;
        };
        const status = getCookie('status');
        const userId = getCookie('userId');
        if (status === 'true') {
            return;
        } else {
            const checkAuth = async () => {
                try {
                    const res = await restfulApi.checkLogin(userId);
                    if (res && res.data && res.data.EC === 0) {
                        document.cookie = `userId=${encodeURIComponent(res.data.DT.userId)}`;
                        document.cookie = `fullname=${encodeURIComponent(res.data.DT.fullName)}`;
                        document.cookie = `images=${encodeURIComponent(res.data.DT.images)}`;
                        document.cookie = `status=${encodeURIComponent(res.data.ST)}`;
                        console.log('Còn phiên đăng nhập');
                    }
                } catch (error) {
                    // Hoặc xóa tất cả cookie (nếu cần)
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i];
                        const eqPos = cookie.indexOf('=');
                        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
                    }
                    // Xóa những cookie cần thiết
                    // const cookiesToDelete = ['userId', 'fullname', 'images', 'status']; // Danh sách cookie cần xóa
                    // cookiesToDelete.forEach((cookie) => {
                    //     document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                    // });
                    //console.log('Đã xóa các cookie cần thiết');
                }
            };
            checkAuth();
        }
    }, [navigate]);

    return children;
}

function App() {
    return (
        <div className="App">
            <Router>
                <div className="wrapper-home">
                    <Routes>
                        {publicConfig.map((router, index) => {
                            const Page = router.comment;
                            let Layout = Main;
                            if (router.layout) {
                                Layout = router.layout;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <Routes>
                        {privateConfig.map((router, index) => {
                            const Page = router.comment;
                            let Layout = MainLayoutAdmin;
                            if (router.layout) {
                                Layout = router.layout;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
                <AuthWrapper />
            </Router>
        </div>
    );
}

export default App;
