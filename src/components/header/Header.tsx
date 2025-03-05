'use client'
import { useState } from 'react';
import styles from '@/components/header/Header.module.css'
import CallBackForm from '../CallBackForm/CallBackForm';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [isOpenPopup, setIsOpenPopup] = useState(false)


    const MENU = [
            {
                name: 'Главная',
                url: '/'
            },
            {
                name: 'Продукты',
                url: '/products'
            },
            {
                name: 'Услуги',
                url: '/uslugi'
            },
            {
                name: 'Блог',
                url: '/blog'
            },
            {
                name: 'Город',
                url: '/city'
            },
        ]


   

    


    return (
        <header className="header">
            <button onClick={() => setIsOpen(!isOpen)} className={`burgerButton ${isOpen ? 'active' : ''}`} id="burger-button">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav className={`headerNav ${isOpen ? 'active' : ''}`}>
                <ul className="menu">
                    {MENU.map(item => 
                            <li key={item.url}>
                                <a href={item.url} className="link">
                                    {item.name}
                                </a>
                            </li>
                    )}
                </ul>
            </nav>

            <div 
                className={`popup-overlay ${isOpenPopup ? 'active' : ''}`}
                onClick={() => setIsOpenPopup(false)}
            >
                <div className={`popup ${isOpenPopup ? 'active' : ''}`}>
                    <button 
                        className="close-popup"
                        onClick={() => setIsOpenPopup(false)}
                    >
                        Закрыть
                    </button>
                    <h2 className='title-h2'>Связаться с нами</h2>
                    <CallBackForm />
                </div>
            </div>



            <button 
                className={styles.sendMessage}
                onClick={() => setIsOpenPopup(!isOpenPopup)}
            
            >
                Отправить заявку
            </button>


        </header>

     
    );
}

export default Header;
