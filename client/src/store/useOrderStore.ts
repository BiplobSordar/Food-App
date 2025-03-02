import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT = 'http://localhost:7000/api/v1/order'

export const useOrderStore = create<any>()(persist((set) => ({
    loading: false,
    orders: null,
    admin_orders:null, 

    createOrder: async (orderData: any, addToast: (message: string, type: string) => void) => {

        try {
            
            set({ loading: true });
            const response = await axios.post(`${API_ENDPOINT}/create/create_checkout_session`, orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                // addToast(response.data.message, 'success')
                set({ loading: false });


                return response.data.session
            }


        } catch (error: any) {
            addToast(error.response.data.message, 'error')

            set({ loading: false });
            return false
        }


    },
    getOrders: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_ENDPOINT}/`);
            if (response.data.success) {

                set({ loading: false, orders: response.data.order });
                return true
            }


        } catch (error: any) {


            set({ loading: false });
            return false
        }
    },
    getRestaurantOrders: async () => {
        try {

            set({ loading: true })
            const response = await axios.get(`${API_ENDPOINT}/admin_orders`)

            if (response.data.success) {
               
                set({ loading: false, admin_orders:response.data.menus})


            }
            return true
        } catch (error: any) {
            set({ loading: false, admin_orders: null });
           
            return false
        }

    },

}), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))