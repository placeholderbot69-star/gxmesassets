import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, ExternalLink, X } from 'lucide-react';

interface BrowserProps {
  proxyUrl: string;
}

export default function Browser({ proxyUrl }: BrowserProps) {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    // Initialize with a default URL
    setUrl('https://example.com');
  }, []);

  const handleGo = () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    const proxiedUrl = `${proxyUrl}/${url.replace(/^https?:\/\//, '')}`;
    
    setCurrentUrl(proxiedUrl);
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, proxiedUrl];
    });
    setHistoryIndex(prev => prev + 1);
    setIsLoading(false);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCurrentUrl(history[historyIndex - 1]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-4 max-w-5xl mx-auto">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleBack}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className={`w-5 h-5 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex-1 flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter URL..."
                className="w-full pl-4 pr-12 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-2 text-gray-500">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
            <button
              onClick={handleGo}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              GO
            </button>
          </div>
        </div>

        <div className="mt-4 max-w-5xl mx-auto">
          <div className="text-xs text-gray-500 flex items-center space-x-2">
            <span className="text-green-500">●</span>
            <span>Proxy: {proxyUrl}</span>
            <span className="text-gray-400">|</span>
            <span>Current: {currentUrl || 'No page loaded'}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-gray-900">
        {currentUrl ? (
          <iframe
            src={currentUrl}
            className="w-full h-full border-none"
            title="Proxy Browser"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <Globe className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Page Loaded</h3>
            <p className="text-center max-w-md">
              Enter a URL above to browse through the secure proxy network.
              <br/>
              <span className="text-sm text-gray-600 mt-2 block">
                Proxy server: {proxyUrl}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Import for Globe icon
import { Globe } from 'lucide-react';