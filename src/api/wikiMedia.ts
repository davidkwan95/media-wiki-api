/**
 * Client class to help access WikiMedia API
 * Using the English Wikipedia API endpoint by default
 */

import superagent from "superagent";

interface IWikiMediaAPISearchItem {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
}

interface IWikiMediaAPISearchBodyResponse {
  continue?: {
    sroffset: number;
  };
  query: {
    searchinfo: {
      totalhits: number;
      suggestion: string;
      suggestionsnippet: string;
    };
    search: IWikiMediaAPISearchItem[];
  };
}

export default class WikiMediaAPI {
  private endpoint: string;

  constructor(endpoint: string = "https://en.wikipedia.org/w/api.php") {
    this.endpoint = endpoint;
  }

  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public async search(
    searchPhrase: string,
    sroffset: number = 0
  ): Promise<IWikiMediaAPISearchBodyResponse> {
    const endpoint = this.endpoint;
    const res = await superagent.get(endpoint).query({
      action: "query",
      list: "search",
      srsearch: searchPhrase,
      sroffset,
      format: "json"
    });

    return res.body;
  }
}
