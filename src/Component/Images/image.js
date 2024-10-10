//
import images from '../../assets/Images';
// import '../assets/fontawesome.pro.6.0.0/fontawesome.pro.6.0.0.css';
import { forwardRef, useState } from 'react';
const Images = forwardRef(({ src, alt, className, ...prop }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const error = images.error;
    const handlImages = () => {
        setFallBack(error);
    };
    return <img src={src || fallBack} ref={ref} className={className} {...prop} onError={handlImages} />;
});
export default Images;
