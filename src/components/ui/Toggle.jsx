import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export const Toggle = ({ checked, onChange, label, disabled = false }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: '3rem',
          height: '1.5rem',
          borderRadius: '1rem',
          background: checked ? theme.accent : '#374151',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        <motion.div
          animate={{
            x: checked ? '1.5rem' : '0.125rem',
            y: '0.125rem'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>
      {label && (
        <span style={{ 
          color: disabled ? '#6b7280' : '#ffffff',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {label}
        </span>
      )}
    </div>
  );
}; 