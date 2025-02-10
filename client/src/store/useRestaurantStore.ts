import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addResturentFormType } from "../schema/addResturentSchma";
import axios from "axios";
const API_ENDPOINT = 'http://localhost:7000/api/v1/restaurant'
axios.defaults.withCredentials = true;
export const useRestaurantStore = create<any>()(persist((set, get) => ({

    loading: false,
    restaurants: null,
    restaurant: null,
    appliedFilter: [],
    searchedRestaurant: null,
    singleRestaurant: null,
    restaurant_orders: null,
    cuisines:null,
    createRestaurant: async (restaurant_data: addResturentFormType, addToast: (message: string, type: string) => void) => {
        try {
            console.log(restaurant_data, 'thsi is the restaurant_data ata the sotre')
            set({ loading: true })
            const response = await axios.post(`${API_ENDPOINT}/`, restaurant_data, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {

                set({ loading: false })

                addToast(response.data.message, 'success')
            }
            return response.data.id
        } catch (error: any) {
            set({ loading: false });
            addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
        }

    },
    getRestaurant: async (addToast: (message: string, type: string) => void) => {
        try {

            set({ loading: true })
            const response = await axios.get(`${API_ENDPOINT}/`, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {

                set({ loading: false, restaurant: response.data.restaurant })


            }
            return response.data.id
        } catch (error: any) {
            set({ loading: false, restaurant: null });
            addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
        }

    },
    getRestaurants: async () => {
        try {

            set({ loading: true })
            const response = await axios.get(`${API_ENDPOINT}/restaurants`, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {

                set({ loading: false, restaurants: response.data.restaurants })


            }
            return response.data.id
        } catch (error: any) {
            set({ loading: false, restaurant: null });

        }

    },
    getSingleRestaurant: async (id: string) => {
        try {

            set({ loading: true })
            const response = await axios.get(`${API_ENDPOINT}/${id}`, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {

                set({ loading: false, singleRestaurant: response.data.restaurant })


            }

        } catch (error: any) {
            set({ loading: false, restaurant: null });

        }

    },
    updateRestaurant: async (updatedData: addResturentFormType, addToast: (message: string, type: string) => void) => {
        try {

            set({ loading: true })
            const response = await axios.put(`${API_ENDPOINT}/`, updatedData, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {
                addToast(response?.data?.message, 'success');
                set({ loading: false })


            }
            return true
        } catch (error: any) {
            set({ loading: false, restaurant: null });
            addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
            return false
        }

    },
    addMenuToRestaurant: async (input: any, addToast: (message: string, type: string) => void) => {
        try {

            set({ loading: true })
            const response = await axios.put(`${API_ENDPOINT}/`, input, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {
                addToast(response?.data?.message, 'success');
                set({ loading: false })


            }
            return true
        } catch (error: any) {
            set({ loading: false, restaurant: null });
            addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
            return false
        }

    },
    uploadRestaurantBanner: async (input: any, addToast: (message: string, type: string) => void) => {
        try {

            set({ loading: true })
            const response = await axios.post(`${API_ENDPOINT}/upload-banner`, input, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {
                addToast(response?.data?.message, 'success');
                set((state: any) => ({ restaurant: { ...state.restaurant, image_url: response.data.image_url }, loading: false }))


            }
            return true
        } catch (error: any) {
            set({ loading: false, });
            addToast(error.response?.data?.message || 'An unexpected error occurred', 'error');
            return false
        }

    },
    search: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
        // selectedCuisines: any
        try {

            set({ loading: true })
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(","));

            const response = await axios.get(`${API_ENDPOINT}/search/${searchText}?${params.toString()}`, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {


                set({ loading: false, searchedRestaurant: response.data.data });

            }
            return true
        } catch (error: any) {
            set({ loading: false, searchedRestaurant: null });

            return false
        }

    },
    setAppliedFilter: (value: string) => {
        set((state: any) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item: any) => item !== value) : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] })
    },
    getCuisines: async () => {
        try {

            set({ loading: true })
            const response = await axios.get(`${API_ENDPOINT}/cuisines`, { headers: { "Content-Type": 'application/json' } })

            if (response.data.success) {
              
                set({ loading: false ,cuisines:response.data.cuisine})


            }
            return true
        } catch (error: any) {
            set({ loading: false, cuisines:null });
           
            return false
        }

    },




}), { name: 'restaurant-name', storage: createJSONStorage(() => localStorage) }))