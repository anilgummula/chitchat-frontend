import {toast} from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'bottom-right',
        theme: 'dark'
         
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: "bottom-right",
        theme :'dark'
    });
};