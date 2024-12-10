const URL = 'http://localhost:8080'

// login
export const userLogin = (data) =>{
    return fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body : JSON.stringify(data),
    })
}