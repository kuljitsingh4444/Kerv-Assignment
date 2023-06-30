import PersonalInfo from "./Steps/PersonalInfo";
import EducationInfo from "./Steps/EducationInfo"
import ExperienceInfo from "./Steps/ExperienceInfo";
import PrimaryButton from "../common/PrimaryButton";
import "./Wizard.css";
import { useState } from "react";
import { getLocalData, getAllKeys } from "../common/localStorage";
import { NameMap } from "../common/nameMap";

const Wizard = () => {
    const [step, setStep] = useState(1)
    const [showPreview, setShowPreview] = useState(false);

    let allFieldsMetadata = {}

    const handlePrevious = () => {
        if(showPreview){
            setShowPreview(false)
            setStep(3)
            return;
        }

        if(step == 1){
            setStep(3)
        } else {
            setStep(currentStep => currentStep - 1)
        }
    }

    const makeRequest = () => {
        const allKeys = getAllKeys()
        let payload = {}
        allKeys.forEach(currentKey => {
            payload[currentKey] = getLocalData(currentKey)
        })

        const url = 'https://api.example.com/data'; // Replace with your API endpoint

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => console.log('Response:', data))
        .catch(error => console.error('Error:', error));

        console.log(payload)
        alert("Call API, Payload logged in console")
    }

    const handleNext = () => {
        if(showPreview){
            makeRequest()
            return;
        }
        if(!validateFields()){
            return
        }
        if(step == 3){
            setShowPreview(true)
        } else {
            setStep(currentStep => currentStep + 1)
        }
    }

    const updateFiledMetadata = (params) => {
        allFieldsMetadata = {
            ...params
        }
    }

    const validateFields = () => {
        let isValid = true;

        for(let i=0; i < allFieldsMetadata[step].length; i++) {
            const { field } = allFieldsMetadata[step][i];
            const data = getLocalData(field);

            if(!(data && data.length)) {
                alert(`Add Inforamtion for field ${field}`)
                isValid = false
                break;
            }
        }

        return isValid
    }

    const getPreview = () => {
        const localKeys = getAllKeys();

        return localKeys.map(currentKey => {
            return(
                <div>{NameMap[currentKey]}: {getLocalData(currentKey)}</div>
            )
        })
    }

    return(
        <div className={"wizard-contents"}>
            {
                showPreview ? 
                getPreview() : 
                <div>
                    {step == 1 && <div>
                        <PersonalInfo updateFiledMetadata={updateFiledMetadata}></PersonalInfo>
                    </div>}
                    {step == 2 && <div>
                        <EducationInfo updateFiledMetadata={updateFiledMetadata}></EducationInfo>
                    </div>}
                    {step == 3 && <div>
                        <ExperienceInfo updateFiledMetadata={updateFiledMetadata}></ExperienceInfo>
                    </div>}
                </div>
            }
            <div className="buttons-container">
                <PrimaryButton disabled={step==1} onClick={() => handlePrevious()} text={"Previous"}></PrimaryButton>
                <PrimaryButton onClick={() => handleNext()} text={showPreview ? "Submit" : "Next"}></PrimaryButton>
            </div>
        </div>

    )
}

export default Wizard