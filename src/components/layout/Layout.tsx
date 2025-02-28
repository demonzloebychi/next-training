import React from 'react';
import type {FC, PropsWithChildren} from 'react'
import styles from '@/components/layout/Layout.module.css'
import Header from '../header/Header';


type PropsType = {
    children: any
}

const Layout: FC<PropsWithChildren<PropsType>> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header>
            </Header>
            {children}
        </div>
    );
}

export default Layout;