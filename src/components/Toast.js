import React, { useEffect } from 'react';

function Toast({ message, type }) {
    useEffect(() => {
        showBootstrapToast();
    }, []);

    const showBootstrapToast = () => {
        const toastElement = document.getElementById('liveToast');
        if (toastElement) {
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
    };

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className="toast text-black" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header bg-${type} text-white `}>
                    <img src="https://i.pngimg.me/thumb/f/720/a8bd1f9386.jpg" width="20px" className="rounded me-2" alt="hi" />
                    <strong className="me-auto">PocketNote</strong>
                    <small></small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default Toast;
