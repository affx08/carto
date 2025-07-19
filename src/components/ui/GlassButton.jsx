import React, { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GlassButton = memo(forwardRef(({ 
  children, 
  onClick, 
  disabled = false, 
  fullWidth = false, 
  icon, 
  style = {}, 
  className = '',
  ...props 
}, ref) => {
  const { theme } = useTheme();

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: theme.text,
    background: theme.glass,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${theme.glassBorder}`,
    borderRadius: '12px',
    boxShadow: theme.shadow,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    width: fullWidth ? '100%' : 'auto',
    minHeight: '2.75rem',
    position: 'relative',
    overflow: 'hidden',
    willChange: 'transform, box-shadow, background',
    contain: 'layout style paint',
    backfaceVisibility: 'hidden',
    ...style
  };

  const disabledStyle = disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  } : {};

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.01,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { 
      scale: 0.99,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`glass-button ${className}`}
      style={{ ...baseStyle, ...disabledStyle }}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={(e) => {
        if (!disabled) {
          e.target.style.background = theme.glassHover;
          e.target.style.boxShadow = theme.shadowHover;
        }
      }}
      onHoverEnd={(e) => {
        if (!disabled) {
          e.target.style.background = theme.glass;
          e.target.style.boxShadow = theme.shadow;
        }
      }}
      onTapStart={(e) => {
        if (!disabled) {
          // No manual transform changes
        }
      }}
      {...props}
    >
      {/* Ripple effect background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at center, ${theme.accent}10 0%, transparent 70%)`,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />
      
      {/* Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        {icon && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1.25rem',
            height: '1.25rem'
          }}>
            {icon}
          </span>
        )}
        {children}
      </div>
    </motion.button>
  );
}));

GlassButton.displayName = 'GlassButton';

export { GlassButton }; 