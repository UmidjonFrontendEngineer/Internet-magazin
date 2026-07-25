'use client'

import { Text, View, StyleSheet, ScrollView, Pressable, Animated, TextInput, useWindowDimensions } from 'react-native'
import { UniversalImage } from 'app/components/UI/UniversalImage'
import React, { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { useLanStorage } from 'app/store/useLanStore'
import GrapePng from 'app/features/app/assets/grape.png'
import { useRouter } from 'solito/navigation'
import { useTokenStore } from 'app/store/useTokenStore'

const translations = {
    uz: {
        signUp: 'Ro\'yxatdan o\'tish',
        login: 'Hisobga kirish',
        userName: 'Foydalanuvchi nomi',
        firstName: 'Ism',
        lastName: 'Familiya',
        email: 'Elektron pochta',
        password: 'Parol',
        phone: 'Telefon raqam',
        gender: 'Jinsi',
        selectGender: 'Jinsini tanlang',
        male: 'Erkak',
        female: 'Ayol',
        submitSignUp: 'Ro\'yxatdan o\'tish',
        submitLogin: 'Kirish',
        switchToLogin: 'Akkauntingiz bormi? Kirish',
        switchToSignUp: 'Akkauntingiz yo\'qmi? Ro\'yxatdan o\'tish',
        appTitle: 'Online Market',
    },
    ru: {
        signUp: 'Регистрация',
        login: 'Войти',
        userName: 'Имя пользователя',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Эл. почта',
        password: 'Пароль',
        phone: 'Telefon raqam',
        gender: 'Пол',
        selectGender: 'Выберите пол',
        male: 'Мужской',
        female: 'Женский',
        submitSignUp: 'Зарегистрироваться',
        submitLogin: 'Войти',
        switchToLogin: 'Есть аккаунт? Войти',
        switchToSignUp: 'Нет аккаунта? Регистрация',
        appTitle: 'Online Market',
    },
    en: {
        signUp: 'Sign Up',
        login: 'Log In',
        userName: 'Username',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
        phone: 'Phone number',
        gender: 'Gender',
        selectGender: 'Select Gender',
        male: 'Male',
        female: 'Female',
        submitSignUp: 'Sign Up',
        submitLogin: 'Log In',
        switchToLogin: 'Already have an account? Log In',
        switchToSignUp: 'Don\'t have an account? Sign Up',
        appTitle: 'Online Market',
    }
}

const AuthPage = () => {
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const router = useRouter()
    const lan = useLanStorage(state => state.lan) as 'uz' | 'ru' | 'en'
    const setLan = useLanStorage(state => state.setLan)
    const t = translations[lan || 'uz']

    const { width } = useWindowDimensions()
    const isDesktop = width > 600

    const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup')

    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState(998)
    const [gender, setGender] = useState('Male')
    const [inputFocus, setInputFocus] = useState(0)
    const [genderOpen, setGenderOpen] = useState(false)

    const handleSubmit = async () => {
        if (!userName || !password || !phone) {
            return;
        }
        const isSignup = authMode === 'signup';

        const endpoint = isSignup ? 'https://internet-magazin-nest-server.onrender.com/auth/register' : 'https://internet-magazin-nest-server.onrender.com/auth/login';

        const userData = isSignup
            ? {
                userName,
                firstName,
                lastName,
                email,
                password,
                phone: '+' + phone,
                gender,
            }
            : {
                userName,
                password,
            };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Xatolik yuz berdi!');
            }

            console.log('Muvaffaqiyatli:', data);

            setToken(data.token)

            router.push('/profile')
        } catch (err) {
            console.log('Xatolik:', err.message);
        }
    }

    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: authMode === 'signup' ? 0 : 1,
            duration: 300,
            useNativeDriver: false
        }).start()
    }, [authMode])

    const marginLeft = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '50%'],
        extrapolate: 'clamp'
    });

    const fadeAnim = useRef(new Animated.Value(1)).current

    const switchMode = (mode: 'signup' | 'login') => {
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.4, duration: 120, useNativeDriver: false }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: false }),
        ]).start()
        setAuthMode(mode)
    }

    const cycleLanguage = () => {
        if (lan === 'uz') setLan('ru')
        else if (lan === 'ru') setLan('en')
        else setLan('uz')
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    isDesktop && styles.scrollContentDesktop, { paddingTop: 120 }
                ]}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.orbTop} />
                <View style={styles.orbBottom} />

                <View style={[styles.cardContainer, isDesktop && styles.cardContainerDesktop]}>

                    <View style={styles.headerBox}>
                        <View style={styles.logoCircle}>
                            <UniversalImage
                                src={GrapePng}
                                alt="Logo"
                                width={32}
                                height={32}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={{ textTransform: 'capitalize', fontSize: 20, color: '#1A73E8', fontWeight: 'bold' }}>online market</Text>
                    </View>

                    <View style={[styles.switchTabsRow, { position: 'relative' }]}>
                        <Animated.View style={[{
                            flex: 1,
                            paddingVertical: 10,
                            alignItems: 'center',
                            borderRadius: 12, width: '50%', height: '100%',
                            transform: [{ scaleY: 0.86 }, { scaleX: 0.98 }]
                        }, styles.switchTabBtnActive, { position: 'absolute', top: 0, left: marginLeft }]}>

                        </Animated.View>
                        <Pressable
                            style={[styles.switchTabBtn]}
                            onPress={() => switchMode('signup')}
                        >
                            <Text style={[styles.switchTabText, authMode === 'signup' && styles.switchTabTextActive]}>
                                {t.signUp}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.switchTabBtn]}
                            onPress={() => switchMode('login')}
                        >
                            <Text style={[styles.switchTabText, authMode === 'login' && styles.switchTabTextActive]}>
                                {t.login}
                            </Text>
                        </Pressable>
                    </View>

                    <Animated.View style={[styles.formWrapper, { opacity: fadeAnim }]}>

                        {authMode === 'signup' ? (
                            <>
                                <View style={[styles.inputBox, inputFocus === 1 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.userName}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={userName}
                                        onFocus={() => setInputFocus(1)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={setUserName}
                                        placeholder="userName"
                                        placeholderTextColor="#64748B"
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 2 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.firstName}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={firstName}
                                        onFocus={() => setInputFocus(2)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={setFirstName}
                                        placeholder="firstName"
                                        placeholderTextColor="#64748B"
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 3 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.lastName}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={lastName}
                                        onFocus={() => setInputFocus(3)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={setLastName}
                                        placeholder="lastName"
                                        placeholderTextColor="#64748B"
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 4 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.email}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={email}
                                        onChangeText={setEmail}
                                        onFocus={() => setInputFocus(4)}
                                        onBlur={() => setInputFocus(0)}
                                        placeholder="example@gmail.com"
                                        placeholderTextColor="#64748B"
                                        keyboardType="email-address"
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 5 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.password}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={password}
                                        onFocus={() => setInputFocus(5)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={setPassword}
                                        placeholder="••••••••"
                                        placeholderTextColor="#64748B"
                                        secureTextEntry
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 6 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.phone}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={phone}
                                        onFocus={() => setInputFocus(6)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
                                        placeholder="phone number"
                                        placeholderTextColor="#64748B"
                                        keyboardType="numeric"
                                        inputMode="numeric"
                                    />
                                </View>

                                <View style={[styles.inputBox, genderOpen ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.gender}</Text>
                                    <Pressable onPress={() => setGenderOpen(prev => !prev)} style={[styles.selectRow, { flexDirection: genderOpen ? 'column' : 'row', gap: 5 }]}>
                                        <Text style={styles.selectText}>{gender === 'Male' ? t.male : t.female}</Text>
                                        {genderOpen ? null : <Text style={styles.selectArrow}>▼</Text>}
                                        {
                                            genderOpen ? (
                                                <Pressable onPress={() => { setGender(prev => prev === 'Male' ? 'Female' : 'Male'), setGenderOpen(false) }}>
                                                    <Text style={styles.selectText}>{gender === 'Male' ? t.female : t.male}</Text>
                                                </Pressable>
                                            ) : null
                                        }
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={[styles.inputBox, inputFocus === 1 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.userName}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={userName}
                                        onFocus={() => setInputFocus(1)}
                                        onBlur={() => setInputFocus(0)}
                                        onChangeText={setUserName}
                                        placeholder="userName"
                                        placeholderTextColor="#64748B"
                                    />
                                </View>

                                <View style={[styles.inputBox, inputFocus === 2 ? (styles.inputBoxActive) : null]}>
                                    <Text style={styles.inputLabel}>{t.password}</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={password}
                                        onChangeText={setPassword}
                                        onFocus={() => setInputFocus(2)}
                                        onBlur={() => setInputFocus(0)}
                                        placeholder="••••••••"
                                        placeholderTextColor="#64748B"
                                        secureTextEntry
                                    />
                                </View>
                            </>
                        )}

                        <Pressable
                            onPress={handleSubmit}
                            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
                            style={[styles.saveButtonWrapper, { backgroundColor: 'skyblue' }]}
                        >
                            <LinearGradient colors={['#00E5FF', '#0284C7']} style={styles.saveButtonGradient}>
                                <Text style={styles.saveButtonText}>{authMode === 'signup' ? t.submitSignUp : t.submitLogin}</Text>
                            </LinearGradient>
                        </Pressable>

                        <Pressable
                            onPress={() => switchMode(authMode === 'signup' ? 'login' : 'signup')}
                            style={styles.switchModeFooter}
                        >
                            <Text style={styles.switchModeFooterText}>
                                {authMode === 'signup' ? t.switchToLogin : t.switchToSignUp}
                            </Text>
                        </Pressable>

                    </Animated.View>

                </View>

            </ScrollView>
        </View>
    )
}

export default AuthPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        padding: 16,
        alignItems: 'center',
        paddingBottom: 100,
    },
    scrollContentDesktop: {
        justifyContent: 'center',
        minHeight: '100%',
    },
    orbTop: {
        position: 'absolute',
        top: -40,
        left: -40,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 229, 255, 0.15)',
        zIndex: 0,
    },
    orbBottom: {
        position: 'absolute',
        bottom: 20,
        right: -40,
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: 'rgba(30, 62, 98, 0.3)',
        zIndex: 0,
    },
    topBar: {
        width: '100%',
        maxWidth: 440,
        alignItems: 'flex-end',
        marginBottom: 12,
        zIndex: 2,
    },
    topBarDesktop: {
        maxWidth: 480,
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
    inputBoxActive: {
        borderColor: '#00E5FF',
        backgroundColor: '#F0FDFA',
    },
    langText: {
        color: '#00E5FF',
        fontWeight: '800',
        fontSize: 12,
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
    },
    cardContainer: {
        width: '100%',
        maxWidth: 440,
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        zIndex: 1,
    },
    cardContainerDesktop: {
        maxWidth: 480,
        padding: 28,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 16,
    },
    logoCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitleText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    switchTabsRow: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        padding: 4,
        marginBottom: 18,
    },
    switchTabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    switchTabBtnActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    switchTabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    switchTabTextActive: {
        color: '#0F172A',
        fontWeight: '700',
    },
    formWrapper: {
        width: '100%',
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
        flexDirection: 'row',
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
    submitButtonWrapper: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 12,
        width: '100%',
    },
    submitButtonGradient: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    switchModeFooter: {
        marginTop: 14,
        alignItems: 'center',
    },
    switchModeFooterText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0284C7',
    }
})