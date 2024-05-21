import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';

export default function Login() {
    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null; // or a loading spinner
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image
                    source={require('../../assets/LogoSaoLy.png')}
                    style={styles.logo}
                />
                <Text style={[styles.loginText, { fontWeight: 'bold' }]}>Tạo tài khoản mới</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Họ và tên</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                    />
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        keyboardType="email-address"
                    />
                    <Text style={styles.inputLabel}>Ngày sinh</Text>
                    <View style={styles.dateOfBirthContainer}>
                        <TextInput
                            style={[styles.input, styles.dateInput]}
                            placeholder="Ngày"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={[styles.input, styles.dateInput]}
                            placeholder="Tháng"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={[styles.input, styles.dateInput]}
                            placeholder="Năm"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.inputLabel}>Số điện thoại</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 380,
        height: 250,
        position: 'absolute', // Use absolute positioning
        left: 36,
        top: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    loginText: {
        paddingTop: 120,
        paddingBottom: 20,
        top: 20,
        fontSize: 20,
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
    },
    dateOfBirthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateInput: {
        width: '30%',
    },
    registerButton: {
        backgroundColor: '#D1B37E',
        padding: 10,
        width: '60%',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
