import axios from 'axios';
export const signup= async (formData) =>{
    
    let response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",
        formData
        
        
    )
    return response.data;
}
export const signin = async (formData) => {
    let response = await axios.post(
        "https://fundoonotes.incubation.bridgelabz.com/api/user/login",
        formData
    );
    console.log(response)
    return response;
    
};