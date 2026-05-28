import { useState } from "react";

import avatar from "../../images/Avatar.png";
import editIcon from "../../images/editar.png";
import addIcon from "../../images/add-image.png";

/* Importo los tres forms que voy a meter al popup */
import EditAvatar from "./components/form/EditAvatar/EditAvatar";
import EditProfile from "./components/form/EditProfile/EditProfile";
import NewCard from "./components/form/NewCard/NewCard";

/* Importo el Popup generico */
import Popup from "./components/Popup/Popup";

function Main() {
  /* creo el useState que usare para los dar el estado a la funcion que manipula el estado de los popups */
  const [popup, setPopup] = useState(null);

  /* los tres objetos que tendran los datos del formularion que mandaremos al popup y su titulo */
  const newCardPopup = { titile: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = { title: "Cambiar avatar", children: <EditAvatar /> };

  /* funcion que abre el popup que pasamos por parametro */
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  /* funcion que cierra cualquier popup ya que el popup us generico va a cerrar cualquierra que este abierto */
  /* es decir estamos usando el mismo popup para todos los forms entonces con importa cual este abierto siempre lo cierra */

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Editar avatar"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            src={avatar}
            alt="Avatar de Cousteau"
            className="profile__avatar"
          />
          <span className="profile__avatar-overlay"></span>
        </button>

        <div className="profile__id">
          <div className="profile__id-textos">
            <p className="profile__name"></p>
            <p className="profile__degree"></p>
          </div>

          <button
            className="profile__button profile-button-edit"
            type="button"
            /* usamos la funcion flecha porque al ser funcion espera que la mandes ejecutas para asi ejecutar el handler, de lo contrario el handler se ejecuta cuando abres la pagina */
            onClick={() => handleOpenPopup(editProfilePopup)}
          >
            <img src={editIcon} alt="button edit" />
          </button>
        </div>
        <button
          className="profile__button profile-button-add"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
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
      <section className="gallery"></section>
      /* popup && (...) es un truco de JavaScript que se llama "evaluación de
      cortocircuito". Significa: "si popup tiene algún valor (no es null),
      entonces evalúa y renderiza lo que sigue. Si es null, no hagas nada". */
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
