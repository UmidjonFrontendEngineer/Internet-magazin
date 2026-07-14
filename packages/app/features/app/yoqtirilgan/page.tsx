'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCard from 'app/components/UI/ProductCart';
import { useYoqtirilganStore } from 'app/store/useYoqtirilganStore';
import LoaderProductCard from 'app/components/UI/LoaderProductCart';
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

const Yoqtirilgan = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState('loading');

    const yoqtirilganIds = useYoqtirilganStore((state) => state.yoqtirilganIds);

    const fetchYoqtirilganProducts = async () => {
        try {
            setLoading('loading')
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setLoading('loaded')
        } catch (error) {
            console.error("Saralangan ma'lumotlarini yuklashda xatolik:", error);
            setLoading('notLoad')
        }
    };

    useEffect(() => {
        if (yoqtirilganIds.length > 0) {
            fetchYoqtirilganProducts();
        }
    }, [yoqtirilganIds]);

    const yoqtirilganProducts = products.filter(product => yoqtirilganIds.includes(product.id));

    if (yoqtirilganIds.length === 0) return <Empty />
    
    if (loading === 'loading') {
        return (
            <ScreenWrapper>
                <View style={styles.grid}>
                    <LoaderProductCard />
                    <LoaderProductCard />
                    <LoaderProductCard />
                    <LoaderProductCard />
                </View>
            </ScreenWrapper>
        );
    }

    else if (loading === 'notLoad') {
        return <NotLoad fetchProducts={fetchYoqtirilganProducts} />
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Saralangandagi mahsulotlar</Text>

                <View style={styles.grid}>
                    {yoqtirilganProducts.map((item) => (
                        <ProductCard key={item.id} product={item} products={products} />
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
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 12 },
    emptyText: { fontSize: 18, fontWeight: '600', color: '#6b7280' }
});

export default Yoqtirilgan;