/**
 * took this from a blog post that I found in the Astro 
 * recipes documentation. Going to link to it here: 
 * 
 * https://kld.dev/building-table-of-contents/
 */

import type { MarkdownHeading } from "astro";

export function buildToc(headings: MarkdownHeading[]) {
    const toc = [] as any;
    const parentHeadings = new Map();
    headings.forEach((h) => {
      const heading = { ...h, subheadings: [] };
      parentHeadings.set(heading.depth, heading);
      // Change 2 to 1 if your markdown includes your <h1>
      if (heading.depth === 2) {
        toc.push(heading);
      } else {
        parentHeadings.get(heading.depth - 1).subheadings.push(heading);
      }
    });
    return toc;
  }