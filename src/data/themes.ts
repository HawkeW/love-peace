// Theme configuration for wedding invitation
export interface Theme {
  name: string;
  label: string;
  colors: {
    // Base colors
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    
    // Accent colors
    accent: string;
    accentLight: string;
    accentGlow: string;
    
    // Borders
    borderSubtle: string;
  };
}

export const themes: Record<string, Theme> = {
  // 当前黑金配色
  blackGold: {
    name: 'blackGold',
    label: '经典黑金',
    colors: {
      bgPrimary: '#0a0a0a',
      bgSecondary: '#141414',
      textPrimary: '#fafafa',
      textSecondary: '#a0a0a0',
      accent: '#c9a962',
      accentLight: '#e8d5a3',
      accentGlow: 'rgba(201, 169, 98, 0.15)',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
    },
  },

  // 纯白香槟配色
  whiteChampagne: {
    name: 'whiteChampagne',
    label: '纯白香槟',
    colors: {
      bgPrimary: '#fdfcf9',
      bgSecondary: '#f7f5f0',
      textPrimary: '#2c2c2c',
      textSecondary: '#6b6b6b',
      accent: '#d4a574',
      accentLight: '#e8c9a3',
      accentGlow: 'rgba(212, 165, 116, 0.2)',
      borderSubtle: 'rgba(0, 0, 0, 0.08)',
    },
  },

  // 深蓝玫瑰金配色
  navyRoseGold: {
    name: 'navyRoseGold',
    label: '深蓝玫瑰金',
    colors: {
      bgPrimary: '#0f1419',
      bgSecondary: '#1a2332',
      textPrimary: '#f0ece8',
      textSecondary: '#9ca3af',
      accent: '#e8a393',
      accentLight: '#f5c4b8',
      accentGlow: 'rgba(232, 163, 147, 0.18)',
      borderSubtle: 'rgba(255, 255, 255, 0.1)',
    },
  },

  // 墨绿金配色
  forestGold: {
    name: 'forestGold',
    label: '墨绿金',
    colors: {
      bgPrimary: '#0d1b1a',
      bgSecondary: '#1a2e2b',
      textPrimary: '#f5f3f0',
      textSecondary: '#a8b5b2',
      accent: '#d4af37',
      accentLight: '#f0d98d',
      accentGlow: 'rgba(212, 175, 55, 0.15)',
      borderSubtle: 'rgba(255, 255, 255, 0.09)',
    },
  },

  // 勃艮第红配色
  burgundy: {
    name: 'burgundy',
    label: '勃艮第红',
    colors: {
      bgPrimary: '#1a0e12',
      bgSecondary: '#2d1a21',
      textPrimary: '#f8f6f4',
      textSecondary: '#b5a8aa',
      accent: '#cd8d7a',
      accentLight: '#e8b4a2',
      accentGlow: 'rgba(205, 141, 122, 0.18)',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
    },
  },

  // 薰衣草配色
  lavender: {
    name: 'lavender',
    label: '薰衣草紫',
    colors: {
      bgPrimary: '#faf9fc',
      bgSecondary: '#f3f1f8',
      textPrimary: '#2d2a35',
      textSecondary: '#6d6875',
      accent: '#9d86b8',
      accentLight: '#c8b8d8',
      accentGlow: 'rgba(157, 134, 184, 0.2)',
      borderSubtle: 'rgba(0, 0, 0, 0.06)',
    },
  },

  // 午夜蓝配色
  midnightBlue: {
    name: 'midnightBlue',
    label: '午夜蓝',
    colors: {
      bgPrimary: '#0a1128',
      bgSecondary: '#1a2444',
      textPrimary: '#e8f1f5',
      textSecondary: '#9fb3c8',
      accent: '#7aa2c8',
      accentLight: '#a8c8e8',
      accentGlow: 'rgba(122, 162, 200, 0.18)',
      borderSubtle: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

// Default theme
export const defaultTheme = 'navyRoseGold';
