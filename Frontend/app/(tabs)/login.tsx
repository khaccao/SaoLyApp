import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from 'expo-font';

export default function Login() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });

    const countryCodes = [
        { label: '+84', value: '+84' },
        { label: '+82', value: '+82' },
        { label: '+86', value: '+86' },
        { label: '+856', value: '+856' },
        { label: '+855', value: '+855' },
        { label: '+66', value: '+66' },
        { label: '+62', value: '+62' },
        { label: '+1', value: '+1' },
        { label: '+44', value: '+44' },
        { label: '+33', value: '+33' },
        { label: '+49', value: '+49' },
        { label: '+64', value: '+64' },
        { label: '+91', value: '+91' },
    ];

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
                <Text style={[styles.loginText, { fontWeight: 'bold' }]}>Đăng Nhập</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedCountry(value)}
                                items={countryCodes}
                                placeholder={{ label: 'Chọn quốc gia', value: null }}
                                value={selectedCountry}
                                style={pickerSelectStyles} // Updated style here
                                Icon={() => {
                                    return (
                                        <View style={styles.dropdownIcon}>
                                            <Text style={{ fontSize: 14 }}>▼</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor="#ccc"
                            keyboardType="phone-pad"
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>có thể tiếp tục với</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.socialButtonsContainer}>
                    <View style={styles.socialButtonRow}>
                        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                            <Image
                                source={require('../../assets/logofacebook.png')}
                                style={styles.socialButtonIcon}
                            />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.socialButtonsContainer}>
                    <View style={styles.socialButtonRow}>
                        <TouchableOpacity style={[styles.socialButton, styles.gmailButton]}>
                            <Image
                                source={require('../../assets/logogmail.png')}
                                style={styles.socialButtonIcon}
                            />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={pickerSelectStyles.termsText}>
    Bằng cách nhấp vào tiếp tục, bạn đồng ý với <Text style={{ fontWeight: 'bold' }}>Điều khoản dịch vụ</Text> và {''}
    <Text style={{ fontWeight: 'bold' }}>Chính sách quyền riêng tư</Text> của chúng tôi
</Text>
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
        paddingTop: 170,
        paddingBottom: 20,
        top: 20,
        fontSize: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        marginTop: 30, // Adjust based on the new absolute position of loginText
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerContainer: {
        width: 90, // Adjust the width as needed
        height: 41,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginRight: 10,
    },
    input: {
        width: 244,
        height: 41,
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8, // Add borderRadius here
        fontSize: 12,
        color: 'black',
    },
    loginButton: {
        backgroundColor: '#D1B37E',
        padding: 10,
        width: '70%',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownIcon: {
        position: 'absolute',
        right: 10, // Move icon to the left
        top: 10, // Align icon vertically with the text input
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E6E6E6'
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color:"#828282"
    },
    socialButtonsContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialButtonRow: {
        width: '80%',
        backgroundColor: '#EEE',
        borderRadius: 8,
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 8,
        width: '100%', // Thêm width là 80%
        marginBottom: 5, // Thêm marginBottom cho khoảng cách giữa các nút
    },
    socialButtonContent: {
        flexDirection: 'row', // Đảm bảo icon và text nằm cùng một hàng
        alignItems: 'center', // Căn giữa theo chiều dọc
        justifyContent: 'center',
    },
    facebookButton: {
        backgroundColor: '#EEEEEE',
    },
    gmailButton: {
        backgroundColor: '#EEEEEE',
    },
    socialButtonIcon: {
        width: 20,
        height: 20,
        marginLeft: 30,
    },
    socialButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center', // Căn giữa văn bản
        flex: 1, // Đảm bảo văn bản được căn giữa theo chiều ngang
    },

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    termsText: {
        marginTop: 10,
        fontSize: 11,
        color: '#828282',
        textAlign: 'center',
        width: 350,
    }
});
