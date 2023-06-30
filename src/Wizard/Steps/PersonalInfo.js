import { useEffect, useMemo, useState } from "react"
import PrimaryInput from "../../common/PrimaryInput";
import { setLocalData, getLocalData } from "../../common/localStorage";

const PersonalInfo = ({ updateFiledMetadata }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContant] = useState("")

    const fieldInfo = useMemo(() => {
        return [{field : "name",  setter: setName}, {field: "email", setter: setEmail}, {field: "contact", setter: setContant}]
    })

    const updateField = (value, setterFunction, field) => {
        setterFunction(value)
        setLocalData(field, value)
    }

    useEffect(() =>{
        updateFiledMetadata({1 : fieldInfo})
        fieldInfo.forEach(currentField => {
            const currentData = getLocalData(currentField.field)
            currentField.setter(currentData)
        })
    }, [])
    
    return(
        <div className="custom-form">
            <div className="form-field">
                <div className="form-key">
                    Name
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setName, "name")} value={name}></PrimaryInput>
                </div>
            </div>

            <div className="form-field">
                <div className="form-key">
                    Email
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setEmail, "email")} value={email}></PrimaryInput>
                </div>
            </div>

            <div className="form-field">
                <div className="form-key">
                    Contact
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setContant, "contact")} value={contact} type={"number"}></PrimaryInput>
                </div>
            </div>

        </div>
    )
}

export default PersonalInfo