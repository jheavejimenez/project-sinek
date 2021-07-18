import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function createEvaluation(evaluationData) {

    return await axios.post(`${ApiConfig.url}/api/evaluation/`, evaluationData);
}
