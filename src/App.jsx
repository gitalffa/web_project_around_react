import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";

import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  /* creo el useState que usare para los dar el estado a la funcion que manipula el estado de los popups */
  const [popup, setPopup] = useState(null);

  /* funcion que abre el popup que pasamos por parametro */
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  /* funcion que cierra cualquier popup ya que el popup us generico va a cerrar cualquierra que este abierto */
  /* es decir estamos usando el mismo popup para todos los forms entonces con importa cual este abierto siempre lo cierra */

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = async (data) => {
    await api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
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
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
