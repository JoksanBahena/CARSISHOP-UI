import axios from "axios"
import.meta.env.BASE_URL

const API_URL = "http://localhost:8080/api/categories"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTE5MTg2MTIsImV4cCI6MTcxMjAwNTAxMn0.wPXvJoKzurkAFiMfOQYI2_TDsudM-cpX3sY_rEeSq34"
export const createCategory = async (name) => {
  const url = `${API_URL}/`
  console.log("url", url)
  const data = {
    name: name
  }
  console.log("data", data)
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log("response", response.data)
  } catch (error) {
    throw new Error("Error al crear la categoria" + error)
  }
}


export const findAllCategories = async (page, limit) => {
  const url = `${API_URL}/find-all`

  const data = {
    value: "",
    paginationType: {
      filter: "name",
      sortBy: "name",
      order: "asc",
      page: page.toString(),
      limit: limit ? limit.toString() : "10"
    }
  }
  console.log("data", data)
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error("Error al obtener las categorías: " + error)
  }
}
