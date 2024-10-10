
import React, { useEffect, useRef } from 'react';

const niceditJsUrl = 'http://js.nicedit.com/nicEdit-latest.js';
const niceditCssUrl = 'https://cdn.nicedit.com/nicEdit.css';

const NicEditComponent = ({ value, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        // Thêm NicEdit CSS vào trang
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = niceditCssUrl;
        document.head.appendChild(link);

        // Thêm NicEdit JS vào trang
        const script = document.createElement('script');
        script.src = niceditJsUrl;
        script.onload = () => {
            if (window.nicEditors) {
                const nicEditor = new window.nicEditors.findEditor(editorRef.current);
                nicEditor.setContent(value);
                nicEditor.onChange = () => onChange(nicEditor.getContent());
            } else {
                console.error('NicEdit is not loaded');
            }
        };
        script.onerror = () => {
            console.error('Failed to load NicEdit script');
        };
        document.head.appendChild(script);

        // Xóa NicEdit và CSS khi component unmount
        return () => {
            const nicEditor = window.nicEditors ? window.nicEditors.findEditor(editorRef.current) : null;
            if (nicEditor) {
                nicEditor.remove();
            }
            document.head.removeChild(link);
            document.head.removeChild(script);
        };
    }, [value, onChange]);

    return (
        <div>
            <textarea ref={editorRef} />
        </div>
    );
};

export default NicEditComponent;
