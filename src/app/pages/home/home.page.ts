import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/core/services/coingecko.service';
import { finalize, take } from 'rxjs/operators';
import { ICoinList, ITrendingCoin } from 'src/app/core/models';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IExchange } from 'src/app/core/models/IExchange';
import { NewsService } from 'src/app/core/services/news.service';
import { IArticle } from 'src/app/core/models/IArticle';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  trendingCoins: ITrendingCoin[] = [];

  loading = {
    ping: false,
    coins: false,
    trending: true,
    exchanges: true,
    news: true,
  };

  coinsList: ICoinList[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', icon: 'assets/images/coins/bitcoin.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'eth', icon: 'assets/images/coins/ethereum.png' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'ltc', icon: 'assets/images/coins/litecoin.png' },
    { id: 'cardano', name: 'Cardano', symbol: 'ada', icon: 'assets/images/coins/cardano.png' },
    { id: 'binance-coin', name: 'Binance Coin', symbol: 'bnb', icon: 'assets/images/coins/binance-coin.png' },
    { id: 'ethereum-classic', name: 'Ethereum Classic', symbol: 'etc', icon: 'assets/images/coins/ethereum-classic.png' },
  ];

  exchanges: IExchange[] = [];

  articles: IArticle[] = [];

  expandedArticle: IArticle;

  trendingSwiperConfig: SwiperConfigInterface = {
    slidesPerView: 3.5,
    loop: true,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    }
  };

  exchangesSwiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    autoplay: {
      delay: 9000,
      disableOnInteraction: true,
    }
  };

  articleSwiperConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 15000,
    }
  };

  validPing = false;

  constructor(
    private coingeckoService: CoingeckoService,
    private newsService: NewsService,
    private cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listExchanges();
    this.listShowCaseCoins();
    this.getNews();
  }

  getNews(): void {
    this.loading.news = true;
    this.newsService.getCryptoNews()
      .pipe(take(1))
      .pipe(finalize(() => this.loading.news = false))
      .subscribe((news) => {
        this.articles = news.articles.map((article) => ({
          ...article,
          expanded: false,
        }));
        console.log(this.articles);
      }, console.error);
  }

  listShowCaseCoins(): void {
    this.loading.trending = true;
    this.coingeckoService.getTrendingCoins()
      .pipe(take(1))
      .pipe(finalize(() => this.loading.trending = false))
      .subscribe(({ coins }) => {
        this.trendingCoins = [...coins];
      }, console.error);
  }

  listExchanges(): void {
    this.loading.exchanges = true;
    this.coingeckoService.getExchanges()
      .pipe(take(1))
      .pipe(finalize(() => this.loading.exchanges = false))
      .subscribe((exchanges) => {
        this.exchanges = [...exchanges];
      }, console.error);
  }

  pingCoingecko(): void {
    this.loading.ping = true;
    this.coingeckoService.ping()
      .pipe(take(1))
      .pipe(finalize(() => this.loading.ping = false))
      .subscribe(({ gecko_says }) => {
        this.validPing = gecko_says.includes('To the Moon!');
      }, console.error);
  }

  listCoins(): void {
    this.loading.coins = true;
    this.coingeckoService.getCoinsList()
      .pipe(take(1))
      .pipe(finalize(() => this.loading.coins = false))
      .subscribe(() => {

      }, console.error);
  }

  toggleArticleDetails(article: IArticle): void {
    if (!this.expandedArticle) {
      this.expandedArticle = article;
      return;
    }

    if (this.expandedArticle._id !== article._id) {
      this.expandedArticle = article;
    } else {
      this.resetExpandedArticle();
    }
  }

  resetExpandedArticle(): void {
    this.expandedArticle = null;
  }
}
