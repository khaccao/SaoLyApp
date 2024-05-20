import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function HomeScreen() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const countryCodes = [
        { label: '+84 - Hàn Quốc', value: '+84' },
        { label: '+82 - Hàn Quốc', value: '+82' },
        { label: '+86 - Hàn Quốc', value: '+86' },
        { label: '+856 - Hàn Quốc', value: '+856' },
        { label: '+855 - Hàn Quốc', value: '+855' },
        { label: '+66 - Hàn Quốc Lan', value: '+66' },
        { label: '+62 - Hàn Quốc', value: '+62' },
        { label: '+1 - Mỹ', value: '+1' },
        { label: '+44 - Anh', value: '+44' },
        { label: '+33 - Pháp', value: '+33' },
        { label: '+49 - Đức', value: '+49' },
        { label: '+64 - New Zealand', value: '+64' },
        { label: '+91 - Ấn Độ', value: '+91' },
    ];

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('../../assets/LogoSaoLy.png')}
                style={styles.logo}
            />
            <Text>Đăng nhập</Text>
            <View style={styles.inputContainer}>
                <View style={styles.row}>
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedCountry(value)}
                            items={countryCodes}
                            placeholder={{ label: 'Chọn quốc gia', value: null }}
                            value={selectedCountry}
                            style={pickerSelectStyles}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 40,
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
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerContainer: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        flex: 2,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    loginButton: {
        backgroundColor: '#D1B37E',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
