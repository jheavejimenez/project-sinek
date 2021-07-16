import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/evaluation",
    headers: {
        "Content-type": "application/json"
    }
});