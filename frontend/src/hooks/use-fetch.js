import { useState, useEffect } from "react";

//Custom hooks để fetch api
function useFetch(endpoint) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApiTrending = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies${endpoint}?token=8qlOkxz4wq`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };

    fetchApiTrending();
  }, [endpoint]);

  return data;
}

export default useFetch;
