'use client'
import { useState } from 'react';
import styles from '@/components/header/Header.module.css'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);


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
        // <header className={styles.header}>

        //     <button onClick={() => setIsOpen(!isOpen)} className={styles.burgerButton} id="burger-button">
        //         <span></span>
        //         <span></span>
        //         <span></span>
        //     </button>
        //     <nav className={`${styles.headerNav} ${isOpen ? 'active' : ''}`}>
        //         <ul className={styles.menu}>
        //             {MENU.map(item => 
        //                     <li key={item.url}>
        //                         <a href={item.url} className={styles.link}>
        //                             {item.name}
        //                         </a>
        //                     </li>
        //             )}
        //         </ul>
        //     </nav>

        // </header>



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
        </header>

     
    );
}

export default Header;
