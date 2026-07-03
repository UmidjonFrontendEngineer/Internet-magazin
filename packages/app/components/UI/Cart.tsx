'use client'
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useCartStore } from "app/store/useCartStore";
import { useYoqtirilganStore } from "app/store/useYoqtirilganStore";
import { SolitoImage } from "solito/image";

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

const CardProduct = ({ product }: { product: ProductProps }) => {
    const cartIds = useCartStore(state => state.cartIds);
    const toggleCart = useCartStore(state => state.toggleCart);

    const yoqtirilganIds = useYoqtirilganStore(state => state.yoqtirilganIds);
    // Bu yerdagi stete xatoligi tuzatildi
    const toggleYoqtirilgan = useYoqtirilganStore(state => state.toggleYoqtirilgan);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isInCart = isMounted && cartIds.includes(product.id);
    const isFavorite = isMounted && yoqtirilganIds.includes(product.id);

    // Soxta ma'lumotlar (Uzum dizaynini to'ldirish uchun)
    const quantity = 1; 
    const oldPrice = product.price * 1.5; // Chegirmadan oldingi soxta narx

    return (
        <View style={styles.card}>
            {/* Chap tomon: Rasm va Sevimlilar tugmasi */}
            <View style={styles.leftSection}>
                <View style={styles.imageWrapper}>
                    <SolitoImage
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        resizeMode="contain"
                    />
                </View>
                
                {/* Sevimlilarga qo'shish (Yurakcha) */}
                <Pressable 
                    onPress={() => toggleYoqtirilgan(product.id)} 
                    style={({ pressed }) => [styles.favoriteButton, pressed && { transform: [{ scale: 0.9 }] }]}
                >
                    <SolitoImage
                        src={isFavorite ? 'https://i.ibb.co/XkFkG62y/image.png' : 'https://i.ibb.co/GfZzh6Y7/heart.png'}
                        alt="heart Icon"
                        width={20}
                        height={20}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>

            {/* O'ng tomon: Ma'lumotlar va Narxlar */}
            <View style={styles.rightSection}>
                <View style={styles.headerRow}>
                    <Text numberOfLines={2} style={styles.productTitle}>
                        {product.title}
                    </Text>
                    
                    {/* O'chirish / Savatdan olib tashlash tugmasi */}
                    <Pressable onPress={() => toggleCart(product.id)} style={styles.deleteButton}>
                        <Text style={styles.deleteText}>Yo'q qilish</Text>
                    </Pressable>
                </View>

                {/* Qo'shimcha ma'lumotlar (Uzum stilida) */}
                <View style={styles.metaInfo}>
                    <Text style={styles.metaText}>Sotuvchi: <Text style={styles.metaValue}>Premium Store</Text></Text>
                    <Text style={styles.metaText}>Kategoriya: <Text style={styles.metaValue}>{product.category}</Text></Text>
                </View>

                {/* Pastki qism: Soni va Narxlar */}
                <View style={styles.footerRow}>
                    {/* Hisoblagich (Counter) - Faqat savatda bo'lsa yoki doimiy ko'rinadi */}
                    <View style={styles.counterContainer}>
                        <Pressable style={styles.counterBtn}>
                            <Text style={styles.counterBtnText}>-</Text>
                        </Pressable>
                        <Text style={styles.counterValue}>{quantity}</Text>
                        <Pressable style={styles.counterBtn}>
                            <Text style={styles.counterBtnText}>+</Text>
                        </Pressable>
                    </View>

                    {/* Narx bloki */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>
                            {(product.price * 12500).toLocaleString()} so'm
                        </Text>
                        <Text style={styles.oldPrice}>
                            {(oldPrice * 12500).toLocaleString()} so'm
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: isWeb ? '100%' : '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        justifyContent: 'space-between',
    },
    leftSection: {
        position: 'relative',
        marginRight: 16,
    },
    imageWrapper: {
        width: 110,
        height: 110,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    favoriteButton: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 100,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    rightSection: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#1f2937',
        lineHeight: 20,
        paddingRight: 8,
    },
    deleteButton: {
        paddingVertical: 2,
    },
    deleteText: {
        fontSize: 13,
        color: '#9ca3af',
    },
    metaInfo: {
        marginTop: 4,
        gap: 2,
    },
    metaText: {
        fontSize: 12,
        color: '#9ca3af',
    },
    metaValue: {
        color: '#4b5563',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
    },
    counterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f9fafb',
    },
    counterBtnText: {
        fontSize: 16,
        color: '#4b5563',
        fontWeight: '600',
    },
    counterValue: {
        paddingHorizontal: 12,
        fontSize: 14,
        fontWeight: '500',
        color: '#1f2937',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
    },
    oldPrice: {
        fontSize: 12,
        color: '#9ca3af',
        textDecorationLine: 'line-through',
        marginTop: 2,
    },
});

export default CardProduct;