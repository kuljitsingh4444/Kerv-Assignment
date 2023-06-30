import { useEffect, useMemo, useState } from "react"
import PrimaryInput from "../../common/PrimaryInput";
import { setLocalData, getLocalData } from "../../common/localStorage";

const ExperienceInfo = ({ updateFiledMetadata }) => {
    const [prevEmployer, setPrevEmployer] = useState("")
    const [prevSalary, setPrevSalary] = useState("")
    const [prevLocation, setPrevLocation] = useState("")

    const fieldInfo = useMemo(() => {
        return [{field : "prevEmployer",  setter: setPrevEmployer}, {field: "prevSalary", setter: setPrevSalary}, {field: "prevLocation", setter: setPrevLocation}]
    })

    const updateField = (value, setterFunction, field) => {
        setterFunction(value)
        setLocalData(field, value)
    }

    useEffect(() =>{
        updateFiledMetadata({3 : fieldInfo})
        fieldInfo.forEach(currentField => {
            const currentData = getLocalData(currentField.field)
            currentField.setter(currentData)
        })
    }, [])

    return(
        <div className="custom-form">
            <div className="form-field">
                <div className="form-key">
                    Previous Employer
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setPrevEmployer, "prevEmployer")} value={prevEmployer}></PrimaryInput>
                </div>
            </div>

            <div className="form-field">
                <div className="form-key">
                    Previous Salary
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setPrevSalary, "prevSalary")} value={prevSalary} type={"number"}></PrimaryInput>
                </div>
            </div>

            <div className="form-field">
                <div className="form-key">
                    Previous Location
                </div>
                <div>
                    <PrimaryInput onChange={(e) => updateField(e.target.value, setPrevLocation, "prevLocation")} value={prevLocation}></PrimaryInput>
                </div>
            </div>

        </div>
    )
}

export default ExperienceInfo