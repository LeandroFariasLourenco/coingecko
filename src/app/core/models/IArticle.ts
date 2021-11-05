export interface IArticle {
  _id: string;
  _score: number;
  author: string;
  authors: string[];
  clean_url: string;
  country: string;
  is_opinion: boolean;
  language: string;
  link: string;
  media: string;
  published_date: string;
  published_date_precision: string;
  rank: number;
  rights: string;
  summary: string;
  title: string;
  topic: string;
  twitter_account: string;
  expanded: boolean;
}