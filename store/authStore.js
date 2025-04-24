import { create } from 'zustand';
import AsyncStoarge from '@react-native-async-storage/async-storage';
import { API_URL } from "../constants/api.js";

export const useAuthStore = create((set) => ({
    // user: {name: "John"},
    // sayHello: () => console.log('Hello'), 
    // setUser: (user) => set({ user }),

    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: true,

    register: async (username, email, password) => {
        set({isLoading: true})
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    username, 
                    email,
                    password,
                })
            })

            const data = await response.json();
            // console.log('User Token is', data.token);
            if(!response.ok){
                throw new Error(data.message || "Something went wrong")
            }

            await AsyncStoarge.setItem('user', JSON.stringify(data.user));
            await AsyncStoarge.setItem('token', data.token);

            set({token: data.token, user: data.user, isLoading: false});

            return { success: true }

        } catch (error) {
            set({isLoading: false});
            return { success: false, error: error.message };
        }
    },


    login: async (email, password) => {
        set({isLoading: true});
        try {
            const response = await fetch(`${API_URL}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            // console.log('response', response);

            const data = await response.json();
            // console.log("data", data)

            if(!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            await AsyncStoarge.setItem('user', JSON.stringify(data.user));
            await AsyncStoarge.setItem('token', data.token);

            set({token: data.token, user: data.user, isLoading: false});

            return { success: true }

        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStoarge.getItem("token");
            const userJson = await AsyncStoarge.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({ token, user });
        } catch (error) {
            console.log("Auth Check Failed", error);
        } finally {
            set({ isCheckingAuth: false }); 
        }
    },

    logout: async () => {
        try {
            await AsyncStoarge.removeItem("token");
            await AsyncStoarge.removeItem("user");
            set({ token: null, user: null });
        } catch (error) {
            
        }
    },

}));