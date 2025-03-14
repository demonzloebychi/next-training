import React from 'react';
import type {FC, PropsWithChildren} from 'react'

type PropsType = {
    children: any;
    type?: any;
    onClick?: any;
    className?: any;
    id?: string;
}

export const Button: FC<PropsWithChildren<PropsType>> = ({children, type, onClick, className, id }) => {
    return (
        <button type={type} onClick={onClick} className={className || 'btn'} id={id}>
            {children}
        </button>
    );
}

