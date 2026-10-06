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
    id: "signed",
    question: "Do I need to be signed?",
    lead: "No.",
    body: [
      { type: "p", text: "SHOWGUY is built to work with ambitious independent artists, bands and developing projects." },
      { type: "p", text: "If you are signed or already work with management, we can still potentially work alongside your existing team." },
    ],
  },
  {
    id: "following",
    question: "Do I need a big following?",
    lead: "No.",
    body: [
      { type: "p", text: "We care more about:" },
      {
        type: "ul",
        items: ["the quality of the artist project", "consistency", "ambition", "willingness to create", "whether there is something worth building"],
      },
      { type: "p", text: "A large existing audience helps, but it is not a requirement." },
    ],
  },
  {
    id: "location",
    question: "Do I need to live near SHOWGUY?",
    lead: "No.",
    body: [
      { type: "p", text: "Most of the current SHOWGUY service is designed to work remotely." },
      { type: "p", text: "Artists supply raw footage and materials, and SHOWGUY handles the strategy, editing, campaign planning and digital execution." },
      { type: "p", text: "Physical production may be added separately where appropriate." },
    ],
  },
  {
    id: "filming",
    question: "Do you film content?",
    lead: "Not as part of the standard monthly package.",
    body: [
      { type: "p", text: "The current service is primarily designed around artist-supplied footage." },
      { type: "p", text: "Professional filming, photography or production can be arranged separately where appropriate." },
    ],
  },
  {
    id: "guarantees",
    question: "Do you guarantee streams, followers or playlists?",
    lead: "No.",
    body: [
      { type: "p", text: "SHOWGUY does not sell guaranteed streams, fake engagement or guaranteed playlist placements." },
      {
        type: "p",
        text: "The goal is to improve the quality and consistency of an artist's marketing and give their music a better chance of reaching and converting real audiences.",
      },
    ],
  },
  {
    id: "after-three-months",
    question: "What happens after the first 3 months?",
    body: [
      { type: "p", text: "The Founding Artist engagement begins with a three-month initial term." },
      { type: "p", text: "After that, we review what worked, where the artist is going next and whether continuing together makes sense." },
      { type: "p", text: "If both sides want to continue, the relationship can move onto an ongoing arrangement." },
    ],
  },
  {
    id: "managers-labels",
    question: "Can managers or labels work with SHOWGUY?",
    lead: "Yes.",
    body: [
      { type: "p", text: "SHOWGUY can work directly with:" },
      { type: "ul", items: ["artists", "artist managers", "independent labels", "small artist teams"] },
      { type: "p", text: "The exact working relationship can be adapted depending on who is coordinating the project." },
    ],
  },
];
