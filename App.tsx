import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Sidebar from './components/Sidebar';
import Browser from './components/Browser';
import Games from './components/Games';
import SettingsPanel from './components/Settings';
import { Gamepad2, Globe, Settings as SettingsIcon, Home } from 'lucide-react';

type View = 'dashboard' | 'proxy' | 'games' | 'settings';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [proxyUrl, setProxyUrl] = useState('http://172.64.149.154:80');
  const [accentColor, setAccentColor] = useState('red-600');
  const [isGameMode, setIsGameMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Handle navigation
  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setIsGameMode(false);
    setSelectedGame(null);
  };

  // Handle game mode
  const handleGameSelect = (gameUrl: string) => {
    setSelectedGame(gameUrl);
    setIsGameMode(true);
  };

  // Handle exit from game mode
  const exitGameMode = () => {
    setIsGameMode(false);
    setSelectedGame(null);
    setCurrentView('games');
  };

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'proxy') {
      return <Browser proxyUrl={proxyUrl} />;
    } else if (currentView === 'games') {
      return <Games onSelectGame={handleGameSelect} />;
    } else if (currentView === 'settings') {
      return (
        <SettingsPanel
          proxyUrl={proxyUrl}
          onProxyUrlChange={setProxyUrl}
          accentColor={accentColor}
          onAccentColorChange={setAccentColor}
          onBack={() => setCurrentView('dashboard')}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">Welcome to Amongus GXMES</h2>
              <p className="text-gray-400 text-lg">Your ultimate cyber gaming portal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-colors">
                <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Proxy Browser</h3>
                <p className="text-gray-400">Access any website securely through our advanced proxy network</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-colors">
                <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Game Hub</h3>
                <p className="text-gray-400">Play hundreds of classic games with low latency</p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-colors">
                <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <SettingsIcon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Custom Settings</h3>
                <p className="text-gray-400">Configure your experience and preferences</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // Main render
  if (!hasEntered) {
    return <StartScreen onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div 
      className={`min-h-screen bg-gray-900 text-white transition-colors duration-300 ${accentColor === 'red-600' ? 'bg-[#0a0000]' : ''}`}
      style={{
        '--accent-color': accentColor,
      } as React.CSSProperties}
    >
      <Sidebar 
        activeView={currentView} 
        onNavigate={handleNavigate}
        isGameMode={isGameMode}
      />
      
      <main 
        className={`transition-all duration-300 ${
          isGameMode 
            ? 'w-full ml-0' 
            : 'w-[calc(100%-16rem)] ml-64'
        }`}
      >
        {isGameMode && selectedGame ? (
          <div className="h-screen flex flex-col">
            <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={exitGameMode}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Exit Game Mode</span>
                </button>
                <div className="h-6 w-px bg-gray-700" />
                <span className="text-gray-400">Playing Game</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <iframe
                src={selectedGame}
                className="w-full h-full border-none"
                title="Game Player"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              />
            </div>
          </div>
        ) : (
          <div className="h-screen overflow-y-auto">
            <div className="bg-gray-900 border-b border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white capitalize">{currentView}</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {currentView === 'dashboard' && 'Welcome to your cyber gaming dashboard'}
                    {currentView === 'proxy' && 'Browse the web securely through our proxy network'}
                    {currentView === 'games' && 'Explore our collection of classic retro games'}
                    {currentView === 'settings' && 'Customize your dashboard preferences'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full bg-${accentColor}`} />
                    <span className="text-sm text-gray-400">Connected</span>
                  </div>
                </div>
              </div>
            </div>
            {renderContent()}
          </div>
        )}
      </main>
    </div>
  );
}