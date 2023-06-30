import "./PrimaryButton.css";

const PrimaryButton = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={disabled ? "primary-button disabled-item" : "primary-button"}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
