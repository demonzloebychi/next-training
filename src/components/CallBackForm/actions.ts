import nodemailer from 'nodemailer';

export async function createMessage(formData) {
  const { name, email, message } = Object.fromEntries(formData);

  // Настройки для отправки почты
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'example@gmail.com',
      pass: '',
    },
  });

  const mailOptions = {
    from: email,
    to: 'example@gmail.com',
    subject: 'Сообщение с сайта',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
