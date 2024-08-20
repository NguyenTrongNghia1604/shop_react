//
import classNames from 'classnames/bind';
import style from './Home.module.scss';
const cx = classNames.bind(style);
export default function Home() {
    return <h1 className={cx('home')}>Đây là TRang Home</h1>;
}
