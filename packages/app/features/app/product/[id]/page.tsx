'use client'
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable, useWindowDimensions, Animated, Platform, GestureResponderEvent } from 'react-native';
import { useNativeAnimDriver } from 'app/utils/animation';
import ScreenWrapper from 'app/components/layout/ScreenWrapper';
import ProductCart from 'app/components/UI/ProductCart';
import { useLanStorage } from 'app/store/useLanStore';
import { useSearchParams } from 'solito/navigation';
import { useInputStorage } from 'app/store/useInputStore';
import { usePathname } from 'solito/navigation';
import { SolitoImage } from 'solito/image';
import HeartPng from 'app/features/app/assets/heart.png'
import { useCartStore } from "app/store/useCartStore";
import { useYoqtirilganStore } from "app/store/useYoqtirilganStore";
import CartPng from 'app/features/app/assets/cart.png'
import CheckPng from 'app/features/app/assets/check.png'
import CheckedPng from 'app/features/app/assets/checked.png'
import { useRouter } from 'solito/navigation';
import Slider from 'app/components/UI/Slider';
import ProductSlider from 'app/components/UI/ProductSlider';
import accesStarPng from 'app/features/app/assets/acces-star.png'
import starPng from 'app/features/app/assets/star.png'

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

const ProductID = () => {
    const lan = useLanStorage(state => state.lan);
    const inputValue = useInputStorage(state => state.input);
    const pathname = usePathname();
    const { width: windowWidth } = useWindowDimensions();
    const router = useRouter();
    const isTabletView = windowWidth < 1000 && windowWidth > 500;
    const isMobileView = windowWidth < 500;

    const { id } = useSearchParams();
    const productIdToFind = id ? parseInt(id as string, 10) : Number(pathname?.split('/')[2]?.split(',')[0]);
    const productsIDs = pathname?.split('/')[2]?.split(',')?.slice(1).map(Number) || [];

    const [nextProducts, setNextProducts] = useState<ProductProps[]>([]);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [moon, setMoon] = useState(3);
    const [count, setCount] = useState(0)

    const { cart, toggleCart } = useCartStore();
    const product = products.find(p => p.id === productIdToFind);
    const isInCart = cart.some(item => item.id === product?.id);
    const toggleYoqtirilgan = useYoqtirilganStore(state => state.toggleYoqtirilgan);
    const yoqtirilganIds = useYoqtirilganStore(state => state.yoqtirilganIds);

    const [elementHeight, setElementHeight] = useState<number>(500);
    const elementRef = useRef<any>(null);

    const scaleAnim = useRef(new Animated.Value(0)).current;

    const handleFavoritePress = (e: GestureResponderEvent) => {
        e.stopPropagation();
        if (!product) return;
        toggleYoqtirilgan(product.id);

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: useNativeAnimDriver,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: useNativeAnimDriver,
            }),
        ]).start();
    };

    const heartScale = scaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.4],
    });

    const measureHeight = () => {
        if (Platform.OS === 'web' && elementRef.current) {
            const height = elementRef.current.offsetHeight;
            if (height > 0) {
                setElementHeight(height);
            }
        }
    };

    useEffect(() => {
        if (Platform.OS === 'web') {
            const timer = setTimeout(measureHeight, 150);
            window.addEventListener('resize', measureHeight);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', measureHeight);
            };
        }
    }, [loading]);

    const handleLayout = (event: any) => {
        if (Platform.OS !== 'web') {
            const { height } = event.nativeEvent.layout;
            if (height > 0) {
                setElementHeight(height);
            }
        }
    };

    useEffect(() => {
        const saralanganMaxsulotlar = products.filter(maxsulot => {
            return productsIDs.includes(maxsulot.id);
        });
        setNextProducts(saralanganMaxsulotlar);
    }, [products]);

    useEffect(() => {
        if (loading || products.length === 0) return;

        const VISIBLE_ITEMS = 5;
        const maxScrollIndex = Math.max(0, products.length - VISIBLE_ITEMS);

        const timer = setInterval(() => {
            setCount(prev => {
                return prev < maxScrollIndex ? prev + 1 : 0;
            });
        }, 5000);

        return () => clearInterval(timer);
    }, [loading, products.length]);

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
                <View style={{ width: '100%', flexDirection: (isTabletView || isMobileView) ? 'column' : 'row', gap: 16, padding: 20 }}>

                    <View style={{ flex: 7, flexDirection: 'row', gap: 16, minHeight: (isTabletView || isMobileView) ? undefined : elementHeight, maxHeight: isTabletView ? 400 : isMobileView ? 200 : undefined }}>
                        <View style={{ flex: 3, flexDirection: 'row', gap: 20 }}>
                            {(isTabletView || isMobileView) ? null : (
                                <View style={{ flex: 15, height: isTabletView ? 400 : isMobileView ? 200 : elementHeight, gap: 8 }}>
                                    <ProductSlider products={products} count={count} setCount={setCount} />
                                </View>
                            )}
                            <View style={{ flex: 85, height: isTabletView ? 400 : isMobileView ? 200 : elementHeight, gap: 5 }}>
                                <Slider products={products} link={false} count={count} setCount={setCount} />
                            </View>
                        </View>
                        {!(isTabletView || isMobileView) ? (
                            <View style={{ flex: 2, height: elementHeight, padding: 10, gap: 8 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', textTransform: 'capitalize' }}>{product.title}</Text>
                                <View style={{ flexDirection: 'row', gap: 4 }}>
	                                {
	                                		Array.from({ length: Math.round(product.rating.rate) }, (_, index) => index + 1).map((_, index) => 
	                                            <SolitoImage
	                                            	key={index}
	                                                src={accesStarPng}
	                                                alt={product.title}
	                                                width={20}
	                                                height={20}
	                                                resizeMode='contain'
	                                            />
	
	                                		)
	                                }
	                                {
	                                Array.from({ length: Math.round(5 - product.rating.rate) }, (_, index) => index + 1).map((_, index) => 
	                                            <SolitoImage
	                                            	key={index}
	                                                src={starPng}
	                                                alt={product.title}
	                                                width={20}
	                                                height={20}
	                                                resizeMode='contain'
	                                            />
	
	                                		)
	                                }
	                                <Text>{product.rating.rate} | {product.rating.count} sharh | {product.id}+ buyrutma</Text>
                                </View>
                            </View>
                        ) : null}
                    </View>

                    <View
                        style={{ flex: 3, gap: 8 }}
                        ref={Platform.OS === 'web' ? elementRef : undefined}
                        onLayout={handleLayout}
                    >
                        <View style={{ width: '100%', paddingTop: 50, gap: 5, borderRadius: 28, backgroundColor: 'rgba(0, 166, 255, 0.6)' }}>
                            <View style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderTopLeftRadius: 28, borderTopRightRadius: 26, padding: 20, gap: 22 }}>
                                {(isTabletView || isMobileView) ? <Text style={{ fontWeight: '700', fontSize: 20 }}>{product.title}</Text> : null}
                                <Text style={{ fontWeight: '700', fontSize: 30 }}>{product.price} so'm</Text>
                                <Text style={{ fontWeight: '400', fontSize: 14, textDecorationLine: 'line-through', color: 'gray' }}>{((product.price / 100) * 120).toFixed(0)}</Text>

                                <View style={{ width: '100%', padding: 10, gap: 6, backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 14 }}>
                                    <View style={{ width: '100%', padding: 4, gap: 4, borderRadius: 6, backgroundColor: '#9c9c9c', flexDirection: 'row' }}>
                                        <Pressable onPress={() => setMoon(24)} style={{ padding: 6, borderRadius: 6, backgroundColor: 'snow', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: '700' }}>24 oy</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setMoon(12)} style={{ padding: 6, borderRadius: 6, backgroundColor: 'snow', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: '700' }}>12 oy</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setMoon(6)} style={{ padding: 6, borderRadius: 6, backgroundColor: 'snow', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: '700' }}>6 oy</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setMoon(3)} style={{ padding: 6, borderRadius: 6, backgroundColor: 'snow', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontWeight: '700' }}>3 oy</Text>
                                        </Pressable>
                                    </View>
                                    <Pressable style={{ width: '100%', padding: 8, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text><Text style={{ padding: 6, backgroundColor: 'yellow', borderRadius: 10, fontWeight: 'bold', fontSize: 16 }}>{(product.price / moon).toFixed(0)} so'm</Text> × {moon} oy</Text>
                                        <Text style={{ fontSize: 16 }}>{'>'}</Text>
                                    </Pressable>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', gap: 22 }}>
                                    <Pressable style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: 12, borderRadius: 14, flex: 9, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: '700', textTransform: 'capitalize' }}>1 klikda xarid qilish</Text>
                                    </Pressable>
                                    <Pressable onPress={handleFavoritePress} style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', padding: 12, borderRadius: 14, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                                            <SolitoImage
                                                src={yoqtirilganIds.includes(product.id) ? 'https://i.ibb.co/XkFkG62y/image.png' : 'https://i.ibb.co/GfZzh6Y7/heart.png'}
                                                alt="Favorite Icon"
                                                width={24}
                                                height={24}
                                                resizeMode="contain"
                                            />
                                        </Animated.View>
                                    </Pressable>
                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', gap: 22 }}>
                                    <Pressable
                                        onPress={(e: any) => {
                                            e.stopPropagation();
                                            toggleCart(product.id);
                                        }}
                                        style={[styles.button, isInCart ? styles.buttonInCart : styles.button, { flex: 8 }]}>
                                        <Text style={[styles.buttonText, isInCart && styles.buttonTextInCart]}>{isInCart ? 'savatda ✓' : 'savatga qo\'shish'}</Text>
                                    </Pressable>
                                    {isInCart ? (
                                        <Pressable onPress={() => router.push('/savat')} style={{
                                            flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 166, 255, 0.2)', borderRadius: 10, borderWidth: 1,
                                            borderColor: 'rgb(0, 166, 255)',
                                        }}>
                                            <SolitoImage
                                                src={CartPng}
                                                alt={product.title}
                                                width={30}
                                                height={30}
                                                resizeMode='contain'
                                            />
                                        </Pressable>
                                    ) : null}
                                </View>

                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                    <SolitoImage
                                        src={CheckPng}
                                        alt='check'
                                        width={30}
                                        height={30}
                                        resizeMode='contain'
                                    />
                                    <Text>{product.id * 2} dona xarid qilish mumkin</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                    <View>
                                        <SolitoImage
                                            src={CartPng}
                                            alt='cart'
                                            width={30}
                                            height={30}
                                            resizeMode='contain'
                                        />
                                        <SolitoImage
                                            style={{ position: 'absolute', bottom: 0, right: 0 }}
                                            src={CheckedPng}
                                            alt='check'
                                            width={10}
                                            height={10}
                                            resizeMode='contain'
                                        />
                                    </View>
                                    <Text>Bu haftada 5 kishi sotib oldi</Text>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', top: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'snow', textTransform: 'capitalize' }}>yozgi chegirmalar <Text style={{ fontSize: 20 }}>{'>'}</Text></Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'snow', textTransform: 'capitalize' }}>{new Date().getSeconds()} kun qoldi</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 12 }}>
                    {nextProducts.map(item => (
                        <ProductCart key={item.id} product={item} products={nextProducts} />
                    ))}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 16,
    },
    buttonTextInCart: {
        color: 'rgb(0, 166, 255)',
    },
});

export default ProductID;