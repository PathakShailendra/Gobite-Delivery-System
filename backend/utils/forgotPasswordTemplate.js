const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">Dear <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #555;">You've requested a password reset. Please use the following OTP code to reset your password:</p>
        <div style="background: #ffcc00; font-size: 24px; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px; letter-spacing: 2px; color: #333;">
            ${otp}
        </div>
        <p style="font-size: 14px; color: #777; margin-top: 10px;">This OTP is valid for <strong>1 hour</strong> only. Enter this OTP on the <strong>Gobite</strong> website to proceed with resetting your password.</p>
        <p style="font-size: 14px; color: #777; margin-top: 20px;">Thanks,</p>
        <p style="font-size: 14px; font-weight: bold; color: #333;">GoBite Team</p>
    </div>
    `;
};

export default forgotPasswordTemplate;
