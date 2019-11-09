import fs from "fs";
import { createObjectCsvStringifier } from "csv-writer";
import { ObjectCsvStringifier } from "csv-writer/src/lib/csv-stringifiers/object";

import { IWikiMediaAPISearchItem } from "../api/wikiMedia";

interface IWikiSearchCSVWriter {
  write(records: IWikiMediaAPISearchItem[]): void;
}

export default class WikiSearchCSVWriter implements IWikiSearchCSVWriter {
  private fileStreamWriter: fs.WriteStream;
  private csvStringifier: ObjectCsvStringifier;

  constructor(path: fs.PathLike) {
    this.csvStringifier = createObjectCsvStringifier({
      header: [
        { id: "ns", title: "ns" },
        { id: "title", title: "title" },
        { id: "pageid", title: "pageid" },
        { id: "size", title: "size" },
        { id: "wordcount", title: "wordcount" },
        { id: "snippet", title: "snippet" }
      ]
    });

    this.fileStreamWriter = fs.createWriteStream(path);
    this.fileStreamWriter.write(this.csvStringifier.getHeaderString());
  }

  public write(items: IWikiMediaAPISearchItem[]): void {
    const recordString = this.stringifyRecords(items);
    this.fileStreamWriter.write(recordString);
  }

  public end(callback?: () => void): void {
    this.fileStreamWriter.end(callback);
  }

  private stringifyRecords(records: IWikiMediaAPISearchItem[]) {
    return this.csvStringifier.stringifyRecords(records);
  }
}
