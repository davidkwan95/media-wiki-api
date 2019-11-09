/**
 * This program will search a phrase using MediaWiki API
 * and print the output into a CSV file
 * Usage: node wikiSearch.ts [searchPhrase] [path to csv output]
 */

const args = process.argv.slice(2);
const [searchPhrase, outputDir] = args;

console.log(searchPhrase, outputDir);
