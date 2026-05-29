export default function ImagePopup(props) {
  const { name, link } = props.card;
  return <img src={link} alt={name} />;
}
