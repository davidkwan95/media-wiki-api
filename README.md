# media-wiki-api

Wikipedia Search using wikimedia api in node.js and writes the result into a csv file

### Prerequisite

- yarn
- node >= 10

### Installing

```
yarn install
yarn build
```

For developing, run `yarn watch` to watch for file changes

### Usage

```
yarn wikiSearch [searchPhrase] [path/to/output.csv]
```

#### Example:

```
yarn wikiSearch David ~/Downloads/output.csv
yarn wikiSearch "Bill Gates" ./gates.csv
```
