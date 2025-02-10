import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API_ENDPOINT = 'http://localhost:7000/api/v1/menu'
export const useMenuStore = create<any>()(persist((set) => ({
    loading: false,
    menus: null,
    createMenu: async (formData: any, addToast: (message: string, type: string) => void) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_ENDPOINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                addToast(response.data.message, 'success')
                set({ loading: false });
                return true
            }


        } catch (error: any) {
            addToast(error.response.data.message, 'error')

            set({ loading: false });
            return false
        }


    },
    getMenus: async () => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_ENDPOINT}/menus`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {

                set({ loading: false, menus: response.data.menus });
                return true
            }
            

        } catch (error: any) {


            set({ loading: false });
            return false
        }
    },
    editMenu: async (menuId: string, formData: FormData, addToast: (message: string, type: string) => void) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_ENDPOINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                addToast(response.data.message, 'success')
                set({ loading: false });
                return true
            }
            // update restaurant menu

        } catch (error: any) {
            addToast(error.response.data.message, 'error')

            set({ loading: false });
            return false
        }
    },
    deleteMenu: async () => { },
}), {
    name: 'menu-name',
    storage: createJSONStorage(() => localStorage)
}))