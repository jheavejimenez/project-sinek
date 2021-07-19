import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function createEvaluation(evaluationData) {
  return await axios.post(`${ApiConfig.url}/api/evaluations/`, evaluationData);
}

export async function createEvaluationAnswer(memberId, answer) {
  return await axios.post(`${ApiConfig.url}/api/members/${memberId}/answers/`, answer);
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
    members

  ) {
    const data = {managementEmail, teamName, evaluationLink, members,}
    console.log(data);
  
    return await axios.put(`${ApiConfig.url}/api/evaluations/${id}`, data);
  }

export async function evaluationMember(id) {
  return await axios.get(`${ApiConfig.url}/api/members/${id}/evaluation`);
}
