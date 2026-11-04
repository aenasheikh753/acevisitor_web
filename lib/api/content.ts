import { aboutContent } from "@/lib/content/about";
import { adminContent } from "@/lib/content/admin";
import { authContent } from "@/lib/content/auth";
import { chatContent } from "@/lib/content/chat";
import { contactContent } from "@/lib/content/contact";
import { footerContent } from "@/lib/content/footer";
import { galleryContent } from "@/lib/content/gallery";
import { homeContent } from "@/lib/content/home";
import { industriesContent } from "@/lib/content/industries";
import { navContent } from "@/lib/content/nav";
import { platformContent } from "@/lib/content/platform";
import { securityContent } from "@/lib/content/security";
import { solutionsContent } from "@/lib/content/solutions";
import { themeContent } from "@/lib/content/theme";
import { errorContent, loadingContent, notFoundContent } from "@/lib/content/states";

export async function getHomeContent() {
  return homeContent;
}

export async function getNavContent() {
  return navContent;
}

export async function getNavLinks() {
  return navContent.links;
}

export async function getTheme() {
  return themeContent;
}

export async function getGalleryContent() {
  return galleryContent;
}

export async function getGalleryItems() {
  return galleryContent.slides;
}

export async function getFooter() {
  return footerContent;
}

export async function getPlatformContent() {
  return platformContent;
}

export async function getSolutionsContent() {
  return solutionsContent;
}

export async function getIndustriesContent() {
  return industriesContent;
}

export async function getSecurityContent() {
  return securityContent;
}

export async function getAboutContent() {
  return aboutContent;
}

export async function getContactContent() {
  return contactContent;
}

export async function getAuthContent() {
  return authContent;
}

export async function getAdminContent() {
  return adminContent;
}

export async function getChatContent() {
  return chatContent;
}

export async function getLoadingContent() {
  return loadingContent;
}

export async function getErrorContent() {
  return errorContent;
}

export async function getNotFoundContent() {
  return notFoundContent;
}
