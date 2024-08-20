//
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Layout/Main';
import { publicConfig } from './Router/router';
function App() {
    return (
        <div className="App">
            <Router>
                <div className="wrapper-home">
                    <Routes>
                        {publicConfig.map((router, index) => {
                            const Page = router.comment;
                            return (
                                <Route
                                    key={index}
                                    path={router.path}
                                    element={
                                        <Main>
                                            <Page />
                                        </Main>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
