import { useState } from "react";

/*
  Reuseable Hook for state handling
*/
export default useApi = (apiFunc) => {
  /*
    * @params:
        apiFunc: the api http request function
        
  */
  const [data, setData] = useState([]); // useState([]) --> initialize to empty array
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request to the server
  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};
