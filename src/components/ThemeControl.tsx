import { Moon, Snowflake, Sun, X } from 'lucide-react';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeControl: React.FC = () => {
  const { colorScheme, setColorScheme, theme, toggleTheme, isThemeControlOpen, toggleThemeControl } = useTheme();

  const colors = [
    { id: 'teal', label: 'Teal' },
    { id: 'purple', label: 'Purple' },
    { id: 'blue', label: 'Blue' },
    { id: 'rose', label: 'Rose' },
  ] as const;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleThemeControl}
        className="fixed top-1/2 left-0 -translate-y-1/2 z-50 p-2 rounded-r-lg bg-white dark:bg-slate-700 shadow-md hover:shadow-lg transition-all"
        aria-label="Open theme settings"
      >
        <Snowflake size={30} className="text-slate-700 dark:text-white animate-spin-slow" />
      </button>


      {/* Theme Control Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 z-50 ${isThemeControlOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Theme Settings</h3>
            <button
              onClick={toggleThemeControl}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">Mode</h4>
            <button
              onClick={toggleTheme}
              className="w-full p-3 flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-slate-800 dark:text-white font-medium">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-slate-800 dark:text-white" />
              ) : (
                <Sun className="w-5 h-5 text-slate-800 dark:text-white" />
              )}
            </button>
          </div>

          {/* Color Schemes */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">Color Scheme</h4>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setColorScheme(color.id)}
                  className={`p-3 rounded-lg flex items-center gap-2 transition-colors ${colorScheme === color.id
                    ? `bg-${color.id}-100 dark:bg-${color.id}-900/20`
                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-${color.id}-500`}></div>
                  <span className={`text-sm font-medium ${colorScheme === color.id
                    ? `text-${color.id}-700 dark:text-${color.id}-300`
                    : 'text-slate-700 dark:text-slate-300'
                    }`}>
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isThemeControlOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
          onClick={toggleThemeControl}
        ></div>
      )}
    </>
  );
};

export default ThemeControl;