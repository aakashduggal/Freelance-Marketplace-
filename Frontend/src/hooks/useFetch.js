import { useState } from "react";

const useFetch = ()=>{

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

const sendRequest = async (url, options)=>{

  setLoading(true)
  setError(null)

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if(!response.ok){
        throw new Error("Failed to Fetch Data")
    }

    setLoading(false)
    return data

  } catch (error) {
    setLoading(false)
    setError(error.message)

    throw error
  }
}

  return {loading, error, sendRequest}
}

export default useFetch
