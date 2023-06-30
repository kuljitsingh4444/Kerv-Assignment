import { useEffect, useMemo, useState } from "react"
import PrimaryInput from "../../common/PrimaryInput";
import { setLocalData, getLocalData } from "../../common/localStorage";

const EducationInfo = ({ updateFiledMetadata }) => {

    const [collegeName, setCollegeName] = useState("")
    const [collegeLocation, setCollegeLocation] = useState("")

    const fieldInfo = useMemo(() => {
        return [{field : "collegeName",  setter: setCollegeName}, {field: "collegeLocation", setter: setCollegeLocation}]
    })

    const updateField = (value, setterFunction, field) => {
        setterFunction(value)
        setLocalData(field, value)
    }

    useEffect(() =>{
        updateFiledMetadata({2 : fieldInfo})
        fieldInfo.forEach(currentField => {
            const currentData = getLocalData(currentField.field)
            currentField.setter(currentData)
        })
    }, [])

    return(
        <div className="custom-form">
            <div className="form-field">
                <div className="form-key">
                    College Name
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setCollegeName, "collegeName")} value={collegeName}></PrimaryInput>
                </div>
            </div>

            <div className="form-field">
                <div className="form-key">
                    College Location
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setCollegeLocation, "collegeLocation")} value={collegeLocation}></PrimaryInput>
                </div>
            </div>
        </div>
    )
}

export default EducationInfo