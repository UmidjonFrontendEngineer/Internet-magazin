import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Savatdagi har bir mahsulot ob'ekti tuzilishi
interface CartItem {
    id: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    // Toggle funksiyasi: savatda bo'lsa o'chiradi, bo'lmasa 1 ta qilib qo'shadi
    toggleCart: (id: number) => void;
    // Soni oshirish funksiyasi
    incrementQuantity: (id: number) => void;
    // Soni kamaytirish funksiyasi (agar 1 tadan kamaytirilsa, savatdan o'chadi)
    decrementQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            toggleCart: (id) => set((state) => {
                const isExist = state.cart.some(item => item.id === id);

                if (isExist) {
                    // Agar bor bo'lsa -> savatdan o'chiramiz
                    return { cart: state.cart.filter(item => item.id !== id) };
                } else {
                    // Agar yo'q bo'lsa -> sonini 1 qilib qo'shamiz
                    return { cart: [...state.cart, { id, quantity: 1 }] };
                }
            }),

            incrementQuantity: (id) => set((state) => ({
                cart: state.cart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            })),

            decrementQuantity: (id) => set((state) => {
                const targetItem = state.cart.find(item => item.id === id);

                if (!targetItem) return {};

                if (targetItem.quantity === 1) {
                    // Agar soni 1 bo'lsa va minus bosilsa, savatdan butunlay o'chirib yuboramiz
                    return { cart: state.cart.filter(item => item.id !== id) };
                } else {
                    // Aks holda sonini bittaga kamaytiramiz
                    return {
                        cart: state.cart.map(item =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        )
                    };
                }
            }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);