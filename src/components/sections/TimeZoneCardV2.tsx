import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Timezone = ({ timezone }) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz(timezone);
      // Cambia el formato a 24 horas
      setDateTime(now.format('dddd, DD MMMM YYYY [a] HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      <time>{dateTime}</time>
      <p className="text-sm text-gray-500">🇪🇸 Madrid, España 🇪🇸</p>
    </div>
  );
};

// Cambia la prop timezone a 'Europe/Madrid'
Timezone.defaultProps = {
  timezone: 'Europe/Madrid',
};

export default Timezone;
