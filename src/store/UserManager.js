import { observable, makeObservable, action } from 'mobx'
const axios = require('axios')
const PORT = 8080

export default class UserManager
{
    constructor(){
        this.username = ""
        this.password = ""
        this.name = ""
        this.surname = ""
        this.logged = false

        makeObservable(this, {
            username: observable,
            password: observable,
            name: observable,
            surname: observable,
            logged: observable,
            userSignIn: action,
            userSignUp: action
        })
    }

    userSignIn = async () =>
    {
        console.log(this.username,this.password)
        let username = this.username
        let password = this.password
        let response = await axios.post(`http://localhost:${PORT}/userSignIn`,{username, password})
        if(response.data === "Wrong password"){
            return "Wrong password"
        }else{
            this.name = response.data.name
            this.surname = response.data.surname
            this.logged = true
            return "Logged In"
        }        
    }

    userSignUp = async () =>
    {
        let username = this.username
        let password = this.password
        let name = this.name
        let surname = this.surname
        let response = await axios.post(`http://localhost:${PORT}/userSignUp`,{username, password, name, surname})
        return response.data
    }
}