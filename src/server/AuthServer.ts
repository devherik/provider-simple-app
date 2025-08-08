"use server";

import axios from "axios";

class AuthServer {
    static #instance: AuthServer;
    static #api: string;
    private constructor() {
        AuthServer.#api = import.meta.env.VITE_API_URL || "http://localhost:8080/";
    }
    public static get instance(): AuthServer {
        if (!AuthServer.#instance) {
            AuthServer.#instance = new AuthServer();
        }
        return AuthServer.#instance;
    }

    public async login( userName : {userName: string}, password: {password: string}): Promise<Response | undefined> {
        try {
            const response = await axios.post(`${AuthServer.#api}login`, {
                username: userName.userName,
                password: password.password
            });
            if (response.status !== 200) {
                throw new Error("Login failed: Invalid credentials or server error.");
            }
            return new Response(JSON.stringify(response.data), {
                status: 200,
                statusText: "OK",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Error during login:", error);
            return undefined;
        }
    }

    
    public async logout() {
        try {
            const response = await axios.post(`${AuthServer.#api}logout`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.status === 200;
        } catch (error) {
            console.error("Error during logout:", error);
            throw new Error("Logout failed due to an unexpected error.");
            
        }
        
    }

    public async createUser( userName : {userName: string}, password: {password: string}, theme: {theme: string}): Promise<boolean> {
        try {
            const response = await axios.post(`${AuthServer.#api}api/users/create`, {
                userName: userName.userName,
                password: password.password,
                theme: theme.theme
            });
            return response.status === 200;
        } catch (error) {
            console.error("Error during user creation:", error);
            throw new Error("User creation failed due to an unexpected error.");
        }
    }
    
    public async updateUser(
        userId: {userId: number},
        userName : {userName: string},
        password: {password: string},
        theme: {theme: string},
        token: {token: string}
    ): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                }
            };
            const response = await axios.put(`${AuthServer.#api}api/users/update/${userId.userId}`, {
                userName: userName.userName,
                password: password.password,
                theme: theme.theme
            }, config);
            return response.status === 200;
        } catch (error) {
            console.error("Error during user update:", error);
            throw new Error("User update failed due to an unexpected error.");
        }
    }
}
export default AuthServer;