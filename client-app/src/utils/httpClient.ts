import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:9000/api",
});

export default httpClient;