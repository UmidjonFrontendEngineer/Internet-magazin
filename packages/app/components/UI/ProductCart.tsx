'use client';

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { useCartStore } from "app/store/useCartStore";
import { useYoqtirilganStore } from "app/store/useYoqtirilganStore";
import { SolitoImage } from "solito/image";
import { useRouter } from "solito/navigation";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

interface ProductCardProps {
    product: ProductProps;
    products: ProductProps[];
}

const ProductCard = ({ product, products }: ProductCardProps) => {
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();

    const cartIds = useCartStore(state => state.cartIds);
    const toggleCart = useCartStore(state => state.toggleCart);

    const yoqtirilganIds = useYoqtirilganStore(state => state.yoqtirilganIds);
    const toggleYoqtirilgan = useYoqtirilganStore(state => state.toggleYoqtirilgan);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isInCart = isMounted && cartIds.includes(product.id);
    const isFavorite = isMounted && yoqtirilganIds.includes(product.id);

    const handleTargetIDs = (currentId: number) => {
        const currentIndex = products.findIndex(p => p.id === currentId);
        if (currentIndex === -1) return `${currentId}`;
        const nextProducts = products.slice(currentIndex, currentIndex + 10);
        return nextProducts.map(p => p.id).join(',');
    };

    const handleCardPress = () => {
        router.push(`/product/${handleTargetIDs(product.id)}`);
    };

    return (
        <Pressable 
            onPress={handleCardPress}
            style={[
                styles.card, 
                { width: windowWidth > 1400 ? '19%' : windowWidth > 1000 ? '24%' : windowWidth > 650 ? '31%' : windowWidth > 350 ? '48%' : '100%' }
            ]}
        >
            <View style={styles.topSection}>
                <Pressable 
                    onPress={(e) => {
                        e.stopPropagation();
                        toggleYoqtirilgan(product.id);
                    }} 
                    style={({ pressed }) => [
                        styles.favoriteButton, 
                        pressed && { transform: [{ scale: 0.9 }] }
                    ]}
                >
                    <SolitoImage
                        src={isFavorite ? 'https://i.ibb.co/XkFkG62y/image.png' : 'https://i.ibb.co/GfZzh6Y7/heart.png'}
                        alt="Favorite Icon"
                        width={24}
                        height={24}
                        resizeMode="contain"
                    />
                </Pressable>

                <View style={styles.imageWrapper}>
                    <SolitoImage
                        src={product.image}
                        alt={product.title}
                        width={130}
                        height={130}
                        resizeMode="contain"
                    />
                </View>

                <Text numberOfLines={2} style={styles.productTitle}>
                    {product.title}
                </Text>
            </View>

            <View style={styles.bottomSection}>
                <Text numberOfLines={1} style={styles.priceText}>
                    {(product.price * 12500).toLocaleString()} so'm
                </Text>

                <Pressable 
                    onPress={(e) => {
                        e.stopPropagation();
                        toggleCart(product.id);
                    }}
                    style={styles.cartButtonWrapper}
                >
                    <View style={[styles.button, isInCart && styles.buttonInCart]}>
                        <Text numberOfLines={1} style={[styles.buttonText, isInCart && styles.buttonTextInCart]}>
                            {isInCart ? 'Savatda ✓' : 'Savatga'}
                        </Text>
                    </View>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        justifyContent: 'space-between',
        display: 'flex', 
        flexDirection: 'column',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
            },
            android: {
                elevation: 1,
            },
            web: {
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                flexShrink: 0,
                flexGrow: 0,
            }
        })
    },
    topSection: {
        position: 'relative',
        width: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        zIndex: 10,
        top: 4,
        right: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 6,
        borderRadius: 100,
    },
    imageWrapper: {
        width: '100%',
        height: 150,
        backgroundColor: '#fcfcfc',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#2d3748',
        lineHeight: 18,
        minHeight: 36,
    },
    bottomSection: {
        marginTop: 10,
        gap: 8,
    },
    priceText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1a0dab',
    },
    cartButtonWrapper: {
        width: '100%',
    },
    button: {
        backgroundColor: 'rgb(0, 166, 255)',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInCart: {
        backgroundColor: 'rgba(0, 166, 255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgb(0, 166, 255)',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 13,
    },
    buttonTextInCart: {
        color: 'rgb(0, 166, 255)',
    },
});

export default ProductCard