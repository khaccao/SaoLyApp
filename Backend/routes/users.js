const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Account = require('../models/AccountModel');
const twilio = require('twilio');

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const client = twilio(accountSid, authToken);

router.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'your_secret_key';

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.userId;
        next();
    });
};

// Gửi OTP
const sendOtp = async (phoneNumber, otp) => {
    return client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: 'your_twilio_phone_number',
        to: phoneNumber
    });
};

// Đăng ký
router.post('/register', async (req, res) => {
    try {
        const { Username, Email, Password, FirstName, LastName, Role, PhoneNumber } = req.body;

        // Kiểm tra xem Email hoặc Username đã tồn tại chưa
        const existingUser = await db.Account.findOne({ where: { Email } });
        if (existingUser) return res.status(409).send('Email already exists');

        const existingUsername = await db.Account.findOne({ where: { Username } });
        if (existingUsername) return res.status(409).send('Username already exists');

        const existingPhoneNumber = await db.Account.findOne({ where: { PhoneNumber } });
        if (existingPhoneNumber) return res.status(409).send('Phone number already exists');

        // Tạo mã OTP
        const otp = uuidv4().substring(0, 6); // Tạo mã OTP ngẫu nhiên

        // Gửi OTP
        await sendOtp(PhoneNumber, otp);

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Tạo người dùng mới với trạng thái chưa kích hoạt
        const user = await db.Account.create({
            Username,
            Email,
            Password: hashedPassword,
            FirstName,
            LastName,
            Role: Role || 'user',
            PhoneNumber,
            IsActive: false,
            RegistrationDate: new Date(),
            Otp: otp // Lưu OTP vào cơ sở dữ liệu
        });

        console.log(`User ${Username} registered successfully`);
        res.status(201).send('User registered successfully. OTP has been sent to your phone.');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Xác minh OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { Username, otp } = req.body;

        // Tìm người dùng theo Username và OTP
        const user = await db.Account.findOne({ where: { Username, Otp: otp } });
        if (!user) return res.status(400).send('Invalid OTP or username');

        // Kích hoạt tài khoản
        user.IsActive = true;
        user.Otp = null; // Xóa OTP sau khi xác minh thành công
        await user.save();

        res.status(200).send('Account verified successfully');
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Tìm người dùng theo Email
        const user = await db.Account.findOne({ where: { Email } });
        if (!user) return res.status(404).send('User not found');
        if (!user.IsActive) return res.status(403).send('Account not activated');

        // Kiểm tra mật khẩu
        const passwordMatch = await bcrypt.compare(Password, user.Password);
        if (!passwordMatch) return res.status(401).send('Invalid credentials');

        // Tạo JWT
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        res.json({
            message: `Logged in successfully as ${user.Username}`,
            token,
            userId: user.id // Trả về userId trong phản hồi
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Xem thông tin người dùng
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await db.Account.findByPk(req.userId);
        if (!user) return res.status(404).send('User not found');

        res.json({ Username: user.Username, Email: user.Email, Role: user.Role });
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Cập nhật thông tin người dùng
router.put('/user', authenticateToken, async (req, res) => {
    try {
        const { Username, Password, Role } = req.body;
        const user = await db.Account.findByPk(req.userId);
        if (!user) return res.status(404).send('User not found');

        if (Username) user.Username = Username;
        if (Password) {
            user.Password = await bcrypt.hash(Password, 10);
        }
        if (Role) user.Role = Role;

        await user.save();

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Tạo danh sách lưu trữ token bị hủy
const revokedTokens = [];

// Đăng xuất
router.post('/logout', authenticateToken, (req, res) => {
    try {
        // Lấy token từ header
        const token = req.headers['authorization'].split(' ')[1];

        // Thêm token vào danh sách token bị hủy (revoked)
        revokedTokens.push(token);

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = route
