export const setLocalData = (key, data) => {
    localStorage.setItem("kerv-"+ key, data)
}

export const getLocalData = (key) => {
    return localStorage.getItem("kerv-"+key)
}

export const getAllKeys = () => {
    let keys = [];

    for (let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i).startsWith("kerv-")){
            keys.push(localStorage.key(i).split("kerv-")[1])
        }
    }

    return keys
}