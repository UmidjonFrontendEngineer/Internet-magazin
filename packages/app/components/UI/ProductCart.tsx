'use client'
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useCartStore } from "app/store/useCartStore";
import { useYoqtirilganStore } from "app/store/useYoqtirilganStore";
import { SolitoImage } from "solito/image";
import { TextLink } from "solito/link";

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
const ProductCard = ({ product, products }: { product: ProductProps, products: ProductProps[] }) => {
    const cartIds = useCartStore(state => state.cartIds);
    const toggleCart = useCartStore(state => state.toggleCart);

    const yoqtirilganIds = useYoqtirilganStore(state => state.yoqtirilganIds)
    const toggleYoqtirilgan = useYoqtirilganStore(state => state.toggleYoqtirilgan)

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isInCart = isMounted && cartIds.includes(product.id);

    const handleTargetIDs = (currentId: number) => {
        const currentIndex = products.findIndex(p => p.id === currentId);
        if (currentIndex === -1) return `${currentId}`;

        const nextProducts = products.slice(currentIndex, currentIndex + 10);
        return nextProducts.map(p => p.id).join(',');
    }

    return (
        <View style={styles.card}>
            <TextLink href={`/product/${handleTargetIDs(product.id)}`}>
                <View style={{ position: 'relative' }}>
                    <Pressable onPress={() => toggleYoqtirilgan(product.id)} style={({ pressed }) => [{ position: 'absolute', zIndex: 99, top: 5, right: 5, borderRadius: 100, transition: 'all 0.3s ease' }, pressed && { transform: [{ scale: 0.4 }] }]}>

                        <SolitoImage
                            src={`${yoqtirilganIds.includes(product.id) ? 'https://i.ibb.co/XkFkG62y/image.png' : 'https://i.ibb.co/GfZzh6Y7/heart.png'}`}
                            alt="heart Icon"
                            width={30}
                            height={30}
                            resizeMode="contain"
                        />
                    </Pressable>

                    <View style={styles.imageWrapper}>
                        <SolitoImage
                            src={product.image}
                            alt={product.title}
                            width={140}
                            height={140}
                            resizeMode="contain"
                        />
                    </View>

                    <Text numberOfLines={2} style={styles.productTitle}>
                        {product.title}
                    </Text>
                </View>

                <View style={styles.bottomSection}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceText}>
                            {(product.price * 12500).toLocaleString()} so'm
                        </Text>

                        <Pressable onPress={() => toggleCart(product.id)}>
                            <View style={[styles.button, isInCart && styles.buttonInCart]}>
                                <Text style={[styles.buttonText, isInCart && styles.buttonTextInCart]}>
                                    {isInCart ? 'Savatda ✓' : 'savatga qo\'shish'}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </TextLink>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 16 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
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

export default ProductCard