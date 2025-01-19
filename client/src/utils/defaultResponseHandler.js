export const defaultResponseHandler = (response, callback) => {
    if(response.error){
        console.log(response.error)
    }else if (response.success || response.message){ 
        console.log(response)
        if(callback) callback(response)
    }else{
        console.log('unexpected response', response)
    }
}