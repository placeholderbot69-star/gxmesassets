import { useState } from 'react';
import { ArrowLeft, Save, RefreshCw, Shield } from 'lucide-react';

interface SettingsPanelProps {
  proxyUrl: string;
  onProxyUrlChange: (url: string) => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  onBack: () => void;
}

export default function SettingsPanel({
  proxyUrl,
  onProxyUrlChange,
  accentColor,
  onAccentColorChange,
  onBack
}: SettingsPanelProps) {
  const [tempProxyUrl, setTempProxyUrl] = useState(proxyUrl);
  const [tempAccentColor, setTempAccentColor] = useState(accentColor);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = () => {
    onProxyUrlChange(tempProxyUrl);
    onAccentColorChange(tempAccentColor);
    setShowSaveSuccess(true);
    
    setTimeout(() => {
      setShowSaveSuccess(false);
      onBack();
    }, 2000);
  };

  const accentColors = [
    { value: 'red-600', label: 'Cyber Red', class: 'bg-red-600' },
    { value: 'blue-600', label: 'Deep Blue', class: 'bg-blue-600' },
    { value: 'green-600', label: 'Matrix Green', class: 'bg-green-600' },
    { value: 'purple-600', label: 'Neon Purple', class: 'bg-purple-600' },
    { value: 'amber-600', label: 'Cyber Amber', class: 'bg-amber-600' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Configure your proxy network and dashboard preferences</p>
      </div>

      <div className="space-y-8">
        {/* Proxy Configuration */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-white">Proxy Network</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Proxy Server Address
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tempProxyUrl}
                  onChange={(e) => setTempProxyUrl(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  onClick={() => setTempProxyUrl('http://172.64.149.154:80')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Current proxy server: 172.64.149.154:80 (HTTP)
              </p>
            </div>
          </div>
        </div>

        {/* Theme Configuration */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-purple-500" />
            <h3 className="text-xl font-bold text-white">Theme Preferences</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-4">
            Accent Color
            </label>
            <div className="grid grid-cols-5 gap-4">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTempAccentColor(color.value)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all ${
                    tempAccentColor === color.value
                      ? 'bg-gray-700 ring-2 ring-red-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${color.class}`} />
                  <span className="text-xs text-gray-300">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <div className="text-sm text-gray-500">
            Changes are saved automatically
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      {showSaveSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in-up">
          <Save className="w-5 h-5" />
          <div>
            <div className="font-bold">Settings Saved</div>
            <div className="text-sm text-green-100">Your changes have been applied successfully</div>
          </div>
        </div>
      )}
    </div>
  );
}