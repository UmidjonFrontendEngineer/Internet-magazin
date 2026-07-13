'use client'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCart from 'app/components/UI/ProductCart';
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

const { width } = Dimensions.get('window');

const ProductID = () => {
    const lan = useLanStorage(state => state.lan);
    const inputValue = useInputStorage(state => state.input);
    const pathname = usePathname()

    const { id } = useSearchParams();
    const productIdToFind = id ? parseInt(id as string, 10) : Number(pathname?.split('/')[2]?.split(',')[0]);
    console.log(pathname?.split('/')[2])
    console.log(pathname?.split('/')[2]?.split(',')?.slice(1))
    const productsIDs = pathname?.split('/')[2]?.split(',')?.slice(1).map(Number) || []
    const [nextProducts, setNextProducts] = useState<ProductProps[]>([])
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saralanganMaxsulotlar = products.filter(maxsulot => {
            return productsIDs.includes(maxsulot.id);
        });
        setNextProducts(saralanganMaxsulotlar)
    }, [products])

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

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const product = products.find(p => p.id === productIdToFind);

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Mahsulot topilmadi</Text>
            </View>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView>
                <View style={styles.mainWrapper}>

                    <View style={styles.leftColumn}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{width: '50%'}}>
                                <View style={[styles.card, styles.row]}>
                                    <View style={styles.sliderThumbnails}>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <View key={i} style={styles.thumbnailPlaceholder} />
                                        ))}
                                    </View>
                                    <View style={styles.mainImagePlaceholder} />
                                </View>
                            </View>

                            <View style={{widht: '50%'}}>
                                <View style={styles.card}>
                                    <Text style={styles.productTitle}>{product.title}</Text>
                                    <View style={styles.metaRow}>
                                        <Text style={styles.stars}>⭐⭐⭐⭐⭐ <Text style={styles.ratingValue}>5.0</Text></Text>
                                        <Text style={styles.blueLink}>(6 sharh)</Text>
                                        <Text style={styles.mutedText}>• 16 fotosurat • 20+ buyurtma</Text>
                                    </View>
                                </View>


                                <View style={styles.card}>
                                    <Text style={styles.sectionLabel}>Xotira: <Text style={styles.boldText}>825 GB Digital Slim Edition</Text></Text>
                                    <View style={styles.chipsRow}>
                                        <Pressable style={[styles.chip, styles.chipActive]}>
                                            <Text style={styles.chipTextActive}>825 GB Digital Slim Edition</Text>
                                        </Pressable>
                                        <Pressable style={styles.chip}><Text style={styles.chipText}>1 TB Digital Slim Edition</Text></Pressable>
                                        <Pressable style={styles.chip}><Text style={styles.chipText}>2TB PRO Digital</Text></Pressable>
                                        <Pressable style={styles.chip}><Text style={styles.chipText}>2 TB Digital Slim O'yinlar bilan</Text></Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.spaceBetweenRow}>
                                <Text style={styles.sectionLabel}>Xaridorlar sharhlari</Text>
                                <Text style={styles.blueLink}>Barchasi (6)</Text>
                            </View>

                            <View style={styles.reviewImagesGrid}>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <View key={i} style={styles.reviewPhotoPlaceholder} />
                                ))}
                            </View>

                            <View style={styles.reviewCardsContainer}>
                                <View style={styles.userReviewCard}>
                                    <View style={styles.userInfo}>
                                        <View style={styles.avatarPlaceholder} />
                                        <View>
                                            <Text style={styles.userName}>Shohruh</Text>
                                            <Text style={styles.dateText}>27 iyul</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.starsSmall}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.reviewComment}><Text style={styles.boldText}>Afzalliklari:</Text> Karobkasidan daje ochilmagan, yangi holatda.</Text>
                                </View>

                                <View style={styles.userReviewCard}>
                                    <View style={styles.userInfo}>
                                        <View style={styles.avatarPlaceholder} />
                                        <View>
                                            <Text style={styles.userName}>Мирзо</Text>
                                            <Text style={styles.dateText}>10 iyul</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.starsSmall}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.reviewComment}><Text style={styles.boldText}>Izoh:</Text> Rahmat, hammasi vaqtida yetib keldi.</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={styles.rightColumn}>

                        <View style={[styles.card, styles.stickyCard]}>

                            <View style={styles.chillaHeader}>
                                <Text style={styles.chillaText}>Chilla ➔</Text>
                                <View style={styles.badge}><Text style={styles.badgeText}>3 kun qoldi</Text></View>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.oldPriceText}>9 000 000 so'm</Text>
                                <Text style={styles.currentPriceText}>6 830 010 so'm</Text>
                            </View>

                            <View style={styles.divider} />

                            <Text style={styles.smallLabel}>Muddatli to'lov variantlari:</Text>
                            <View style={styles.monthSelectorGrid}>
                                <View style={styles.monthTab}><Text style={styles.monthTabText}>3 oy</Text></View>
                                <View style={styles.monthTab}><Text style={styles.monthTabText}>6 oy</Text></View>
                                <View style={styles.monthTab}><Text style={styles.monthTabText}>12 oy</Text></View>
                                <View style={[styles.monthTab, styles.monthTabActive]}>
                                    <Text style={styles.monthTabTextActive}>24 oy</Text>
                                </View>
                            </View>

                            <View style={styles.monthlyPriceBadge}>
                                <Text style={styles.monthlyPriceText}><Text style={styles.boldText}>483 792 so'm</Text> / oyiga x 24 oy</Text>
                            </View>

                            <Pressable style={styles.oneClickBtn}>
                                <Text style={styles.oneClickBtnText}>1 klikda xarid qilish</Text>
                            </Pressable>

                            <Pressable style={styles.addToCartBtn}>
                                <Text style={styles.addToCartBtnText}>Savatga qo'shish</Text>
                            </Pressable>

                            <View style={styles.statusInfo}>
                                <Text style={styles.greenText}>✔️ 5 dona xarid qilish mumkin</Text>
                                <Text style={styles.infoText}>🔥 Bu haftada 3 kishi sotib oldi</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardInfoTitle}>Ertaga yetkazib beramiz</Text>
                            <Text style={styles.cardInfoDesc}>Topshirish punktiga yoki kuryer orqali manzilingizga</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardInfoTitle}>Qulay usulda xavfsiz to'lov</Text>
                            <Text style={styles.cardInfoDesc}>Karta orqali, naqd pulda yoki bo'lib to'lashga rasmiylashtirish</Text>
                            <View style={styles.paymentIconsRow}>
                                {[1, 2, 3, 4].map((i) => <View key={i} style={styles.miniIcon} />)}
                            </View>
                        </View>

                    </View>

                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 12 }}>
                    {
                        nextProducts.map(item => (
                            <ProductCart key={item.id} product={item} products={nextProducts} />
                        ))
                    }
                </View>
            </ScrollView>
        </ScreenWrapper >
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginVertical: 4,
    },
    centerContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    mainWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    leftColumn: {
        width: '65%',
        gap: 15,
    },
    rightColumn: {
        width: '32%',
        gap: 15,
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
    },
    spaceBetweenRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },

    sliderThumbnails: {
        width: 70,
        gap: 10,
        marginRight: 15,
    },
    thumbnailPlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    mainImagePlaceholder: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 10,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    stars: {
        color: '#ffc107',
        fontWeight: 'bold',
    },
    ratingValue: {
        color: '#1f2937',
    },
    blueLink: {
        color: '#007bff',
        fontWeight: '500',
    },
    mutedText: {
        color: '#6c757d',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
        marginBottom: 12,
    },
    boldText: {
        fontWeight: '700',
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
        backgroundColor: '#fff',
    },
    chipActive: {
        borderColor: '#723eeb',
        backgroundColor: '#f3efff',
    },
    chipText: {
        color: '#495057',
        fontSize: 13,
    },
    chipTextActive: {
        color: '#723eeb',
        fontWeight: '600',
        fontSize: 13,
    },

    reviewImagesGrid: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    reviewPhotoPlaceholder: {
        width: 56,
        height: 56,
        backgroundColor: '#eee',
        borderRadius: 6,
    },
    reviewCardsContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    userReviewCard: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        backgroundColor: '#ced4da',
        borderRadius: 16,
    },
    userName: {
        fontWeight: '600',
        fontSize: 13,
    },
    dateText: {
        fontSize: 11,
        color: '#adb5bd',
    },
    starsSmall: {
        fontSize: 11,
        marginBottom: 6,
    },
    reviewComment: {
        fontSize: 13,
        color: '#495057',
        lineHeight: 18,
    },

    stickyCard: {
        borderColor: '#723eeb',
        borderWidth: 1.5,
    },
    chillaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    chillaText: {
        color: '#723eeb',
        fontWeight: '700',
        fontSize: 16,
    },
    badge: {
        backgroundColor: '#ff3366',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    priceContainer: {
        marginBottom: 5,
    },
    oldPriceText: {
        fontSize: 14,
        color: '#adb5bd',
        textDecorationLine: 'line-through',
        marginBottom: 2,
    },
    currentPriceText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1f2937',
    },
    smallLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 8,
    },
    monthSelectorGrid: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 10,
    },
    monthTab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#f1f3f5',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    monthTabActive: {
        backgroundColor: '#fffbe6',
        borderColor: '#ffc107',
    },
    monthTabText: {
        fontSize: 12,
        color: '#495057',
    },
    monthTabTextActive: {
        fontSize: 12,
        color: '#b08d0a',
        fontWeight: '700',
    },
    monthlyPriceBadge: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        borderRadius: 6,
        marginBottom: 15,
    },
    monthlyPriceText: {
        fontSize: 13,
        color: '#212529',
    },
    oneClickBtn: {
        backgroundColor: '#f1f3f5',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    oneClickBtnText: {
        color: '#212529',
        fontWeight: '600',
    },
    addToCartBtn: {
        backgroundColor: '#723eeb',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    addToCartBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    statusInfo: {
        gap: 6,
    },
    greenText: {
        color: '#198754',
        fontSize: 12,
        fontWeight: '500',
    },
    infoText: {
        color: '#6c757d',
        fontSize: 12,
    },
    cardInfoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#212529',
        marginBottom: 4,
    },
    cardInfoDesc: {
        fontSize: 12,
        color: '#6c757d',
        lineHeight: 16,
    },
    paymentIconsRow: {
        flexDirection: 'row',
        gap: 6,
        marginTop: 10,
    },
    miniIcon: {
        width: 35,
        height: 22,
        backgroundColor: '#eee',
        borderRadius: 4,
    }
});

export default ProductID;