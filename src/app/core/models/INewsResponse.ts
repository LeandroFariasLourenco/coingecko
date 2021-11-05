import { IArticle } from "./IArticle";

export interface INewsResponse {
  articles: IArticle[];
  page: number;
  page_size: number;
  status: string;
  total_hits: number;
  total_pages: number;
  user_input: {
    from: string;
    lang: string;
    page: number;
    q: string;
    size: number;
    sort_by: string;
  }
}