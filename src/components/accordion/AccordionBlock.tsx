'use client'
import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



// Определение интерфейса для пропсов
interface AccordionBlockProps {
    title: string;
    text: string;
}

const AccordionBlock: React.FC<AccordionBlockProps> = ({ title, text}) => {





    return (
        <>

                            <Accordion 
                                slotProps={{ heading: { component: 'h4' } }} 
                                sx={{borderRadius: '10px', 
                                    marginBlock: '10px',  
                                    boxShadow: 0, 
       
                                }}
                            >
                            <AccordionSummary
                                
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                
                            >
                                {title}
                            </AccordionSummary>
                            <AccordionDetails>
                                {text}
                            </AccordionDetails>
                            </Accordion>

        </>
    );
}

export default AccordionBlock;
