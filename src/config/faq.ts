/**
 * Homepage FAQ. Edit the words here. `lead` is the short bold answer
 * ("No.", "Yes."); `body` is the rest, as paragraphs or bullet lists.
 */
export type FaqBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

export type FaqItem = {
  id: string;
  question: string;
  lead?: string;
  body: FaqBlock[];
};

export const faqs: FaqItem[] = [
  {
    id: "who",
    question: "Who does SHOWGUY work with?",
    body: [{ type: "p", text: "Independent artists, artist managers, labels, promoters and music businesses." }],
  },
  {
    id: "unsigned",
    question: "Do you work with unsigned artists?",
    lead: "Yes.",
    body: [{ type: "p", text: "We work with independent artists as well as established music teams." }],
  },
  {
    id: "one-project",
    question: "Can we hire SHOWGUY for one project?",
    lead: "Yes.",
    body: [
      {
        type: "p",
        text: "We offer defined creative and digital projects such as websites, campaign pages and strategy work.",
      },
    ],
  },
  {
    id: "monthly",
    question: "Do you offer monthly support?",
    lead: "Yes.",
    body: [
      {
        type: "p",
        text: "We can discuss an ongoing partnership built around an agreed monthly scope of work.",
      },
    ],
  },
  {
    id: "guarantees",
    question: "Do you guarantee streams or sales?",
    lead: "No.",
    body: [
      {
        type: "p",
        text: "We focus on agreed deliverables, professional execution and clear communication rather than guaranteeing outcomes outside our control.",
      },
    ],
  },
  {
    id: "remote",
    question: "Do you work remotely?",
    lead: "Yes.",
    body: [{ type: "p", text: "Much of our digital work can be delivered remotely." }],
  },
  {
    id: "websites",
    question: "Do you build websites?",
    lead: "Yes.",
    body: [{ type: "p", text: "We create websites and digital experiences tailored to artists and music businesses." }],
  },
  {
    id: "cost",
    question: "How much does it cost?",
    body: [
      {
        type: "p",
        text: "Costs depend on the requirements, scope and complexity of the project. Get in touch and we'll discuss the most appropriate approach.",
      },
    ],
  },
];
