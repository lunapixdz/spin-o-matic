import { Settings, Maximize } from "lucide-react";

interface HeaderProps {
  toggleFullscreen: () => void;
  onOpenSettings: () => void;
}

const Header = ({ toggleFullscreen, onOpenSettings }: HeaderProps) => {
  return (
    <div className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">wheelspin.site</h1>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Maximize className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;