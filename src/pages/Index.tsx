import { useState } from "react";
import WheelOfNames from "@/components/WheelOfNames";
import WinnerDialog from "@/components/WinnerDialog";
import Header from "@/components/layout/Header";
import FullscreenWheel from "@/components/layout/FullscreenWheel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

const INITIAL_NAMES = [
  "Emma Thompson",
  "James Wilson",
  "Sarah Parker",
  "Michael Chen",
  "Lisa Rodriguez",
  "David Kim",
];

const Index = () => {
  const [names, setNames] = useState<string[]>(INITIAL_NAMES);
  const [winner, setWinner] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("We Have a Winner!");
  const [spinMode, setSpinMode] = useState<"selection" | "elimination">("selection");

  const handleAddName = (name: string) => {
    setNames((prev) => [...prev, name]);
  };

  const handleRemoveName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpin = (winner: string, mode: "selection" | "elimination") => {
    setSpinMode(mode);
    setWinner(winner);
    if (mode === "selection") {
      setWinners((prev) => [winner, ...prev]);
    }
    setWinnerMessage(mode === "elimination" && names.length > 2 ? "Eliminated!" : "We Have a Winner!");
  };

  const handleRemoveWinner = () => {
    if (winner) {
      const winnerIndex = names.indexOf(winner);
      if (winnerIndex !== -1) {
        handleRemoveName(winnerIndex);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (isFullscreen) {
    return (
      <FullscreenWheel
        names={names}
        onSpin={handleSpin}
        onAddName={handleAddName}
        onRemoveName={handleRemoveName}
        winners={winners}
        toggleFullscreen={toggleFullscreen}
        winner={winner}
        winnerMessage={winnerMessage}
        onCloseWinner={() => setWinner(null)}
        onRemoveWinner={handleRemoveWinner}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        toggleFullscreen={toggleFullscreen}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Entries</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <WheelOfNames
                names={names}
                onSpin={handleSpin}
                onAddName={handleAddName}
                onRemoveName={handleRemoveName}
                displayMode="list"
              />
            </div>
          </div>
          <div className="w-full md:w-2/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <WheelOfNames
                  names={names}
                  onSpin={handleSpin}
                  onAddName={handleAddName}
                  onRemoveName={handleRemoveName}
                  displayMode="wheel"
                  winners={winners}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 mt-16 md:mt-0">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
                {winners.map((winner, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 rounded flex items-center justify-between"
                  >
                    <span>
                      <span className="font-semibold mr-2">#{index + 1}</span>
                      {winner}
                    </span>
                  </div>
                ))}
                {winners.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No winners yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold text-center mb-12">What is WheelSpin for?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "YouTube Giveaways",
                description: "Use a wheel spin to select winners from commenters or subscribers during live streams or giveaway events."
              },
              {
                title: "Twitch or Live Streaming Engagement",
                description: "Create a wheel of fun challenges or rewards that viewers can spin by donating or redeeming channel points."
              },
              {
                title: "Social Media Engagement",
                description: "Run contests where followers spin a wheel to determine their prize or a special shoutout."
              },
              {
                title: "Content Brainstorming",
                description: "Use a wheel to randomly pick video topics, challenges, or games for YouTubers and streamers."
              },
              {
                title: "Gaming Streams",
                description: "Use a wheel to determine in-game challenges, character selection, or random actions during a live gaming session."
              },
              {
                title: "Trivia or Quiz Games",
                description: "Add excitement to online quizzes by spinning the wheel to choose a random question or category."
              },
              {
                title: "Online Workshops or Webinars",
                description: "Use the wheel to pick a lucky attendee for prizes, free consultation, or exclusive resources."
              },
              {
                title: "Virtual Classrooms",
                description: "Randomly select which student will answer, present, or lead an activity during online classes."
              },
              {
                title: "Team Collaboration Tools",
                description: "Use the wheel to assign random tasks or choose topics for group discussions during virtual meetings."
              },
              {
                title: "Content Creators",
                description: "Decide which type of video, reel, or post to create next when undecided."
              },
              {
                title: "Fan Challenges",
                description: "Allow fans to submit challenges and spin the wheel live to pick the next challenge to complete."
              },
              {
                title: "Online Productivity Games",
                description: "Gamify task prioritization by spinning the wheel to decide what to work on next."
              },
              {
                title: "Event Organizers",
                description: "During virtual events, spin the wheel to select winners or topics to keep attendees engaged."
              },
              {
                title: "Online Dating or Icebreakers",
                description: "Use a wheel during virtual speed dating or team-building events to decide discussion topics."
              },
              {
                title: "E-Commerce or Online Stores",
                description: "Offer shoppers a chance to spin the wheel for discounts, freebies, or exclusive deals."
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-primary">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WinnerDialog
        winner={winner}
        winnerMessage={winnerMessage}
        onClose={() => setWinner(null)}
        onRemove={handleRemoveWinner}
        mode={spinMode}
        remainingCount={names.length}
      />
      
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Winner Message</label>
              <Input
                value={winnerMessage}
                onChange={(e) => setWinnerMessage(e.target.value)}
                placeholder="Enter winner message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Contact Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
