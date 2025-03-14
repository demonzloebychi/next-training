import React from 'react';
import type {FC, PropsWithChildren} from 'react'

type PropsType = {
    children: any;
    type?: any;
    onClick?: any;
    className?: any;
    id?: string;
    title?: string;
}

export const Button: FC<PropsWithChildren<PropsType>> = ({children, type, onClick, className, id, title }) => {
    return (
        <button type={type} onClick={onClick} className={className || 'btn'} id={id} title={title}>
            {children}
        </button>
    );
}

