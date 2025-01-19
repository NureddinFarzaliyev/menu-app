export const defaultResponseHandler = (response, callback) => {
    if(response.error){
        console.log(response.error)
    }else {
        console.log(response)
        if(callback) callback()
    }
}