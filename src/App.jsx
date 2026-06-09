import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";

import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const handleUpdateUser = async (data) => {
    await api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    api.getUserInfo().then((datos) => {
      setCurrentUser(datos);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
