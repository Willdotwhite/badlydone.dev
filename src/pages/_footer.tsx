import {useEffect, useState} from 'react';

export const Footer = () => {
    const [timeAsHex, setTimeAsHex] = useState(getTimeAsHex())

    useEffect(() => {
        setInterval(() => setTimeAsHex(getTimeAsHex()), 1000)
    }, []);

    useEffect(() => {
        document.getElementById('app').style.backgroundColor = timeAsHex
    }, [timeAsHex]);

    function getTimeAsHex() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `#${hours}${minutes}${seconds}`;
    }

    return (
        <p style={{fontSize: `0.75rem`}}>The current time colour is: {getTimeAsHex()}</p>
    )
}