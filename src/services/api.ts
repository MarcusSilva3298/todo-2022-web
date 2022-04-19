import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://todo-2022.herokuapp.com/todos'
})
