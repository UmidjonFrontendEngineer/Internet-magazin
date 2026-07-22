'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import { useCartStore } from 'app/store/useCartStore';
import Card from 'app/components/UI/Cart';
import { useLanStorage } from 'app/store/useLanStore';
import LoaderCart from 'app/components/UI/LoaderCart';
import NotLoad from 'app/components/UI/NotLoad';
import Empty from 'app/components/UI/Empty';

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
    const [loading, setLoading] = useState('loading');

    const cart = useCartStore(state => state.cart);
    const cartIds = React.useMemo(() => cart.map(item => item.id), [cart]);
    const lan = useLanStorage(state => state.lan)

    const fetchCartProducts = async () => {
        try {
            setLoading('loading')
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setLoading('loaded')
        } catch (error) {
            console.error("Savat ma'lumotlarini yuklashda xatolik:", error);
            setLoading('notLoad')
        }
    };

    useEffect(() => {
        if (cartIds.length > 0) {
            fetchCartProducts();
        }
    }, [cartIds.join(',')]);

    const cartProducts = products.filter(product => cartIds.includes(product.id));
    if (cartIds.length === 0) return <Empty />

    if (loading === 'loading') {
        return (
            <ScreenWrapper>
                <View style={[styles.grid, {padding: 12}]}>
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                    <LoaderCart />
                </View>
            </ScreenWrapper>
        );
    }

    else if (loading === 'notLoad') {
        return <NotLoad fetchProducts={fetchCartProducts} />
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.grid}>
                    {cartProducts.map((item, index) => (
                        <Card key={item.id} product={item} index={index} />
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