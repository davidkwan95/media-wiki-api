/**
 * This program will search a phrase using MediaWiki API
 * and print the output into a CSV file
 * Usage: node wikiSearch.ts [searchPhrase] [path to csv output]
 */
import path from "path";

import WikiMediaAPI from "./api/wikiMedia";
import WikiSearchCSVWriter from "./utils/wikiSearchCSVWriter";

async function main() {
  const args = process.argv.slice(2);
  const [searchPhrase, outputPath] = args;

  const api = new WikiMediaAPI();
  const absoluteOutputPath = path.resolve(outputPath);
  const csvWriter = new WikiSearchCSVWriter(absoluteOutputPath);

  let finishFetching = false;
  let offset = 0;
  while (!finishFetching) {
    console.log(`Fetching ${searchPhrase} with offset ${offset}`);
    const res = await api.search(searchPhrase, offset);
    const {
      continue: con,
      query: { search: records }
    } = res;

    if (con) {
      offset = con.sroffset;
    } else {
      finishFetching = true;
    }
    csvWriter.write(records);
  }

  csvWriter.end(() => console.log(`Done, output in ${absoluteOutputPath}`));
}

main();
