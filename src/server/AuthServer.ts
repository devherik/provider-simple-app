"user server";

class AuthServer {
    static #instance: AuthServer;
    private constructor() {}
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