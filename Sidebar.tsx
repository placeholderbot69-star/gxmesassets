import { Gamepad2, Globe, Settings as SettingsIcon, Home } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isGameMode: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'proxy', label: 'Proxy Browser', icon: Globe },
  { id: 'games', label: 'Game Hub', icon: Gamepad2 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ activeView, onNavigate, isGameMode }: SidebarProps) {
  if (isGameMode) return null;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-40 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AMONGUS</h1>
            <div className="text-xs text-red-500 font-medium">GXMES PORTAL</div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                isActive
                  ? 'bg-red-900 text-white border-l-4 border-red-500'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-300">Proxy Active</span>
          </div>
          <div className="text-xs text-gray-500">
            Server: 172.64.149.154:80
          </div>
        </div>
      </div>
    </div>
  );
}