import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
 
export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onLogIn = this.onLogIn.bind(this)
    }

    onLogIn(){
        const { email, password, name } = this.state;
        // TODO: Call BE Auth API here

        console.log("Log in successfully!");
    }


    render() {
        return (
            <View>
                <TextInput
                    placeholder = "email" 
                    onChangeText = {(email) => this.setState({ email })}  
                />

                <TextInput
                    placeholder = "password" 
                    secureTextEntry = { true }
                    onChangeText = {(password) => this.setState({ password })}  
                />

                <Button 
                    onPress = { () => this.onLogIn()}
                    title = "Sign In"
                />
            </View>
        )
    }
}

export default Login
