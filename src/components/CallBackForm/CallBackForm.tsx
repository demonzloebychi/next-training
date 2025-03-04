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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: FormData = {
      name,
      phone,
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          placeholder='Ваше имя'
        />
        <input
          className='input'
          type="tel" // Исправлено на "tel" для номера телефона
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Ваш номер телефона'
        />
        <button
          className='button submit-btn'
          type="submit"
        >
          Отправить
        </button>
        {success && <p>Форма отправлена успешно!</p>}
        {error && <p>Ошибка при отправке формы.</p>}
      </form>
    </>
  );
};

export default CallBackForm;
