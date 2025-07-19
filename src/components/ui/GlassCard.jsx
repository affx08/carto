import React, { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GlassCard = memo(forwardRef(({ 
  children, 
  style = {}, 
  className = '',
  hover = true,
  padding = '1.5rem',
  ...props 
}, ref) => {
  const { theme } = useTheme();

  const baseStyle = {
    background: theme.glass,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${theme.glassBorder}`,
    borderRadius: '16px',
    boxShadow: theme.shadow,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, box-shadow',
    contain: 'layout style paint',
    backfaceVisibility: 'hidden',
    position: 'relative',
    overflow: 'hidden',
    padding,
    ...style
  };

  const cardVariants = {
    initial: { 
      scale: 1
    },
    hover: hover ? {
      scale: 1.01,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    } : {},
    tap: {
      scale: 0.99,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`glass-card ${className}`}
      style={baseStyle}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={(e) => {
        if (hover) {
          e.target.style.boxShadow = theme.shadowHover;
        }
      }}
      onHoverEnd={(e) => {
        if (hover) {
          e.target.style.boxShadow = theme.shadow;
        }
      }}
      {...props}
    >
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${theme.accent}05 0%, transparent 50%)`,
        pointerEvents: 'none',
        borderRadius: 'inherit'
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </div>
    </motion.div>
  );
}));

GlassCard.displayName = 'GlassCard';

export { GlassCard }; 