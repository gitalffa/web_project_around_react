import { useEffect, useState, useContext } from "react";

import avatar from "../../images/Avatar.png";
import editIcon from "../../images/editar.png";
import addIcon from "../../images/add-image.png";

/* Importo los tres forms que voy a meter al popup */
import EditAvatar from "./components/form/EditAvatar/EditAvatar";
import EditProfile from "./components/form/EditProfile/EditProfile";
import NewCard from "./components/form/NewCard/NewCard";

/* importo el componente card para las imagenes */
import Card from "./components/Card/Card";

/* Importo el Popup generico */
import Popup from "./components/Popup/Popup";
import api from "../../utils/api";
/*importo el contexto del usuario */
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ popup, onOpenPopup, onClosePopup }) {
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
      .catch((error) => console.log(error));
  }

  /* agarro el dato del canal directo ( del contexto )*/
  const { currentUser } = useContext(CurrentUserContext);

  /* los tres objetos que tendran los datos del formularion que mandaremos al popup y su titulo */
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = { title: "Cambiar avatar", children: <EditAvatar /> };

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Editar avatar"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Avatar de Cousteau"
            className="profile__avatar"
          />
          <span className="profile__avatar-overlay"></span>
        </button>

        <div className="profile__id">
          <div className="profile__id-textos">
            <p className="profile__name">{currentUser.name}</p>
            <p className="profile__degree">{currentUser.about}</p>
          </div>

          <button
            className="profile__button profile-button-edit"
            type="button"
            /* usamos la funcion flecha porque al ser funcion espera que la mandes ejecutas para asi ejecutar el handler, de lo contrario el handler se ejecuta cuando abres la pagina */
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img src={editIcon} alt="button edit" />
          </button>
        </div>
        <button
          className="profile__button profile-button-add"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img src={addIcon} alt="button add" />
        </button>
      </section>
      {/* <!-- api weather  --> */}
      <section className="weather" aria-label="Clima actual">
        <h2 className="weather__title">Clima en Tepic</h2>
        <p className="weather__status">Cargando…</p>
      </section>
      {/* <!-- fin api weather --> */}
      {/* <!-- api NASA --> */}
      <section className="nasa" aria-label="NASA APOD">
        <h2 className="nasa__title">NASA: Imagen del día</h2>

        <div className="nasa__card">
          <p className="nasa__status">Cargando…</p>

          <a
            className="nasa__link"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            hidden
          >
            <img className="nasa__image" alt="NASA APOD" />
          </a>

          <h3 className="nasa__caption" hidden></h3>
          <p className="nasa__explanation" hidden></p>
        </div>
      </section>
      {/* <!-- fin api NASA --> */}
      {/* a la galeria de fotos se le cambio el section por ul ya que la tarjeta
      esta creada con li y todo li debe estar dentro de un ul u ol 
      <section className="gallery"></section> */}
      <ul className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={onOpenPopup}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </ul>
      {/* popup && (...) es un truco de JavaScript que se llama "evaluación de
      cortocircuito". Significa: "si popup ( el estado del useState ) tiene
      algún valor (no es null), entonces evalúa y renderiza lo que sigue. Si es
      null, no hagas nada". */}
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
