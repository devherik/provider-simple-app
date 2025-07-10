"user server";

class AuthServer {
    static #instance: AuthServer;
    static #api: string;
    private constructor() {
        AuthServer.#api = import.meta.env.VITE_API_URL
    }
    public static get instance(): AuthServer {
        if (!AuthServer.#instance) {
            AuthServer.#instance = new AuthServer();
        }
        return AuthServer.#instance;
    }

    public async login( userName : {userName: String}, password: {password: String}): Promise<boolean> {
        const response = await fetch(`${AuthServer.#api}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName.userName,
                password: password.password
            })
        });
        return response.ok;
    }
    
    public async logout() {
        const response = await fetch(`${AuthServer.#api}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    }
}
export default AuthServer;