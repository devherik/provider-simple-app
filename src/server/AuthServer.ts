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
        return true
    }
    
    public async logout() {
        return true
    }
}
export default AuthServer;