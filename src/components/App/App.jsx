import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

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

  const handleUpdateAvatar = async (data) => {
    await api
      .setUserAvatar(data)
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

  /* creo el useState para el estado de las cards */
  const [cards, setCards] = useState([]);

  /* useEfect para pedir los datos a la api*/
  useEffect(() => {
    api.getCardList().then((datos) => {
      setCards(datos);
    });
  }, []);

  /* funcion para modificar el like de la card */
  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  /** funcion para eliminar una card */

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((deletedCard) => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  const handleAddPlaceSubmit = async (data) => {
    await api
      .addCard(data)
      .then((newCard) => {
        // ...agregar newCard a cards...
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
