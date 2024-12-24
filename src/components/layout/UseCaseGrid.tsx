import React from 'react';

const useCases = [
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
];

const UseCaseGrid = () => {
  return (
    <div className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-center mb-12">What is WheelSpin for?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-primary">{useCase.title}</h3>
            <p className="text-gray-600">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCaseGrid;