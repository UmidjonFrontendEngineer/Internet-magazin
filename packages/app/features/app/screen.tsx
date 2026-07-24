'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCard from 'app/components/UI/ProductCart';
import LoaderProductCard from 'app/components/UI/LoaderProductCart';
import Slider from 'app/components/UI/Slider';
import SliderLoader from 'app/components/UI/SliderLoader';
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

const isWeb = typeof window !== 'undefined' && window.innerWidth > 768;

const HomeScreen = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState('loading');
    const { width: screenWidth } = useWindowDimensions();
    const [count, setCount] = useState(0)

    const fetchProducts = async () => {
        try {
            setLoading('loading')
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setLoading('loaded')
        } catch (error) {
            console.error("Ma'lumot yuklashda xatolik:", error);
            setLoading('notLoad')
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading === 'loading') {
        return (
            <ScreenWrapper>
                <View contentContainerStyle={styles.container}>

                    <View style={{ padding: 24 }}>
                        <SliderLoader />
                    </View>

                    <View style={styles.grid}>
                        <LoaderProductCard />
                        <LoaderProductCard />
                        <LoaderProductCard />
                        <LoaderProductCard />
                    </View>

                </View>
            </ScreenWrapper>
        );
    }

    else if (loading === 'notLoad') {
        return (
            <NotLoad fetchProducts={fetchProducts} />
        )
    }

    if (products.length === 0) return <Empty />

    return (
        <ScreenWrapper>
            <View contentContainerStyle={styles.container}>
                <View style={{ padding: screenWidth > 900 ? 12 : 0 }}>
                    <Slider products={products} link={true} count={count} setCount={setCount} />
                </View>

                <View style={styles.grid}>
                    {products.map((item, index) => (
                        <ProductCard key={item.id} product={item} products={products} index={index} />
                    ))}
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { gap: 30 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 12 },
    card: {
        width: isWeb ? '48%' : '100%',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    imageWrapper: {
        width: '100%',
        height: 180,
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        marginBottom: 12,
    },
    productTitle: { fontSize: 14, fontWeight: '600', color: '#1f2937', lineHeight: 20 },
    bottomSection: { marginTop: 12 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    ratingText: { fontSize: 12, color: '#6b7280', marginLeft: 4, fontWeight: '500' },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    priceText: { fontSize: 16, fontWeight: '900', color: '#2563eb' },
    button: { backgroundColor: '#eff6ff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
    buttonInCart: { backgroundColor: '#e0f2fe' },
    buttonText: { color: '#2563eb', fontWeight: '700', fontSize: 12 },
    buttonTextInCart: { color: '#0369a1' },
});

export default HomeScreen;