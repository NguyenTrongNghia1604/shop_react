import carousel from '../../../assets/carousel';
//
import classNames from 'classnames/bind';
import style from './Carousel.module.scss';
const cx = classNames.bind(style);
function Carousel() {
    return (
        <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                ></button>
            </div>
            <div className={cx('carousel-inner', 'carousel-wrapper')}>
                <div className="carousel-item active">
                    <img src={carousel.a1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={carousel.a2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={carousel.a3} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={carousel.a4} className="d-block w-100" alt="..." />
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
