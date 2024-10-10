//
import Header from '../Componet/Header';
import Footer from '../Componet/Footer';
export default function Main({ children }) {
    return (
        <div className="main">
            <header className="header">
                <Header />
            </header>
            <div className="container" style={{ marginTop: '112px' }}>
                {children}
            </div>
            <footer style={{ marginTop: '20px' }}>
                <Footer />
            </footer>
        </div>
    );
}
