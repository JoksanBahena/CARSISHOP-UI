import axios from "axios"

const API_URL = "http://localhost:8080/api/categories"
export const createCategory = async (name) => {
  const url = `${API_URL}/`
  console.log("url", url)
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJzdWIiOiJtYW55QGdtYWlsLmNvbSIsImlhdCI6MTcxMTg1MzAwOCwiZXhwIjoxNzExOTM5NDA4fQ.-axacIVOoxN2OH8Dwos-gDv-SyvmawqPnS907pKWa3U"
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
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJzdWIiOiJtYW55QGdtYWlsLmNvbSIsImlhdCI6MTcxMTg1MzAwOCwiZXhwIjoxNzExOTM5NDA4fQ.-axacIVOoxN2OH8Dwos-gDv-SyvmawqPnS907pKWa3U"
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
