/**
 * Search model and ranking for the header search dialog. Runs in the browser,
 * so it must stay free of `astro:content` imports; the index is built in
 * `src/pages/search-index.json.ts`.
 */

/** Most rows the dialog shows for a query. */
export const RESULT_LIMIT = 8;

export interface SearchItem {
  type: "Story" | "Author" | "Department" | "Tag";
  title: string;
  /** Labels shown under the title. Also searchable. */
  meta: string[];
  /** Searchable but never displayed. */
  keywords: string;
  href: string;
}

/** Lower is better: title prefix, then title, then labels, then supporting text. */
const rankTerm = (item: SearchItem, term: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(term)) return 0;
  if (title.includes(term)) return 1;
  if (`${item.type} ${item.meta.join(" ")}`.toLowerCase().includes(term)) return 2;
  if (item.keywords.toLowerCase().includes(term)) return 3;
  return Number.POSITIVE_INFINITY;
};

/** Items matching every term, best first. Equal ranks keep index order. */
export const searchItems = (items: SearchItem[], query: string) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return items
    .map((item, position) => ({
      item,
      position,
      rank: terms.reduce((total, term) => total + rankTerm(item, term), 0) / terms.length,
    }))
    .filter(({ rank }) => Number.isFinite(rank))
    .sort((a, b) => a.rank - b.rank || a.position - b.position)
    .map(({ item }) => item);
};

export const resultCount = (count: number) => `${count} ${count === 1 ? "result" : "results"}`;
