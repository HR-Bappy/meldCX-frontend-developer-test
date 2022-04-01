
import Axios from "../../Axios";
import { setCookies } from "../Cookies/LocalStorage";

export const onSubmitLogin = async (values) => {
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/login`, values);
    if (result.status === 200) {
        setCookies('token',result.data)
    }
    return result
}
export const onSubmitNotify = async (values) => {
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/notify`, values);
    return result
}