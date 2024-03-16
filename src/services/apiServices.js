import axios from "axios";

export const getService = async (url, params = {}, options = {}) => {
    try {
        const response = await axios({
            url: `${import.meta.env.VITE_API_SERVER}/${url}`,
            method: 'GET',
            params,
            ...options
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};