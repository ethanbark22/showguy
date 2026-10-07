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
    id: "what",
    question: "What does SHOWGUY actually do?",
    body: [
      {
        type: "p",
        text: "We help artists, managers and labels plan, build and execute the digital side of releases and music projects.",
      },
    ],
  },
  {
    id: "one-campaign",
    question: "Can we hire you for one campaign?",
    lead: "Yes.",
    body: [{ type: "p", text: "SHOWGUY can work on a defined project with an agreed scope and deliverables." }],
  },
  {
    id: "ongoing",
    question: "Do you offer ongoing support?",
    lead: "Yes.",
    body: [
      {
        type: "p",
        text: "For clients with a regular pipeline of releases or digital work, we can work as an ongoing external digital partner.",
      },
    ],
  },
  {
    id: "websites",
    question: "Do you build websites?",
    lead: "Yes.",
    body: [{ type: "p", text: "Websites, release pages and campaign landing pages are part of our digital capabilities." }],
  },
  {
    id: "social",
    question: "Do you manage social media?",
    body: [
      {
        type: "p",
        text: "SHOWGUY is not positioned as a generic social media management agency. Social content may support a campaign, but our focus is the wider digital campaign and project.",
      },
    ],
  },
  {
    id: "guarantees",
    question: "Do you guarantee streams or followers?",
    lead: "No.",
    body: [
      {
        type: "p",
        text: "We focus on strategy, execution and agreed deliverables rather than guaranteeing outcomes outside our control.",
      },
    ],
  },
  {
    id: "existing-team",
    question: "Can you work with our existing team?",
    lead: "Yes.",
    body: [
      {
        type: "p",
        text: "SHOWGUY can work alongside managers, labels, artists, designers, videographers, PR teams and other partners.",
      },
    ],
  },
  {
    id: "cost",
    question: "How much does it cost?",
    body: [
      {
        type: "p",
        text: "Pricing depends on the scope, complexity and whether the work is a one-off project or ongoing partnership. Tell us what you're working on and we'll discuss the best approach.",
      },
    ],
  },
];
