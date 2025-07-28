"use server";

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

    public async login( userName : {userName: string}, password: {password: string}): Promise<boolean> {
        try {
            const response = await fetch(`${AuthServer.#api}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    userName: userName.userName,
                    password: password.password
                })
            });
            return response.ok;
        } catch (error) {
            console.error("Error during login:", error);
            throw new Error("Login failed due to an unexpected error.");
        }
    }
    
    public async logout() {
        try {
            const response = await fetch(`${AuthServer.#api}logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            return response.ok;
        } catch (error) {
            console.error("Error during logout:", error);
            throw new Error("Logout failed due to an unexpected error.");
            
        }
        
    }
}
export default AuthServer;