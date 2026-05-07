import { useState } from 'react';
import { Gamepad2, Play, Maximize2, X, Search } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
}

interface GamesProps {
  onSelectGame: (url: string) => void;
}

const gamesData: Game[] = [
  { id: '1', title: 'Super Mario 64', category: 'Platformer', image: 'https://placehold.co/300x200/3a0ca3/white?text=Super+Mario', url: 'https://example.com/mario' },
  { id: '2', title: 'The Legend of Zelda', category: 'Adventure', image: 'https://placehold.co/300x200/7209b7/white?text=Zelda', url: 'https://example.com/zelda' },
  { id: '3', title: 'Sonic the Hedgehog', category: 'Platformer', image: 'https://placehold.co/300x200/3b82f6/white?text=Sonic', url: 'https://example.com/sonic' },
  { id: '4', title: 'Pac-Man', category: 'Arcade', image: 'https://placehold.co/300x200/f59e0b/white?text=Pac-Man', url: 'https://example.com/pacman' },
  { id: '5', title: 'Doom', category: 'Shooter', image: 'https://placehold.co/300x200/dc2626/white?text=Doom', url: 'https://example.com/doom' },
  { id: '6', title: 'Tetris', category: 'Puzzle', image: 'https://placehold.co/300x200/10b981/white?text=Tetris', url: 'https://example.com/tetris' },
  { id: '7', title: 'Street Fighter II', category: 'Fighting', image: 'https://placehold.co/300x200/6366f1/white?text=Street+Fighter', url: 'https://example.com/streetfighter' },
  { id: '8', title: 'Mortal Kombat', category: 'Fighting', image: 'https://placehold.co/300x200/ef4444/white?text=Mortal+Kombat', url: 'https://example.com/mortalkombat' },
  { id: '9', title: 'Final Fantasy VII', category: 'RPG', image: 'https://placehold.co/300x200/8b5cf6/white?text=Final+Fantasy', url: 'https://example.com/finalfantasy' },
];

export default function Games({ onSelectGame }: GamesProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(gamesData.map(game => game.category)))];

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    if (onSelectGame) {
      onSelectGame(game.url);
    }
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="p-8">
      {selectedGame ? (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleCloseGame}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Close Game</span>
              </button>
              <div className="h-6 w-px bg-gray-700" />
              <h2 className="text-xl font-bold text-white">{selectedGame.title}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => document.documentElement.requestFullscreen()}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
                <span>Full Screen</span>
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={selectedGame.url}
              className="w-full h-full border-none"
              title={selectedGame.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-3.5 text-gray-500">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <div
                key={game.id}
                onClick={() => handleGameClick(game)}
                className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-red-900/20 transform hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {game.title}
                      </h3>
                      <Play className="w-6 h-6 text-white bg-red-600 rounded-full p-1 shadow-lg group-hover:bg-red-500 transition-colors" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{game.category}</span>
                    <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded-full">
                      Classic
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}