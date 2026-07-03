import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartState {
    cartIds: number[];
    toggleCart: (id: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartIds: [],
            toggleCart: (id) => set((state) => {
                const isExist = state.cartIds.includes(id);
                
                if (isExist) {
                    return { cartIds: state.cartIds.filter(itemId => itemId !== id) };
                } else {
                    return { cartIds: [...state.cartIds, id] };
                }
            }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);