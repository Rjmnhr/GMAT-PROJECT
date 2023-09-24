import axios from "axios";
import { useEffect } from "react";
import { useApplicationContext } from "../../app-context";

const GetAllQuestions = () => {
  const { setQuestions } = useApplicationContext();
  useEffect(() => {
    axios
      .get("http://localhost:8003/api/gmat/data")
      .then(async (response) => {
        const resultData = await response.data;

        console.log(resultData);
        setQuestions(resultData);
      })
      .catch((err) => console.log("error", err));
    //eslint-disable-next-line
  }, []);
};

export default GetAllQuestions;
