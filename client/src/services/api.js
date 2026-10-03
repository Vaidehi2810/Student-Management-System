import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});


export const getTasks = () => {
    return API.get("/tasks");
};


export const getTask = (id) => {
    return API.get(`/tasks/${id}`);
};


export const addTask = (task) => {
    return API.post("/tasks", task);
};


export const updateTask = (id, task) => {
    return API.put(`/tasks/${id}`, task);
};


export const deleteTask = (id) => {
    return API.delete(`/tasks/${id}`);
};


export const registerUser = (user) => {
    return API.post("/users/register", user);
};


export const loginUser = (user) => {
    return API.post("/users/login", user);
};