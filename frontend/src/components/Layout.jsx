// src/components/Layout.js

import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const pageTransition = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
        transition: { duration: 0.5 },
    };

    return (
        <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
        >
            {children}
        </motion.div>
    );
};

export default Layout;
