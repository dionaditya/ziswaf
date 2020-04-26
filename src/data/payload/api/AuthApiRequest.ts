import { LoginRequestInterface } from '../contracts/AuthContract'

export class LoginApiRequest implements LoginRequestInterface {
    private username: string;
    private password: string;

    constructor(
        username: string,
        password: string
    ) {
        this.username = username
        this.password = password

    }
    
    public toJson() {
        const data = {
            username: this.username,
            password: this.password
        }
        return JSON.stringify({
            data
        })
    }
}