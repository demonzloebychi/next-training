'use client';
import { useState } from 'react';
import styles from '@/components/CallBackForm/CallBackForm.module.css';

interface FormData {
  name: string;
  phone: string;
}

const CallBackForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Функция для обработки ввода с маской
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

 
  
    

    if (input.length > 11) input = input.slice(0, 11); // Ограничиваем длину номера

    let formattedPhone = '+7 ';
    if (input.length > 1) formattedPhone += `(${input.substring(1, 4)}`;
    if (input.length >= 4) formattedPhone += `) ${input.substring(4, 7)}`;
    if (input.length >= 7) formattedPhone += `-${input.substring(7, 9)}`;
    if (input.length >= 9) formattedPhone += `-${input.substring(9, 11)}`;

    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = { name, phone };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Данные отправлены успешно!');
        setName('');
        setPhone('');
        setSuccess(true);
        setError(false);
      } else {
        console.error('Ошибка при отправке данных');
        setError(true);
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className='input'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
        />
        <input
          className='input'
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="+7 (___) ___-__-__"
        />
        <button className='button submit-btn' type="submit">
          Отправить
        </button>
        {success && <p>Форма отправлена успешно!</p>}
        {error && <p>Ошибка при отправке формы.</p>}
      </form>
    </>
  );
};

export default CallBackForm;
