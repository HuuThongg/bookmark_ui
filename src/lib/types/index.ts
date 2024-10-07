import type { Folder } from "./folder";

export type Fetch = typeof window.fetch;
export interface OpenContextMenuEventDetail {
  link_id: string;
}
export interface TreeItem {
  children?: TreeItem[];
  folderInfo: Folder;
}
