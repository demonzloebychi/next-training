
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    if (!formData || !formData.name || !formData.phone) {
      return new Response(JSON.stringify({ error: 'Недостаточно данных' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Настройки для отправки почты
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: 'nikolaislnkv@mail.ru',
        pass: 'BKx2qdiyt3hZF6zArxgp', // Укажите пароль
      },
    });

    const mailOptions = {
      from: 'nikolaislnkv@mail.ru', // Укажите адрес отправителя
      to: 'nikolaislnkv@mail.ru',
      subject: 'Сообщение с сайта',
      text: `Имя: ${formData.name}\nТелефон: ${formData.phone}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
