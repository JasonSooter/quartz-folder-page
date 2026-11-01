# @functionalstoic/folder-page

Fork of [quartz-community/folder-page](https://github.com/quartz-community/folder-page) that lets a folder's `index.md` cap or hide the automatic page listing (see [Per-folder listing](#per-folder-listing)). Otherwise unchanged.

Renders folder index pages showing a listing of all pages within that folder. Automatically generates virtual index pages for folders that don't have one.

## Installation

```bash
npx quartz plugin add github:JasonSooter/quartz-folder-page
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:JasonSooter/quartz-folder-page
    enabled: true
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.FolderPage({
  showFolderCount: true,
  showSubfolders: true,
  prefixFolders: false,
});
```

## Configuration

| Option            | Type      | Default     | Description                                                                            |
| ----------------- | --------- | ----------- | -------------------------------------------------------------------------------------- |
| `showFolderCount` | `boolean` | `undefined` | Whether to show the number of items in the folder.                                     |
| `showSubfolders`  | `boolean` | `undefined` | Whether to show subfolders in the listing.                                             |
| `sort`            | `SortFn`  | `undefined` | A function to sort the pages in the folder.                                            |
| `prefixFolders`   | `boolean` | `false`     | Whether to prefix generated folder page titles with "Folder: " (e.g. "Folder: notes"). |

## Per-folder listing

A folder's `index.md` can control the automatic listing under its own content with one frontmatter key:

```yaml title="Places/index.md"
folderListing: 25 # show only the first 25 pages in the listing's sort order, under a "Latest 25 of N" heading
# folderListing: none   # hide the listing entirely
```

Without the key, the folder page is unchanged. Values other than a positive number or `none` are ignored.

The "Latest N of M" heading is English only; the plugin's other strings follow `locale`.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/FolderPage) for more information.

## License

MIT
