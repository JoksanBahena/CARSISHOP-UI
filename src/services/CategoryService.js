import axios from "axios"

const API_URL = "http://localhost:8080/api/categories"
export const createCategory = async (name) => {
  const url = `${API_URL}/`
  console.log("url", url)
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJzdWIiOiJtYW55QGdtYWlsLmNvbSIsImlhdCI6MTcxMTgzNzA3MywiZXhwIjoxNzExODM4NTEzfQ.8nyS7e971BKFoGLCg6x0DKF2uy2xLpNtVbYZaFCjkJA"
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
