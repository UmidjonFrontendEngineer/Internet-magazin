'use client'

import { Text, View, StyleSheet, ScrollView, Pressable, Animated, TextInput, useWindowDimensions } from 'react-native'
import { UniversalImage } from 'app/components/UI/UniversalImage'
import { useRouter } from 'solito/navigation'
import { TextLink } from 'solito/link'
import React, { useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useLanStorage } from 'app/store/useLanStore'

const translations = {
    uz: {
        myProfile: 'Mening Profilim',
        editProfile: 'Profilni tahrirlash',
        favourites: 'Sevimlilar',
        downloads: 'Yuklamalar',
        language: 'Til',
        location: 'Joylashuv',
        display: 'Ekran',
        feedPreference: 'Lenta sozlamalari',
        subscription: 'Obuna',
        clearCache: 'Keshni tozalash',
        clearHistory: 'Tarixni tozalash',
        logout: 'Chiqib ketish',
        appVersion: 'Ilova versiyasi 0.03',
        yourInformation: 'Sizning Ma\'lumotlaringiz',
        firstName: 'Ism',
        lastName: 'Familiya',
        phone: 'Telefon raqam',
        emailId: 'Elektron pochta',
        gender: 'Jinsi',
        save: 'Saqlash',
        back: 'Orqaga',
    },
    ru: {
        myProfile: 'Мой Профиль',
        editProfile: 'Редактировать профиль',
        favourites: 'Избранное',
        downloads: 'Загрузки',
        language: 'Язык',
        location: 'Локация',
        display: 'Дисплей',
        feedPreference: 'Настройки ленты',
        subscription: 'Подписка',
        clearCache: 'Очистить кэш',
        clearHistory: 'Очистить историю',
        logout: 'Выйти',
        appVersion: 'Версия приложения 0.03',
        yourInformation: 'Ваша Информация',
        firstName: 'Имя',
        lastName: 'Фамилия',
        phone: 'Номер телефона',
        emailId: 'Эл. почта',
        gender: 'Пол',
        save: 'Сохранить',
        back: 'Назад',
    },
    en: {
        myProfile: 'My Profile',
        editProfile: 'Edit Profile',
        favourites: 'Favourites',
        downloads: 'Downloads',
        language: 'Language',
        location: 'Location',
        display: 'Display',
        feedPreference: 'Feed preference',
        subscription: 'Subscription',
        clearCache: 'Clear Cache',
        clearHistory: 'Clear History',
        logout: 'Log Out',
        appVersion: 'App version 0.03',
        yourInformation: 'Your Information',
        firstName: 'First name',
        lastName: 'Last name',
        phone: 'Phone',
        emailId: 'Email Id',
        gender: 'Gender',
        save: 'Save',
        back: 'Back',
    }
}

const Profile = () => {
    const lan = useLanStorage(state => state.lan) as 'uz' | 'ru' | 'en'
    const setLan = useLanStorage(state => state.setLan)
    const t = translations[lan || 'uz']

    const { width, height } = useWindowDimensions();

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>('FirstName')
    const [lastName, setLastName] = useState<string>('LastName')
    const [phone, setPhone] = useState<string>('+99 888 90 90')
    const [email, setEmail] = useState<string>('Example@gmail.com')
    const [gender, setGender] = useState<string>('Male')
    const [focus, setFocus] = useState(0)
    const [genderOpen, setGenderOpen] = useState(false)
    const router = useRouter()

    const scrollY = useRef(new Animated.Value(0)).current

    const avatarScale = scrollY.interpolate({
        inputRange: [-50, 0, 100],
        outputRange: [1.1, 1, 0.85],
        extrapolate: 'clamp',
    })

    const cycleLanguage = () => {
        if (lan === 'uz') setLan('ru')
        else if (lan === 'ru') setLan('en')
        else setLan('uz')
    }

    return (
        <LinearGradient
            colors={['#0B192C', '#1E3E62', '#000000']}
            style={[styles.container, { paddingTop: width > 500 ? 10 : 90 }]}
        >
            <Animated.ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >

                {!isEditing ? (
                    <View style={styles.phoneFrame}>
                        <View style={styles.phoneHeader}>
                            <Pressable style={styles.iconButton}>
                                <Text style={styles.headerNavArrow}>‹</Text>
                            </Pressable>
                            <Text style={styles.phoneHeaderTitle}>{t.myProfile}</Text>
                            <Pressable onPress={() => router.push('/sozlamalar')} style={styles.iconButton}>
                                <UniversalImage src="https://i.ibb.co/Myj2g1pg/settings.png" alt="Settings" width={18} height={18} resizeMode="contain" />
                            </Pressable>
                        </View>

                        <View style={styles.profileCardClean}>
                            <View style={styles.avatarWrapper}>
                                <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarScale }] }]}>
                                    <UniversalImage
                                        src="https://i.ibb.co/Myj2g1pg/settings.png"
                                        alt="Avatar"
                                        width={80}
                                        height={80}
                                        resizeMode="cover"
                                    />
                                </Animated.View>
                                <Pressable style={styles.cameraBadge}>
                                    <Text style={styles.cameraBadgeText}>📷</Text>
                                </Pressable>
                            </View>

                            <Text style={styles.profileName}>{firstName} {lastName}</Text>
                            <Text style={styles.profileEmail}>{email}</Text>

                            <Pressable
                                android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
                                style={[styles.editProfileButton, { backgroundColor: 'skyblue' }]}
                                onPress={() => setIsEditing(true)}
                            >
                                <LinearGradient
                                    colors={['#00E5FF', '#0284C7']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={styles.editProfileGradient}
                                >
                                    <Text style={styles.editProfileButtonText}>{t.editProfile}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        <View style={styles.menuGroup}>
                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} onPress={() => router.push('/yoqtirilgan')} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🤍</Text>
                                    <Text style={styles.menuRowText}>{t.favourites}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} onPress={() => router.push('/buyrutmalar')} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>📥</Text>
                                    <Text style={styles.menuRowText}>{t.downloads}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>
                        </View>

                        <View style={styles.menuGroup}>
                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow} onPress={cycleLanguage}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🌐</Text>
                                    <Text style={styles.menuRowText}>{t.language}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>📍</Text>
                                    <Text style={styles.menuRowText}>{t.location}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🖥️</Text>
                                    <Text style={styles.menuRowText}>{t.display}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>📱</Text>
                                    <Text style={styles.menuRowText}>{t.feedPreference}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>💳</Text>
                                    <Text style={styles.menuRowText}>{t.subscription}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>
                        </View>

                        <View style={styles.menuGroup}>
                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🗑️</Text>
                                    <Text style={styles.menuRowText}>{t.clearCache}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(0, 229, 255, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🕒</Text>
                                    <Text style={styles.menuRowText}>{t.clearHistory}</Text>
                                </View>
                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>

                            <Pressable android_ripple={{ color: 'rgba(239, 68, 68, 0.2)' }} style={styles.menuRow}>
                                <View style={styles.menuRowLeft}>
                                    <Text style={styles.menuEmoji}>🚪</Text>
                                    <Text style={[styles.menuRowText, styles.logoutTextLabel]}>{t.logout}</Text>
                                </View>
                                <Text style={[styles.menuArrow, styles.logoutTextLabel]}>›</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.versionFooterText}>{t.appVersion}</Text>
                    </View>
                ) : (
                    <View style={styles.phoneFrame}>
                        <View style={styles.phoneHeader}>
                            <Pressable style={styles.iconButton} onPress={() => setIsEditing(false)}>
                                <Text style={styles.headerNavArrow}>‹</Text>
                            </Pressable>
                            <Text style={styles.phoneHeaderTitle}>{t.editProfile}</Text>
                            <Pressable
                                style={[styles.iconButton, styles.checkButtonBg]}
                                onPress={() => setIsEditing(false)}
                            >
                                <Text style={styles.checkIconText}>✓</Text>
                            </Pressable>
                        </View>

                        <View style={styles.profileCardClean}>
                            <View style={styles.avatarWrapper}>
                                <View style={styles.avatarContainer}>
                                    <UniversalImage
                                        src="https://i.ibb.co/Myj2g1pg/settings.png"
                                        alt="Avatar"
                                        width={80}
                                        height={80}
                                        resizeMode="cover"
                                    />
                                </View>
                                <Pressable style={styles.cameraBadge}>
                                    <Text style={styles.cameraBadgeText}>📷</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.formSectionTitle}>{t.yourInformation}</Text>

                            <View style={[styles.inputBox, focus === 1 ? (styles.inputBoxActive) : null]}>
                                <Text style={styles.inputLabel}>{t.firstName}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    onFocus={() => setFocus(1)}
                                    onBlur={() => setFocus(0)}
                                    placeholderTextColor="#64748B"
                                />
                            </View>

                            <View style={[styles.inputBox, focus === 2 ? (styles.inputBoxActive) : null]}>
                                <Text style={styles.inputLabel}>{t.lastName}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={lastName}
                                    onFocus={() => setFocus(2)}
                                    onBlur={() => setFocus(0)}
                                    onChangeText={setLastName}
                                    placeholderTextColor="#64748B"
                                />
                            </View>

                            <View style={[styles.inputBox, focus === 3 ? (styles.inputBoxActive) : null]}>
                                <Text style={styles.inputLabel}>{t.phone}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={phone}
                                    onChangeText={setPhone}
                                    onFocus={() => setFocus(3)}
                                    onBlur={() => setFocus(0)}
                                    placeholderTextColor="#64748B"
                                />
                            </View>

                            <View style={[styles.inputBox, focus === 4 ? (styles.inputBoxActive) : null]}>
                                <Text style={styles.inputLabel}>{t.emailId}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setFocus(4)}
                                    onBlur={() => setFocus(0)}
                                    placeholderTextColor="#64748B"
                                />
                            </View>

                            <View style={[styles.inputBox, genderOpen ? (styles.inputBoxActive) : null]}>
                                <Text style={styles.inputLabel}>{t.gender}</Text>
                                <Pressable onPress={() => setGenderOpen(prev => !prev)} style={[styles.selectRow, { flexDirection: genderOpen ? 'column' : 'row' }]}>
                                    <Text style={styles.selectText}>{gender}</Text>
                                    {genderOpen ? null : <Text style={styles.selectArrow}>▼</Text>}
                                    {
                                        genderOpen ? (
                                            <Pressable onPress={() => {setGender(prev => prev === 'Male' ? 'Female' : 'Male'), setGenderOpen(false)}}>
                                                <Text style={styles.selectText}>{gender === 'Male' ? 'Female' : 'Male'}</Text>
                                            </Pressable>
                                        ) : null
                                    }
                                </Pressable>
                            </View>

                            <Pressable
                                android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
                                style={[styles.saveButtonWrapper, { backgroundColor: 'skyblue' }]}
                                onPress={() => setIsEditing(false)}
                            >
                                <LinearGradient colors={['#00E5FF', '#0284C7']} style={styles.saveButtonGradient}>
                                    <Text style={styles.saveButtonText}>{t.save}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </View>
                )}

            </Animated.ScrollView>
        </LinearGradient >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 100,
    },
    orbTop: {
        position: 'absolute',
        top: -40,
        left: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(0, 229, 255, 0.15)',
        zIndex: 0,
    },
    orbBottom: {
        position: 'absolute',
        bottom: 20,
        right: -40,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(30, 62, 98, 0.3)',
        zIndex: 0,
    },
    topBar: {
        width: '100%',
        maxWidth: 420,
        alignItems: 'flex-end',
        marginBottom: 12,
        zIndex: 2,
    },
    langButton: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(0, 229, 255, 0.4)',
    },
    langBlur: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(11, 25, 44, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    langText: {
        color: '#00E5FF',
        fontWeight: '800',
        fontSize: 12,
    },
    phoneFrame: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 18,
    },
    phoneHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNavArrow: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0F172A',
        marginTop: -2,
    },
    phoneHeaderTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A',
    },
    checkButtonBg: {
        backgroundColor: 'rgba(0, 229, 255, 0.15)',
    },
    checkIconText: {
        color: '#00A8CC',
        fontSize: 16,
        fontWeight: '800',
    },
    profileCardClean: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
    avatarContainer: {
        width: 82,
        height: 82,
        borderRadius: 41,
        borderWidth: 2,
        borderColor: '#00E5FF',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E8F0',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cameraBadgeText: {
        fontSize: 11,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    profileEmail: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 12,
    },
    editProfileButton: {
        borderRadius: 20,
        overflow: 'hidden',
        width: '70%',
    },
    editProfileGradient: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editProfileButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    menuGroup: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuEmoji: {
        fontSize: 16,
    },
    menuRowText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    logoutTextLabel: {
        color: '#EF4444',
    },
    menuArrow: {
        fontSize: 16,
        color: '#94A3B8',
        fontWeight: '700',
    },
    versionFooterText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
        marginBottom: 4,
    },
    formContainer: {
        width: '100%',
    },
    formSectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 12,
    },
    inputBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 10,
    },
    inputBoxActive: {
        borderColor: '#00E5FF',
        backgroundColor: '#F0FDFA',
    },
    inputLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 2,
    },
    textInput: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        paddingVertical: 2,
    },
    selectRow: {
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    selectText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    selectArrow: {
        fontSize: 10,
        color: '#64748B',
    },
    saveButtonWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 8,
        width: '100%',
    },
    saveButtonGradient: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    }
})