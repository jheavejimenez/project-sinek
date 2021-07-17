import * as axios from "axios";
import ApiConfig from "./ApiConfig"

export async function createMember(
    memberName,
    memberEmail,
    evaluationForm,

) {
    const data = {memberName, memberEmail, evaluationForm,}
    console.log(data);
    
    return await axios.post(`${ApiConfig.url}/api/members`, data);
}

export async function deleteMembers(
    id,

) {
    return await axios.delete(`${ApiConfig.url}/api/members/${id}`);
}

export async function updateMembers(
    id,
    memberName,
    memberEmail,
    evaluationForm,

) {
    const data = {memberName, memberEmail, evaluationForm,}
    console.log(data);
  
    return await axios.put(`${ApiConfig.url}/api/members/${id}`, data);
}
