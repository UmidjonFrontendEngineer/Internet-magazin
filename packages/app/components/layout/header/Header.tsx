"use client"

import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, useWindowDimensions, Pressable, Animated, Dimensions } from 'react-native'
import { TextLink } from 'solito/link'
import { useColorStore } from 'app/store/useColorStore'
import { SolitoImage } from 'solito/image'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import Language from 'app/components/UI/Language'
import { useLanStorage } from 'app/store/useLanStore'
import { useInputStorage } from 'app/store/useInputStore'
import { useRouter } from 'solito/navigation'
import { useCartStore } from 'app/store/useCartStore'
import { useYoqtirilganStore } from 'app/store/useYoqtirilganStore'
import { useTabStore } from 'app/store/useTabStore'
import { usePathname } from 'solito/navigation'
import { uselocationStorage } from 'app/store/useLocationStore'
import Location from 'app/components/UI/Location'
import SearchPng from 'app/features/app/assets/search.png'
import UserPng from 'app/features/app/assets/user.png'
import CartPng from 'app/features/app/assets/cart.png'
import HeartPng from 'app/features/app/assets/heart.png'
import CatalogPng from 'app/features/app/assets/catalog.png'
import HomePng from 'app/features/app/assets/home.png'
import GrapePng from 'app/features/app/assets/grape.png'
import UzPng from 'app/features/app/assets/uzbekistan.png'
import EnPng from 'app/features/app/assets/united-kingdom.png'
import RuPng from 'app/features/app/assets/russia.png'

const SearchIcon = () => (
    <SolitoImage
        src={SearchPng}
        alt="search"
        width={30}
        height={30}
        resizeMode="contain"
    />
)

const HomeIcon = () => (
    <SolitoImage
        src={HomePng}
        alt="home"
        width={30}
        height={30}
        resizeMode="contain"
    />
)
const UserIcon = () => (
    <SolitoImage
        src={UserPng}
        alt="profile"
        width={30}
        height={30}
        resizeMode="contain"
    />
)

const HeartIcon = () => (
    <SolitoImage
        src={HeartPng}
        alt="heart"
        width={30}
        height={30}
        resizeMode="contain"
    />
)

const CartIcon = () => (
    <SolitoImage
        src={CartPng}
        alt="kart"
        width={30}
        height={30}
        resizeMode="contain"
    />
)

const CatalogIcon = () => (
    <SolitoImage
        src={CatalogPng}
        alt="katalog"
        width={30}
        height={30}
        resizeMode="contain"
    />
)

const Header = () => {
    const color = useColorStore((state) => state.color)
    const location = uselocationStorage(state => state.location)
    const { width: windowWidth } = useWindowDimensions()
    const [isHydrated, setIsHydrated] = useState(false)
    const cartIds = useCartStore(state => state.cartIds)
    const yoqtirilganIds = useYoqtirilganStore(state => state.yoqtirilganIds)
    const router = useRouter()
    const tab = useTabStore(state => state.tab)
    const setTab = useTabStore(state => state.setTab)
    const pathname = usePathname()
    const [locationOpen, setLocationOpen] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const currentWidth = isHydrated ? windowWidth : 1200
    const isMobileView = currentWidth < 1000

    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: tab,
            duration: 300,
            useNativeDriver: false
        }).start()
    }, [tab])

    const handlePage = (path: string, num: number) => {
        router.push(path)
        setTab(num)
    }

    useEffect(() => {
        if (!pathname) return

        if (pathname === '/') setTab(0)
        else if (pathname.startsWith('/katalog')) setTab(1)
        else if (pathname.startsWith('/savat')) setTab(2)
        else if (pathname.startsWith('/yoqtirilgan')) setTab(3)
        else if (pathname.startsWith('/profile')) setTab(4)
        else if (pathname.startsWith('/search')) setTab(1)
    }, [pathname])

    const marginLeft = animValue.interpolate({
        inputRange: [0, 4],
        outputRange: ['0%', '80%']
    })

    const [openLan, setOpenLan] = useState(false)
    const lan = useLanStorage(state => state.lan)

    const input = useInputStorage(state => state.input)
    const setInput = useInputStorage(state => state.setInput)

    if (isMobileView) {
        return (
            <>
                {(tab !== 1 && tab !== 2 && tab !== 4) ? (
                    <View style={{
                        ...Platform.select({
                            web: {
                                position: 'fixed',
                            },
                            default: {
                                position: 'absolute',
                            }
                        }),
                        top: Platform.OS !== 'web' ? 24 : 10,
                        left: '50%',
                        right: '50%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999999999,
                        width: '80%',
                        height: 40
                    }}>
                        <View style={[styles.searchContainer, { transform: [{ translateX: '-50%' }], height: '100%' }]}>
                            <TextInput
                                onChangeText={text => setInput(text)}
                                placeholder={`${lan === 'uz' ? 'Mahsulotlar va turkumlar izlash' : lan === 'en' ? 'Search products and categories' : lan === 'ru' ? 'Искать товары и категории' : 'Mahsulotlar va turkumlar izlash'}`}
                                style={[styles.searchInput, { height: '100%' }]}
                                placeholderTextColor="rgba(0, 149, 255, 0.6)"
                                value={input}
                            />
                            <TextLink href={`/search/${input.split(' ').join('-').toLocaleLowerCase().trim()}`} style={styles.searchIconWrapper}>
                                <SearchIcon />
                            </TextLink>
                        </View>

                    </View>
                ) : null}

                <View style={[styles.mobileTabBarC]}>
                    <View style={[styles.mobileTabBar]}>

                        <BlurView
                            intensity={30}
                            tint="light"
                            style={[StyleSheet.absoluteFill, { borderRadius: 100 }]}
                        />

                        <Animated.View style={{
                            top: 0,
                            left: marginLeft,
                            width: '20%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 149, 255, 0.3)',
                            pointerEvents: 'none',
                            borderRadius: 100,
                            ...Platform.select({
                                web: {
                                    background: 'rgba(0, 149, 255, 0.3)',
                                    position: 'absolute',
                                },
                                default: {
                                    position: 'absolute',
                                }
                            }),
                            zIndex: 999999999,
                        }}>
                        </Animated.View>

                        {Platform.OS !== 'web' ? (
                            <>
                                <Pressable style={styles.mobileTabItem} onPress={() => handlePage('/', 0)}>
                                    <View style={styles.mobileTabItem}>
                                        <HomeIcon />
                                    </View>
                                </Pressable>

                                <Pressable style={styles.mobileTabItem} onPress={() => handlePage('/katalog', 1)}>
                                    <View style={styles.mobileTabItem}>
                                        <SearchIcon />
                                    </View>
                                </Pressable>

                                <Pressable style={styles.mobileTabItem} onPress={() => handlePage('/savat', 2)}>
                                    <View style={styles.mobileTabItem}>
                                        <View style={styles.badgeContainer}>
                                            <CartIcon />
                                            {cartIds.length > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{cartIds.length}</Text></View> : null}
                                        </View>
                                    </View>
                                </Pressable>

                                <Pressable style={styles.mobileTabItem} onPress={() => handlePage('/yoqtirilgan', 3)}>
                                    <View style={styles.mobileTabItem}>
                                        <View style={styles.badgeContainer}>
                                            <HeartIcon />
                                            {yoqtirilganIds.length > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{yoqtirilganIds.length}</Text></View> : null}
                                        </View>
                                    </View>
                                </Pressable>

                                <Pressable style={styles.mobileTabItem} onPress={() => handlePage('/profile', 4)}>
                                    <View style={styles.mobileTabItem}>
                                        <UserIcon />
                                    </View>
                                </Pressable>

                            </>
                        ) : (
                            <>
                                <TextLink href='/' style={styles.mobileTabItem}>
                                    <View style={styles.mobileTabItem}>
                                        <HomeIcon />
                                    </View>
                                </TextLink>

                                <TextLink href='/katalog' style={styles.mobileTabItem}>
                                    <View style={styles.mobileTabItem}>
                                        <SearchIcon />
                                    </View>
                                </TextLink>

                                <TextLink href='/savat' style={styles.mobileTabItem}>
                                    <View style={styles.mobileTabItem}>
                                        <View style={styles.badgeContainer}>
                                            <CartIcon />
                                            {cartIds.length > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{cartIds.length}</Text></View> : null}
                                        </View>
                                    </View>
                                </TextLink>

                                <TextLink href='/yoqtirilgan' style={styles.mobileTabItem}>
                                    <View style={styles.mobileTabItem}>
                                        <View style={styles.badgeContainer}>
                                            <HeartIcon />
                                            {yoqtirilganIds.length > 0 ? <View style={styles.badge}><Text style={styles.badgeText}>{yoqtirilganIds.length}</Text></View> : null}
                                        </View>
                                    </View>
                                </TextLink>

                                <TextLink href='/profile' style={styles.mobileTabItem}>
                                    <View style={styles.mobileTabItem}>
                                        <UserIcon />
                                    </View>
                                </TextLink>
                            </>
                        )}
                    </View >

                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgb(255, 255, 255)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            paddingHorizontal: 5000,
                            flexDirection: 'row',
                            height: 100,
                            left: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            ...Platform.select({
                                web: {
                                    position: 'fixed',
                                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
                                },
                                default: {
                                    position: 'absolute',
                                }
                            }),
                        }}>

                    </LinearGradient>

                </View >

                <LinearGradient
                    colors={['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        top: 0,
                        left: 0,
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 99999,
                        width: '100%',
                        pointerEvents: 'none',
                        paddingHorizontal: 5000,
                        ...Platform.select({
                            web: {
                                position: 'fixed',
                                background: 'linear-gradient(to bottom, rgb(255, 255, 255), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))'
                            },
                            default: {
                                position: 'absolute',
                            }
                        }),
                    }}>

                </LinearGradient>

            </>
        )
    }
    // border: '1px solid white'
    return (
        <>
            <View style={styles.webHeaderWrapper}>
                <View style={styles.topBar}>
                    <View style={[styles.containerRow, { backgroundColor: '#f4f5f5', height: 28 }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>📍 </Text>
                            {locationOpen ? <Location setLocationOpen={setLocationOpen} /> : <Pressable onPress={() => setLocationOpen(true)}><Text>{location}</Text></Pressable>}
                            <Text> | </Text>
                            <TextLink href='/about/punkt'><Text>{lan === 'uz' ? 'Topshirish punktlari' : lan === 'en' ? 'Pickup points' : lan === 'ru' ? 'Пункты выдачи' : 'Topshirish punktlari'}</Text></TextLink>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 14, height: '100%' }}>
                            <TextLink href='https://seller.uzum.uz/?utm_source=uzum_market_main&utm_medium=web&utm_campaign=header_link'><Text>{lan === 'uz' ? "Sotuvchi bo'lish" : lan === 'en' ? 'Become a seller' : lan === 'ru' ? 'ПСтать продавцом' : "Sotuvchi bo'lish"}</Text></TextLink>
                            <Text>|</Text>
                            <TextLink href='https://promo.uzum.uz/uz/promo/pvz'><Text>{lan === 'uz' ? 'Topshirish punktini ochish' : lan === 'en' ? 'Pickup points' : lan === 'ru' ? 'Пункты выдачи' : 'Topshirish punktini ochish'}</Text></TextLink>
                            <TextLink href='/savolJavob'><Text>{lan === 'uz' ? 'Savol-javob' : lan === 'en' ? 'FAQ (yoki Questions & Answers)' : lan === 'ru' ? 'Вопросы и ответы (или Частые вопросы)' : 'Savol-javob'}</Text></TextLink>
                            <Text>{lan === 'uz' ? 'Buyrutmalarim' : lan === 'en' ? 'My orders' : lan === 'ru' ? 'Мои заказы' : 'Buyrutmalarim'}</Text>
                            <View style={{ width: 80 }}>
                                {openLan ? <Language setOpenLan={setOpenLan} /> :
                                    <Pressable style={{ paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'rgba(226, 245, 255, 0.6)', width: '100%', alignItems: 'center', justifyItems: 'center', flexDirection: 'row', gap: 4 }} onPress={() => setOpenLan(prew => !prew)}>
                                        <SolitoImage
                                            src={lan === 'uz' ? UzPng : lan === 'ru' ? RuPng : lan === 'en' ? EnPng : ''}
                                            alt={lan === 'uz' ? 'uz' : lan === 'ru' ? 'ru' : lan === 'en' ? 'en' : ''}
                                            width={20}
                                            height={15}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ textTransform: 'uppercase', fontSize: 15 }}>{lan}</Text>
                                    </Pressable>
                                }
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.mainHeader}>

                    <LinearGradient
                        colors={['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            pointerEvents: 'none',
                            paddingHorizontal: 5000,
                            flexDirection: 'row',
                            height: 100,
                            left: 0,
                            top: 30,
                            width: '100%',
                            ...Platform.select({
                                web: {
                                    position: 'fixed',
                                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0), rgb(255, 255, 255))'
                                },
                                default: {
                                    position: 'absolute',
                                }
                            }),
                        }}>

                    </LinearGradient>

                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgb(255, 255, 255)']}
                        location={[0.9, 0.1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{
                            top: 0,
                            left: 0,
                            height: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 99999,
                            width: '100%',
                            pointerEvents: 'none',
                            paddingHorizontal: 5000,
                            ...Platform.select({
                                web: {
                                    position: 'fixed',
                                    background: 'linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))'
                                },
                                default: {
                                    position: 'absolute',
                                }
                            }),
                        }}>

                    </LinearGradient>

                    <View style={[styles.containerRow, { zIndex: 999999999999 }]}>

                        <BlurView
                            intensity={15}
                            tint="light"
                            style={[StyleSheet.absoluteFill, { borderRadius: 100 }]}
                        />

                        <TextLink href='/'>
                            <View style={{ gap: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <SolitoImage
                                    src={GrapePng}
                                    alt="home Icon"
                                    width={30}
                                    height={30}
                                    resizeMode="contain"
                                />
                                <Text style={{ textTransform: 'capitalize', fontSize: 20, color: '#3B9EFE', fontWeight: 'bold' }}>online market</Text>
                            </View>
                        </TextLink>

                        <TextLink href='/katalog'>
                            <View style={styles.catalogButton}>
                                <CatalogIcon />
                                <Text style={styles.catalogButtonText}>{lan === 'uz' ? 'Katalog' : lan === 'en' ? 'Catalog' : lan === 'ru' ? 'Каталог' : 'Katalog'}</Text>
                            </View>
                        </TextLink>

                        <View style={styles.searchContainer}>
                            <TextInput
                                onChangeText={text => setInput(text)}
                                placeholder={`${lan === 'uz' ? 'Mahsulotlar va turkumlar izlash' : lan === 'en' ? 'Search products and categories' : lan === 'ru' ? 'Искать товары и категории' : 'Mahsulotlar va turkumlar izlash'}`}
                                style={styles.searchInput}
                                placeholderTextColor="rgba(0, 149, 255, 0.6)"
                                value={input}
                            />
                            <TextLink href={`/search/${input.split(' ').join('-').toLocaleLowerCase().trim()}`} style={styles.searchIconWrapper}>
                                <SearchIcon />
                            </TextLink>
                        </View>

                        <View style={styles.navLinks}>
                            <TextLink href='/profile'>
                                <View style={styles.navItem}>
                                    <UserIcon />
                                    <Text style={styles.navText}>{lan === 'uz' ? 'Kirish' : lan === 'en' ? 'Sign in' : lan === 'ru' ? 'Войти' : 'Kirish'}</Text>
                                </View>
                            </TextLink>
                            <TextLink href='/yoqtirilgan'>
                                <View style={styles.navItem}>
                                    <View style={styles.badgeContainer}>
                                        {yoqtirilganIds.length > 0 ? <View style={styles.webBadge}><Text style={styles.badgeText}>{yoqtirilganIds.length}</Text></View> : null}
                                        <HeartIcon />
                                    </View>
                                    <Text style={styles.navText}>{lan === 'uz' ? 'Saralangan' : lan === 'en' ? 'Favorites' : lan === 'ru' ? 'Избранное' : 'Saralangan'}</Text>
                                </View>
                            </TextLink>
                            <TextLink href='/savat'>
                                <View style={styles.navItem}>
                                    <View style={styles.badgeContainer}>
                                        <CartIcon />
                                        {cartIds.length > 0 ? <View style={styles.webBadge}><Text style={styles.badgeText}>{cartIds.length}</Text></View> : null}
                                    </View>
                                    <Text style={styles.navText}>{lan === 'uz' ? 'Savat' : lan === 'en' ? 'Cart' : lan === 'ru' ? 'Корзина' : 'Savat'}</Text>
                                </View>
                            </TextLink>

                        </View>

                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        zIndex: 99999999999999,
    },
    topBarText: {
        fontSize: 13,
        color: '#4d4e4e',
    },
    mainHeader: {
        ...Platform.select({
            web: {
                position: 'fixed',
            },
            default: {
                position: 'absolute',
            }
        }),
        top: 30,
        left: 0,
        right: 0,
        paddingVertical: 16,
        backgroundColor: 'transparent',
    },
    containerRow: {
        width: '100%',
        maxWidth: 1440,
        marginHorizontal: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(226, 245, 255, 0.2)',
        borderRadius: 100,
        paddingVertical: 2,
        zIndex: 99999999999999,
        boxShadow: '0 0 5px rgb(226, 245, 255)'
    },
    logoText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#3B9EFE',
        letterSpacing: -0.5,
    },
    catalogButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 149, 255, 0.3)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 80,
        marginLeft: 20,
        gap: 10,
    },
    catalogButtonText: {
        color: '#3B9EFE',
        fontWeight: '600',
        fontSize: 15,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(226, 245, 255)',
        borderRadius: 80,
        marginHorizontal: 20,
        backgroundColor: 'rgba(226, 245, 255, 0.4)',
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        ...Platform.select({ web: { outlineStyle: 'none' } }),
    },
    searchIconWrapper: {
        padding: 10,
        backgroundColor: 'rgba(226, 245, 255, 0.3)',
        borderRadius: 80,
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    navText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#3B9EFE',
    },
    iconText: {
        fontSize: 18,
    },
    mobileIcon: {
        fontSize: 22,
        marginBottom: 2,
    },
    badgeContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -8,
        backgroundColor: 'rgb(0, 166, 255)',
        borderRadius: 9,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    webBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'rgb(0, 166, 255)',
        borderRadius: 8,
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
    },
    webHeaderWrapper: {
        width: '100%',
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100000,
            }
        })
    },
    mobileTabBarC: {
        ...Platform.select({
            web: {
                position: 'fixed',
            },
            default: {
                position: 'absolute',
            }
        }),
        bottom: 0,
        left: 0,
        right: 0,
        height: 85,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        gap: 0,
        width: '100%',
        paddingBottom: 30
    },
    mobileTabBar: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 99999,
        gap: 0,
        backgroundColor: 'rgba(226, 245, 255, 0.6)',
        borderRadius: 100,
        width: '90%',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
        position: 'relative'
    },
    mobileTabItem: {
        ...Platform.select({
            web: {
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            },
        }),
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 100,
    },
    mobileText: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 2,
    },
})

export default Header