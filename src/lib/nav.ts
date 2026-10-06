import "server-only";
import { mainNav, type NavItem } from "@/config/navigation";
import { hasPublishedPosts } from "@/lib/journal";

/** Header links. "Journal" only appears once there is a real published article. */
export function getMainNav(): NavItem[] {
  return hasPublishedPosts() ? [...mainNav, { label: "Journal", href: "/journal" }] : mainNav;
}
