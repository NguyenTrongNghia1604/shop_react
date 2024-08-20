//
import Header from '../Componet/Header';
export default function Main({ children }) {
    return (
        <div className="main">
            <header className="header">
                <Header />
            </header>
            <div className="container" style={{ marginTop: '56px' }}>
                {children}
            </div>
        </div>
    );
}
