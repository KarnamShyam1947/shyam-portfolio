import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { useTheme } from '../../context/ThemeContext';
import { getColorScheme } from '../../context/ThemeContext';

const HeroManager: React.FC = () => {
  const { heroSection, updateHeroSection } = useDataStore();
  const { colorScheme } = useTheme();
  const colors = getColorScheme(colorScheme);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: heroSection.name,
    title: heroSection.title,
    subtitle: heroSection.subtitle,
    description: heroSection.description,
    primaryButtonText: heroSection.primaryButtonText,
    primaryButtonLink: heroSection.primaryButtonLink,
    secondaryButtonText: heroSection.secondaryButtonText,
    secondaryButtonLink: heroSection.secondaryButtonLink,
    typingPhrases: [...heroSection.typingPhrases]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPhrases = formData.typingPhrases.filter(phrase => phrase.trim() !== '');

    updateHeroSection({
      ...formData,
      typingPhrases: filteredPhrases
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: heroSection.name,
      title: heroSection.title,
      subtitle: heroSection.subtitle,
      description: heroSection.description,
      primaryButtonText: heroSection.primaryButtonText,
      primaryButtonLink: heroSection.primaryButtonLink,
      secondaryButtonText: heroSection.secondaryButtonText,
      secondaryButtonLink: heroSection.secondaryButtonLink,
      typingPhrases: [...heroSection.typingPhrases]
    });
    setIsEditing(false);
  };

  const addPhrase = () => {
    setFormData(prev => ({
      ...prev,
      typingPhrases: [...prev.typingPhrases, '']
    }));
  };

  const updatePhrase = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      typingPhrases: prev.typingPhrases.map((phrase, i) => i === index ? value : phrase)
    }));
  };

  const removePhrase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      typingPhrases: prev.typingPhrases.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Hero Section Management</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-4 py-2 ${colors.button} text-white rounded-lg`}
          >
            Edit Hero Section
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Edit Hero Section</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Your main title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Your subtitle"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                rows={3}
                placeholder="Brief description about yourself"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                <input
                  type="text"
                  value={formData.primaryButtonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryButtonText: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Primary button text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Primary Button Link</label>
                <input
                  type="text"
                  value={formData.primaryButtonLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryButtonLink: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="#section or URL"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  value={formData.secondaryButtonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryButtonText: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Secondary button text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Secondary Button Link</label>
                <input
                  type="text"
                  value={formData.secondaryButtonLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondaryButtonLink: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="#section or URL"
                  required
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-2 text-slate-800 dark:text-white">
                Typing Animation Phrases
              </h4>
              <div className="space-y-2">
                {formData.typingPhrases.map((phrase, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phrase}
                      onChange={(e) => updatePhrase(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder={`Phrase ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removePhrase(index)}
                      disabled={formData.typingPhrases.length === 1}
                      className="px-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50"
                      title="Remove Phrase"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={addPhrase}
                  className={`px-3 py-2 text-white rounded-md ${colors.button} disabled:opacity-50`}
                  disabled={formData.typingPhrases.some((phrase) => phrase.trim() === '')}
                >
                  Add Phrase
                </button>
              </div>
            </div>


            <div className="flex justify-end  gap-2">
              <button
                type="submit"
                className={`px-4 py-2 ${colors.button} text-white rounded-lg flex items-center gap-2`}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Current Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Name:</span>
                  <p className="text-slate-800 dark:text-white">{heroSection.name}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Title:</span>
                  <p className="text-slate-800 dark:text-white">{heroSection.title}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Subtitle:</span>
                  <p className="text-slate-800 dark:text-white">{heroSection.subtitle}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Primary Button:</span>
                  <p className="text-slate-800 dark:text-white">{heroSection.primaryButtonText}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="font-medium text-slate-600 dark:text-slate-400">Description:</span>
                <p className="text-slate-800 dark:text-white mt-1">{heroSection.description}</p>
              </div>
              <div className="mt-4">
                <span className="font-medium text-slate-600 dark:text-slate-400">Typing Phrases:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {heroSection.typingPhrases.map((phrase, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-sm bg-${colorScheme}-100 dark:bg-${colorScheme}-900/20 text-${colorScheme}-700 dark:text-${colorScheme}-300 rounded`}
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroManager;