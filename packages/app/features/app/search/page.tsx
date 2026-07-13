'use client'
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import ScreenWrapper from 'app/components/layout/ScreenWrapper'
import ProductCard from 'app/components/UI/ProductCart'
import { useInputStorage } from 'app/store/useInputStore'

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

const Search = () => {
    const searchInput = useInputStorage((state) => state.input);
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setHasError(false);
                
                const response = await fetch("https://fakestoreapi.com/products");
                const data: Product[] = await response.json();
                
                const filtered = data.filter(item => 
                    item.title.toLowerCase().includes(searchInput.toLowerCase())
                );
                
                setProducts(filtered);
            } catch (error) {
                console.error("Ma'lumot yuklashda xatolik:", error);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchInput]);

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Qidiruv natijalari</Text>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#2563eb" />
                ) : hasError ? (
                    <Text style={styles.errorText}>Internet ulanishini tekshiring yoki keyinroq urunib ko'ring.</Text>
                ) : products.length === 0 ? (
                    <Text style={styles.noResult}>Mahsulot topilmadi</Text>
                ) : (
                    <View style={styles.grid}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} products={products} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 16 },
    noResult: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginTop: 24 },
    errorText: { fontSize: 16, color: '#dc2626', textAlign: 'center', marginTop: 24, fontWeight: '500' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', width: '100%' }
});

export default Search;