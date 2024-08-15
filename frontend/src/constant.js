import React from 'react';
let BACKENDURL = '';

if (React.isDevelopment) {
    BACKENDURL = 'http://localhost:5000';
    // Development thing
} else {
    // Real thing
    BACKENDURL = 'https://real-time-stock-market-dashboard.onrender.com';
}

export default BACKENDURL;