import React from 'react';
import type {FC, PropsWithChildren} from 'react'
import styles from '@/components/layout/Layout.module.css'
import Header from '../header/Header';


type PropsType = {
    children: any
}

const Layout: FC<PropsWithChildren<PropsType>> = ({ children }) => {

    // const [isDark, setIsDark] = useState(false)


    return (
        <>
            
             
            <div className={`container`}>
                <Header />

                <main className="main">
                    {children}
                </main>
            
            </div>
        
        </>

    );
}

export default Layout;