import type { JSONContent } from "@tiptap/react";

export interface TocItem {
  id?: string;
  text: string;
  level: number;
  children: TocItem[];
}

export const generateTocFromJSON = (doc: JSONContent): TocItem[] => {
  const toc: TocItem[] = [];
  const stack: { item: TocItem; level: number }[] = [];

  doc.content?.map((node) => {
    if (node.type === "heading") {
      const level = node.attrs?.level;
      const text = node.content?.[0]?.text as string;
      const id = node.attrs?.id || `${Date.now()}-${Math.random()}`;

      const item: TocItem = {
        id,
        text,
        level,
        children: [],
      };

      // 维护层级关系
      while (stack.length > 0 && stack[stack.length - 1]!.level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        toc.push(item);
        stack.push({ item, level });
      } else {
        const parent = stack[stack.length - 1]!.item;
        parent.children.push(item);
        stack.push({ item, level });
      }
    }
  });

  return toc;
};

export const generateTocFromHTML = (html: string): TocItem[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3"));

  const toc: TocItem[] = [];
  const stack: { item: TocItem; level: number }[] = [];

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName[1]!);
    const item = {
      id: heading.id || `${Date.now()}-${Math.random()}`,
      text: heading.textContent || "",
      level,
      children: [],
    };

    // 维护层级栈
    while (stack.length > 0 && stack[stack.length - 1]!.level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      toc.push(item);
      stack.push({ item, level });
    } else {
      const parent = stack[stack.length - 1]!.item;
      parent.children.push(item);
      stack.push({ item, level });
    }
  });

  return toc;
};
