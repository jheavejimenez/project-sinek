import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function createEvaluation(
    managementEmail,
    teamName,
    evaluationLink,
    members,

) {
    const data = {managementEmail, teamName, evaluationLink, members,}
    console.log(data);

    return await axios.post(`${ApiConfig.url}/api/evaluations`, data);
}

export async function deleteEvaluation(
    id,

  ) {
    return await axios.delete(`${ApiConfig.url}/api/evaluations/${id}`);
  }
  
  export async function updateEvaluation(
    id,
    managementEmail,
    teamName,
    evaluationLink,
    members,

  ) {
    const data = {managementEmail, teamName, evaluationLink, members,}
    console.log(data);
  
    return await axios.put(`${ApiConfig.url}/api/evaluations/${id}`, data);
  }
