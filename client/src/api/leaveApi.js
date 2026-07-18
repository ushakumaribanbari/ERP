import axios from "axios";


const API_URL="https://erp-skfy.onrender.com/api/leaves";


export const getLeaves = () =>{
    return axios.get(API_URL);
};


export const createLeave = (data)=>{

    return axios.post(
        API_URL,
        data
    );

};


export const approveLeave = (id)=>{

    return axios.put(
        `${API_URL}/${id}/approve`
    );

};


export const rejectLeave = (id)=>{

    return axios.put(
        `${API_URL}/${id}/reject`
    );

};

export const getLeaveBalances = ()=>{

    return axios.get(
        `${API_URL}/balances`
    );

};