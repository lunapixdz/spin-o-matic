import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
  return (
    <form 
      action="https://formsubmit.co/lunapixstudio@gmail.com" 
      method="POST" 
      className="space-y-6 max-w-md mx-auto"
    >
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full min-h-[150px]"
        />
      </div>
      <Button
        type="submit"
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;