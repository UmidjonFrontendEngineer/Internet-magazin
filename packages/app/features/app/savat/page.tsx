'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import { useCartStore } from 'app/store/useCartStore';
import Card from 'app/components/UI/Cart';
import { useLanStorage } from 'app/store/useLanStore';
import LoaderCart from 'app/components/UI/LoaderCart';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

const Savat = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    const cartIds = useCartStore((state) => state.cartIds);
    const lan = useLanStorage(state => state.lan)

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Savat ma'lumotlarini yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        if (cartIds.length > 0) {
            fetchCartProducts();
        } else {
            setLoading(false);
        }
    }, [cartIds]);

    const cartProducts = products.filter(product => cartIds.includes(product.id));

    if (loading) {
        return (
            <ScreenWrapper>
                <View style={styles.grid}>
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                </View>
            </ScreenWrapper>
        );
    }

    if (cartIds.length === 0 || cartProducts.length === 0) {
        return (
            <ScreenWrapper>
                <View style={styles.center}>
                    <Text style={styles.emptyText}>{lan === 'uz' ? 'Savatingiz hozircha bo\'sh' : lan === 'en' ? 'Your cart is empty' : lan === 'ru' ? 'Ваша корзина пока пуста' : 'Savatingiz hozircha bo\'sh'} 🛒</Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>{lan === 'uz' ? 'Savatdagi mahsulotlar' : lan === 'en' ? 'Products in cart' : lan === 'ru' ? 'Товары в корзине' : 'Savatdagi mahsulotlar'}</Text>

                <View style={styles.grid}>
                    {cartProducts.map((item) => (
                        <Card key={item.id} product={item} />
                    ))}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    emptyText: { fontSize: 18, fontWeight: '600', color: '#6b7280' }
});

export default Savat;