import React from 'react';
import styles from '@/components/header/Header.module.css'

const Header = () => {


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
        ]
    

    return (
        <ul className={styles.menu}>
            {MENU.map(item => 
                    <li key={item.url}>
                        <a href={item.url} className={styles.link}>
                            {item.name}
                        </a>
                    </li>
            )}
        </ul>
    );
}

export default Header;
