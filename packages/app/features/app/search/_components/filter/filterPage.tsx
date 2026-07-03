'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCard from 'app/components/UI/ProductCart';
import { useLanStorage } from 'app/store/useLanStore';
import { useSearchParams } from 'solito/navigation';
import { useInputStorage } from 'app/store/useInputStore';
import { usePathname } from 'solito/navigation';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

const FilterSearch = () => {
    const params = useSearchParams();
    const lan = useLanStorage(state => state.lan);
    const inputValue = useInputStorage(state => state.input)

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    const searchQuery = inputValue
    // params?.id ? String(params.id).trim().toLowerCase() : '';

    useEffect(() => {
        const fetchSearchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Ma'lumot yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchProducts();
    }, []);

    const searchProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery)
    );


    if (loading) {
        return (
            <ScreenWrapper>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#111827" />
                    <Text style={styles.infoText}>
                        {lan === 'uz' ? 'Yuklanmoqda...' : lan === 'ru' ? 'Загрузка...' : 'Loading...'}
                    </Text>
                </View>
            </ScreenWrapper>
        );
    }

    if (!searchQuery || searchProducts.length === 0) {
        return (
            <ScreenWrapper>
                <View style={styles.center}>
                    <Text style={styles.emptyText}>
                        {lan === 'uz' ? `"${searchQuery}" bo'yicha hech narsa topilmadi` :
                            lan === 'ru' ? `По запросу "${searchQuery}" ничего не найдено` :
                                `No results found for "${searchQuery}"`}
                    </Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTitle}>
                    {lan === 'uz' ? 'Topilgan mahsulotlar' :
                        lan === 'ru' ? 'Найденные товары' :
                            'Found products'}
                </Text>

                <View style={styles.grid}>
                    {searchProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    infoText: { marginTop: 10, fontSize: 16, color: '#6b7280' },
    emptyText: { fontSize: 18, fontWeight: '600', color: '#6b7280', textAlign: 'center' }
});

export default FilterSearch;