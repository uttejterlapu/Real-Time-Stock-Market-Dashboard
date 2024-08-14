import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Spinner = ({ height = '300px' }) => (
    <div className="flex justify-center items-center" style={{ height }}>
        <LineWave
            height="80"
            width="80"
            color="#00ADB5"
            ariaLabel="loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
        />
    </div>
);

export default Spinner;