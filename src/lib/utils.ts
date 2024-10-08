import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { isOpenCreatedFolderComponent } from './stores';
import { sidebarSelectedFolderId } from './stores/folder.store';
import { toast } from 'svelte-sonner';
import type { Folder } from './types/folder';
import type { TreeItem } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};

export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookiePart = parts.pop();
    if (cookiePart) {
      return cookiePart.split(';')[0];
    }
  }
  return null;
};
export const inputClass =
  'bg-bg-alternative text-color placeholder:text-secondary-text focus-visible:bg-bg  flex h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export function resetOpenCreateFolderUi() {
  isOpenCreatedFolderComponent.set(false);
  sidebarSelectedFolderId.set(null);
}

export const copyToClipboard = async (secret: string) => {
  try {
    await navigator.clipboard.writeText(secret);
    toast.message("Copied to clipboard")
  } catch (error) {
    toast.error("Cnable to copy to clipboard")
  }
};


export const debounce = (callback: Function, wait = 300) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};

//export function buildTree(folders: Folder[], parentFolderID: string | null): TreeItem[] {
//  const currentFolders = folders.filter((folder) => folder.subfolder_of === parentFolderID);
//  return currentFolders.map((folder) => {
//    const children = buildTree(folders, folder.folder_id);
//    return {
//      folderInfo: folder,
//      children: children.length > 0 ? children : undefined, // Omit empty children
//    };
//  });
//}
export function buildTree(folders: Folder[], parentFolderID: string | null): TreeItem[] {
  const currentFolders = folders.filter((folder) => folder.subfolder_of === parentFolderID);

  return currentFolders.map((folder) => {
    const children = buildTree(folders, folder.folder_id);

    // Create a copy to avoid mutating the original item
    const treeItem: TreeItem = { ...folder, folderInfo: folder };

    // Remove children if undefined or empty
    if (!children || children.length === 0) {
      delete treeItem.children;
    } else {
      treeItem.children = children;
    }

    return treeItem;
  });
}

