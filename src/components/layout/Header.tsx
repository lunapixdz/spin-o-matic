import { Settings, Maximize } from "lucide-react";

interface HeaderProps {
  toggleFullscreen: () => void;
  onOpenSettings: () => void;
}

const Header = ({ toggleFullscreen, onOpenSettings }: HeaderProps) => {
  return (
    <div className="bg-[#9b87f5] shadow-md py-4 px-8 flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/df6127cc-c100-4aec-b439-d7cd7492f6fd.png" 
          alt="Wheel Logo" 
          className="h-10 w-auto object-contain"
          onError={(e) => {
            console.error('Logo failed to load:', e);
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
          }}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Maximize className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;