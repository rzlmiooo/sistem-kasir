import axios from "axios";
import { logout } from "../tools/logOut";
import { PUBLIC_VITE_API_DIR_PATH } from "$env/static/public";

const Axios = axios.create({
    baseURL: PUBLIC_VITE_API_DIR_PATH,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

async function postData(
    endpoint: string,
    data: any = {},
    customHeader: any = {}
) {
    try {
        console.log("REQUEST BODY:", data);
        console.log("ENDPOINT:", endpoint);
        
        const header = {
            "X-ENDPOINT": endpoint,
            "X-Custom-Header": JSON.stringify({
                "X-Level": "1",
                ...customHeader
            }),
        };
        console.log("HEADERS:", header);
        
        const response = await Axios.post("", data, {
            headers: header
        });
        
        return response;

    } catch (error: any) {

        if (error?.response?.status === 401) {
            logout();
        }

        throw error;
    }
}

export default postData;