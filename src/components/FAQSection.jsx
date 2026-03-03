import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./AccordionFaq";

const BulletList = ({ items }) => (
  <ul className="list-none space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-center">
        <div className="w-2 h-2 bg-[#1E293B] rounded-full mr-3"></div>
        <span className="text-gray-600 font-medium">{item}</span>
      </li>
    ))}
  </ul>
);

const FAQSection = () => {
const FAQData = {
  heading: "Frequently Asked Questions",
  info: "Everything you need to know about using Reserviq and managing your room bookings.",
  items: [
    {
      question: "How do I book a room?",
      answer:
        "After logging in, navigate to the Rooms page, select your preferred room, choose your check-in and check-out dates, and confirm your booking if the room is available.",
      type: "text",
    },
    {
      question: "How does availability checking work?",
      answer:
        "Reserviq validates your selected dates against existing bookings to ensure there are no conflicts. If the room is available for your chosen dates, you can proceed with confirmation instantly.",
      type: "text",
    },
    {
      question: "Can I view my previous bookings?",
      answer:
        "Yes. You can access all your confirmed reservations from the 'My Bookings' section in the dashboard, where you can review booking details and dates.",
      type: "text",
    },
    {
      question: "What happens if a room is not available?",
      answer:
        "If the selected dates overlap with an existing booking, Reserviq will notify you immediately and prompt you to choose different dates.",
      type: "text",
    },
    {
      question: "Is authentication required to book a room?",
      answer:
        "Yes. Reserviq uses a protected dashboard system, and users must log in before accessing room listings or confirming bookings.",
      type: "text",
    },
    {
      question: "What if the system encounters an error?",
      answer:
        "In case of an API or system error, Reserviq displays a clear error message and allows you to retry the action without losing your selected details.",
      type: "text",
    },
  ],
};


  const renderAnswer = (item) => {
    if (item.type === "list") {
      return (
        <div className="space-y-4">
          {item.introduction && (
            <p className="text-gray-800 font-medium">{item.introduction}</p>
          )}
          <BulletList items={item.answer} />
        </div>
      );
    }
    return <p className="text-gray-600 font-medium">{item.answer}</p>;
  };

  const half = Math.ceil(FAQData.items.length / 2);
  const leftColumn = FAQData.items.slice(0, half);
  const rightColumn = FAQData.items.slice(half);

  return (
    <div className="relative mx-auto max-w-full bg-[#FAF9F6] py-24 border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-6 tracking-tight">
            {FAQData.heading}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {FAQData.info}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {leftColumn.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-gray-900 font-bold text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {renderAnswer(item)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {rightColumn.map((item, index) => (
              <AccordionItem
                key={index + half}
                value={`item-${index + half}`}
                className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-gray-900 font-bold text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {renderAnswer(item)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
