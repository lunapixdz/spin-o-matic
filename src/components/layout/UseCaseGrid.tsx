import React from 'react';

const useCases = [
  {
    title: "YouTube Giveaways",
    description: "Enhance your YouTube giveaways with a random choice generator! Use a wheel spinner app to select winners from commenters or subscribers during live streams or giveaway events, making the process fun and fair."
  },
  {
    title: "Twitch or Live Streaming Engagement",
    description: "Boost your Twitch or live streaming engagement by creating a decision-making wheel filled with fun challenges or rewards. Viewers can spin the wheel by donating or redeeming channel points, ensuring interactive and memorable streams."
  },
  {
    title: "Social Media Engagement",
    description: "Run exciting contests on social platforms where followers can spin a random picker tool to win prizes or earn special shoutouts. This adds an element of surprise that keeps audiences engaged."
  },
  {
    title: "Content Brainstorming for Creators",
    description: "Struggling to pick your next video topic? Let the wheel spinner app decide! Use it to randomly select video topics, challenges, or games, perfect for YouTubers and streamers looking to spice up their content."
  },
  {
    title: "Gaming Streams",
    description: "Transform your gaming sessions with a wheel spin game! Use it to determine in-game challenges, character selections, or random actions, creating unpredictable and thrilling live gaming experiences."
  },
  {
    title: "Trivia or Quiz Games",
    description: "Add excitement to online quizzes with a random picker tool. Spin the wheel to choose a question or category, making your trivia games more dynamic and engaging."
  },
  {
    title: "Online Workshops or Webinars",
    description: "Keep your virtual events lively by spinning a decision-making wheel to select lucky attendees for prizes, free consultations, or exclusive resources."
  },
  {
    title: "Virtual Classrooms",
    description: "Teachers can gamify learning by using a wheel spin tool to randomly select students for answering questions, presenting, or leading activities in online classes."
  },
  {
    title: "Team Collaboration Tools",
    description: "Facilitate productive meetings by using a random picker tool to assign tasks or choose topics for group discussions during virtual team collaborations."
  },
  {
    title: "Content Creators' Decision-Making",
    description: "When undecided, use a customizable wheel spinner to determine which type of video, reel, or post to create next. It's a fun and efficient way to overcome creative blocks."
  },
  {
    title: "Fan Challenges",
    description: "Engage your fans by letting them submit challenges. Spin a random choice generator live to decide the next challenge, creating interactive and exciting fan experiences."
  },
  {
    title: "Online Productivity Games",
    description: "Turn prioritization into a game! Use the wheel spinner tool to decide what task to tackle next, making productivity fun and motivating."
  },
  {
    title: "Event Organizers",
    description: "During virtual events, keep attendees entertained with a wheel spin game to select winners or topics for discussion. This interactive feature can enhance attendee engagement."
  },
  {
    title: "Online Dating or Icebreakers",
    description: "Use a random picker tool during virtual speed dating or team-building events to select discussion topics, breaking the ice effortlessly."
  },
  {
    title: "E-Commerce or Online Stores",
    description: "Drive sales and engagement by offering shoppers a chance to spin a random picker tool for discounts, freebies, or exclusive deals. Add excitement to the shopping experience and encourage repeat visits."
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