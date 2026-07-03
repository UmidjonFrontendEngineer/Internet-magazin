'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCard from 'app/components/UI/ProductCart';
import { useYoqtirilganStore } from 'app/store/useYoqtirilganStore';
import LoaderProductCard from 'app/components/UI/LoaderProductCart';

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
    const [loading, setLoading] = useState(true);

    const yoqtirilganIds = useYoqtirilganStore((state) => state.yoqtirilganIds);

    useEffect(() => {
        const fetchYoqtirilganProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Saralangan ma'lumotlarini yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        if (yoqtirilganIds.length > 0) {
            fetchYoqtirilganProducts();
        } else {
            setLoading(false);
        }
    }, [yoqtirilganIds]);

    const yoqtirilganProducts = products.filter(product => yoqtirilganIds.includes(product.id));

    if (loading) {
        return (
            <ScreenWrapper>
                <View style={{ flexWrap: 'wrap', flex: 1 }}>
                    <View style={{ flexDirection: 'row', gap: 40 }}>
                        <LoaderProductCard />
                        <LoaderProductCard />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 40 }}>
                        <LoaderProductCard />
                        <LoaderProductCard />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 40 }}>
                        <LoaderProductCard />
                        <LoaderProductCard />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 40 }}>
                        <LoaderProductCard />
                        <LoaderProductCard />
                    </View>
                </View>
            </ScreenWrapper>
        );
    }

    if (yoqtirilganIds.length === 0 || yoqtirilganProducts.length === 0) {
        return (
            <ScreenWrapper>
                <View style={styles.center}>
                    <Text style={styles.emptyText}>Saralanganingiz hozircha bo'sh 🛒</Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Saralangandagi mahsulotlar</Text>

                <View style={styles.grid}>
                    {yoqtirilganProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
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

export default Yoqtirilgan;