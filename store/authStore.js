import { create } from 'zustand';
import AsyncStoarge from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
    // user: {name: "John"},
    // sayHello: () => console.log('Hello'), 
    // setUser: (user) => set({ user }),

    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        set({isLoadingL: true})
        try {
            const response = await fetch('https://react-native-bookapp-backend.onrender.com/api/auth/register', {
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
    }
}));