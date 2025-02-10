import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginFormData, SignupFormData } from "../schema/userSchema";
import axios from "axios";
import Success from "../pages/Success";



type User = {
    username: string,
    email: string,
    contact: string,
    address_id: string,
    avatar: string,
    seller: boolean,
    is_verified: boolean
}

type UserState = {
    user: User | null,
    isAuthenticated: boolean
    isCheckingAuth: boolean
    loading: boolean
    signup: (input: SignupFormData) => Promise<void>
    login: (input: LoginFormData) => Promise<void>
    verifyEmail: (input: string) => Promise<void>
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
}

const API_ENDPOINT = 'http://localhost:7000/api/v1/user'
axios.defaults.withCredentials = true;


export const useUserStore = create<any>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: true,
            loading: false,

            // Signup API Implementation
            signup: async (input: SignupFormData, addToast: (message: string, type?: string) => void) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_ENDPOINT}/signup`, input, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.success) {
                        addToast(response.data.message, 'success');
                        set({ loading: false });
                    }

                    return true

                } catch (error: any) {
                    addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
                    set({ loading: false });
                } finally {
                    set({ loading: false })

                }
            },
            verifyEmail: async (verificationCode: string, addToast: (message: string, type?: string) => void) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/verify-email`, { verificationCode }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false })
                    }
                    return true
                } catch (error: any) {
                    console.log(error)
                    addToast(error.response?.data.message, 'error')
                    set({ loading: false })
                    return false
                }


            }
            ,
            login: async (input: LoginFormData, addToast: (message: string, type?: string) => void) => {


                set({ loading: true })
                try {
                    const response = await axios.post(`${API_ENDPOINT}/login`, input, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false, user: response.data.user, isAuthenticated: true })
                        return true
                    }

                } catch (error: any) {
                    addToast(error.response?.data.message, 'error')
                    set({ loading: false })
                    return false

                }

            },
            checkAuthentication: async () => {
                try {

                    set({ isCheckingAuth: true });
                    const response = await axios.get(`${API_ENDPOINT}/check-auth`);
                    if (response.data.success) {
                        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
                    } else {
                        console.log(response.data.success, 'this is the success statust...')
                        set({ isAuthenticated: false })


                    }
                    // alert(response.data.user)
                } catch (error) {
                    set({ isAuthenticated: false, isCheckingAuth: false });
                }
            },
            logout: async (addToast: (message: string, type?: string) => void) => {
                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/logout`)
                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false, user: null, isAuthenticated: false })
                    }
                    return true
                } catch (error: any) {
                    addToast(error.response?.data.message, 'error')
                    set({ loading: false })
                    return false
                }
            },
            forgotPassword: async (email: string, addToast: (message: string, type?: string) => void) => {

                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/forgot-password`, { email }, {
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    })
                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false })
                        return true
                    }
                } catch (error: any) {
                    addToast(error.response.data.message, 'error')
                    set({ loading: false })
                }



            },
            resetPassword: async (data: any, addToast: (message: string, type?: string) => void) => {

                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/reset-password/${data.token}`, data, { headers: { "Content-Type": 'application/json' } })
                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false })
                        return true
                    }
                } catch (error: any) {
                    addToast(error.response.data.message, 'error')
                    set({ loading: false })
                    return false
                }
            },
            updateProfile: async (profileData: any, addToast: (message: string, type?: string) => void) => {

                try {
                    set({ loading: true })
                    const response = await axios.put(`${API_ENDPOINT}/profile/update`, profileData, { headers: { "Content-Type": 'application/json' } })
                    if (response.data.success) {
                        addToast(response.data.message, 'success')
                        set({ loading: false })
                        return true
                    }
                } catch (error: any) {
                    addToast(error.response.data.message, 'error')
                    set({ loading: false })
                    return false
                }
            },
            addAddress: async (address: any, addToast: (message: string, type: string) => void) => {


                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/add-address`, address, { headers: { "Content-Type": 'application/json' } })

                    if (response.data.success) {

                        set({ loading: false })

                        addToast(response.data.message, 'success')
                    }
                    return true

                } catch (error: any) {
                    set({ loading: false })
                    addToast(error.response.data.message, 'error')
                    return false
                }

            },
            updateAddress: async (address: any, addToast: (message: string, type: string) => void) => {


                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/update-address`, address, { headers: { "Content-Type": 'application/json' } })

                    if (response.data.success) {

                        set({ loading: false })

                        addToast(response.data.message, 'success')
                    }
                    return true
                } catch (error: any) {
                    set({ loading: false })
                    addToast(error.response.data.message, 'error')
                    return false
                }

            },
            beASeller: async (addToast: (message: string, type: string) => void) => {


                try {
                    set({ loading: true })
                    const response = await axios.put(`${API_ENDPOINT}/become-seller`)

                    if (response.data.success) {

                        set({ loading: false })

                        addToast(response.data.message, 'success')
                    }
                    return true
                } catch (error: any) {
                    set({ loading: false })
                    addToast(error.response.data.message, 'error')
                    return false
                }

            },
            uploadAvatar: async (file: File, addToast: (message: string, type: string) => void) => {


                try {
                    set({ loading: true })
                    const response = await axios.post(`${API_ENDPOINT}/upload-avatar`, { file })

                    if (response.data.success) {

                        // set()
                        set((prev: any) => ({
                            loading: false,
                            user: { ...prev.user, avatar: response.data.avatar }
                        }))

                        addToast(response.data.message, 'success')
                    }
                    return true
                } catch (error: any) {
                    set({ loading: false })
                    addToast(error.response.data.message, 'error')
                    return false
                }

            },
        }),

        {
            name: 'user-name',
            storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
        }
    )
);
