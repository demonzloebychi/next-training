'use client'
import { useState, useEffect } from 'react';
import styles from '@/components/header/Header.module.css'
import CallBackForm from '../CallBackForm/CallBackForm';
import { ModeToggle } from '../ToggleTheme/ToggleTheme';
import { Button } from '../Button';

import CitySelector from '../cityChange/cityChange';
import { usePathname } from 'next/navigation';
import cities from '@/utils/cities';


const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [isOpenPopup, setIsOpenPopup] = useState(false)

    const pathname = usePathname(); 
    const [currentCity, setCurrentCity] = useState('moscow'); // defaultCity = 'moscow'


    useEffect(() => {
        const pathSegments = pathname?.split('/');
        const cityFromUrl = pathSegments?.[1]; // Первый сегмент пути
        if (cityFromUrl && cities[cityFromUrl]) {
          setCurrentCity(cityFromUrl);
        }
      }, [pathname]); // Следим за изменением пути




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
           
        ]


    return (
        <>
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
                        <h2 className='title-h2'>Связаться</h2>
                        <CallBackForm />

                        
                    </div>


          

            

            
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
                                    <a href={`/${currentCity}${item.url}`} className="link">
                                        {item.name}
                                    </a>
                                </li>
                        )}
                    </ul>

                    
                    
                </nav>


                

                <Button
                    onClick={() => setIsOpenPopup(!isOpenPopup)}
                    className={styles.sendMessage}
                >
                    Отправить заявку
                </Button>

                
                <ModeToggle/>

                <CitySelector />
                


            </header>
          

            
        </>
      

     
    );
}

export default Header;






    

