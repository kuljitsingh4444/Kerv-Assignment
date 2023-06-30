import "./PrimaryInput.css";

const PrimaryInput = ({ type, value, onChange }) => {
    return (
        <input onChange={onChange} value={value} className="primary-input" type={type ?? "text"}></input>
    )
}

export default PrimaryInput
