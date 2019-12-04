/* eslint-disable */
import axios from "axios"

export const axiosHttp = {
    test:function () {
        return axios.get("http://localhost:8080/test")
    }
}
