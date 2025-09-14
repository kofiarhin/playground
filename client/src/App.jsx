import { useEffect } from "react";
import "./app.styles.scss";
import { BASE_URL } from "./constants/constants";

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        console.log("connected to server: ", BASE_URL);
      }
    };

    getData();
  }, []);
  return (
    <div id="app">
      <h1 className="heading center">FullStack Template</h1>
    </div>
  );
};

export default App;
