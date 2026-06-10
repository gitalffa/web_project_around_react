import { useContext } from "react";

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
/*importo el contexto del usuario */
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
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
      {/* <section className="weather" aria-label="Clima actual">
        <h2 className="weather__title">Clima en Tepic</h2>
        <p className="weather__status">Cargando…</p>
      </section> */}
      {/* <!-- fin api weather --> */}
      {/* <!-- api NASA --> */}
      {/* <section className="nasa" aria-label="NASA APOD">
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
      </section> */}
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
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
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
