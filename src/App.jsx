import logo from "./images/Vector.png";
import avatar from "./images/Avatar.png";
import editIcon from "./images/editar.png";
import addIcon from "./images/add-image.png";

function App() {
  return (
    <div className="page">
      <header className="header">
        <img src={logo} alt="logo tripleten Around" className="header__logo" />
      </header>
      <main className="content">
        <section className="profile">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Editar avatar"
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

            <button className="profile__button profile-button-edit">
              <img src={editIcon} alt="button edit" />
            </button>
          </div>
          <button className="profile__button profile-button-add">
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
      </main>
      <footer className="footer">
        <span className="footer__copy">
          &copy; 2025 Fabricio Galindo Copado
        </span>
      </footer>
    </div>
  );
}
export default App;
