// // components/ThemeToggle.tsx
// import React, { useContext } from 'react';
// import { ThemeContext } from '@/app/contexts/ThemeContext';

// const ThemeToggle: React.FC = () => {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error('ThemeToggle must be used within a ThemeProvider');
//   }

//   const { toggleTheme } = context;

//   return (
//     <button 
//         onClick={toggleTheme}
//         className='btn'
//     >
//         Переключить
//     </button>
//   );
// };

// export default ThemeToggle;
