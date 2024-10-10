//
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Button.module.scss';
const cx = classNames.bind(style);
export const Button = ({ children, clasName, onClick, href, to, type }) => {
    let Comp = 'button';
    const props = {
        clasName,
        onClick,
        type,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = Comp;
        Link = 'a';
    }
    return (
        <Comp {...props} className={cx('button')}>
            {children}
        </Comp>
    );
};
