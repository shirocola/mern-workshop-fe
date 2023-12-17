
export const authenticate = async (response, next) => {
    if(typeof window !== "undefined"){
        //collect token to Session Storage
        sessionStorage.setItem("token", JSON.stringify(response.data.jwttoken))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    next();
}

//get data from token
export const getToken =()=>{
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else {
            return false
        }
    }
}

//get data from user
export const getUser =()=> {
    if(typeof window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else {
            return false
        }
    }
}

export const logout = async () => {
    if(typeof window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
}