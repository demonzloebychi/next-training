
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();
    
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: 'Нет конфигурации телегам'}, { status: 500});
    }

  let message = "Новая заявка с nextjs + wp api"
  message += `\n Номер: ${phone} \n`
  if (name) message += `Имя ${name}`

  const url = `https://api.telegram.org/bot${token}/sendMessage`;


  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Ошибка отправки в Telegram"}, {status: 500});
  }

  return NextResponse.json({ success: true });

  
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}











// import nodemailer from 'nodemailer';
// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.json();

//     if (!formData || !formData.name || !formData.phone) {
//       return new Response(JSON.stringify({ error: 'Недостаточно данных' }), {
//         status: 400,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }

//     // Настройки для отправки почты
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.mail.ru',
//       port: 587,
//       secure: false, // or 'STARTTLS'
//       auth: {
//         user: 'nikolaislnkv@mail.ru',
//         pass: 'BKx2qdiyt3hZF6zArxgp', // Укажите пароль
//       },
//     });

//     const mailOptions = {
//       from: 'nikolaislnkv@mail.ru', // Укажите адрес отправителя
//       to: 'nikolaislnkv@mail.ru',
//       subject: 'Сообщение с сайта',
//       text: `Имя: ${formData.name}\nТелефон: ${formData.phone}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Ошибка при отправке сообщения:', error);
//     return new Response(JSON.stringify({ success: false }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }
