import { useState } from "react";

const useFetch = ()=>{

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

const sendRequest = async (url, options)=>{

  setLoading(true)
  setError(null)

  try {
    const response = await fetch(url, options)
    
    // Check if the response is JSON or Plain Text
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if(!response.ok){
        // If it's a JSON error, it might have data.message. If it's text, it's just data.
        throw new Error(data.message || data || "Failed to Fetch Data")
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
