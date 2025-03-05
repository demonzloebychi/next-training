'use client'
import { useState } from 'react';
import styles from '@/components/header/Header.module.css'
import CallBackForm from '../CallBackForm/CallBackForm';
import zIndex from '@mui/material/styles/zIndex';
import { ModeToggle } from '../ToggleTheme/ToggleTheme';
// import ThemeToggle from '@/components/ToggleTheme/ToggleTheme';
// import dynamic from 'next/dynamic';

// const ThemeToggle = dynamic(() => import('@/components/ToggleTheme/ToggleTheme'), {
//   ssr: false,
// });

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
                url: '/blog',

            },
            {
                name: 'Город',
                url: '/city'
            },
        ]


   

    


    return (
        <>
            
                {/* <div 
                    className={`popup-overlay ${isOpenPopup ? 'active' : ''}`}
                    // onClick={() => setIsOpenPopup(false)}
                    onClick={() => console.log('clicked')}
                > */}
                    <div className={`popup ${isOpenPopup ? 'active' : ''}`}>
                        <button 
                            className="close-popup"
                            onClick={() => setIsOpenPopup(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={30} height={30}>
                                <defs>
                                <style>
                                    {`.cls-1{
                                    fill:none;
                                    stroke:#000;
                                    stroke-linecap:round;
                                    stroke-linejoin:round;
                                    stroke-width:2px;
                                    }`}
                                </style>
                                </defs>
                                <title>Cross</title>
                                <g id="cross">
                                <line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
                                <line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
                                </g>
                            </svg>
                        </button>
                        <h2 className='title-h2'>Связаться с нами</h2>
                        <CallBackForm />
                    </div>
                {/* </div> */}

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




                <button 
                    className={styles.sendMessage}
                    onClick={() => setIsOpenPopup(!isOpenPopup)}
                
                >
                    Отправить заявку
                </button>

                {/* <ThemeToggle /> */}
                <ModeToggle />
                


            </header>
        </>
      

     
    );
}

export default Header;
