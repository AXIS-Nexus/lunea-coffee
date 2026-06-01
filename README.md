[README.md](https://github.com/user-attachments/files/28473805/README.md)
# Lunéa Coffee

Lunéa Coffee は、月明かり・ネイビー・余白感をテーマに制作した架空カフェの1ページサイトです。
SVG ロゴ描画アニメーション、レスポンシブ対応、ハンバーガーメニュー、スクロールアニメーションを実装し、小規模店舗サイトとしての世界観と実用性の両立を目指しました。

## 使用技術

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- WebP

## 実装ポイント

- Hero の SVG ロゴ描画アニメーション
- `.js-enabled` による JavaScript 無効時フォールバック
- `prefers-reduced-motion` 対応
- スクロール時の固定ヘッダー切り替え
- スマホ向けハンバーガーメニュー
- `IntersectionObserver` によるスクロールフェード

## ファイル構成

```txt
lunea-coffee/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── hero-latte-bake.webp
│   ├── concept-window-seat.webp
│   ├── menu-scone-coffee.webp
│   ├── seasonal-lavender-latte.webp
│   ├── seasonal-moon-cream-soda.webp
│   ├── seasonal-berry-tart.webp
│   ├── seasonal-blue-lemonade.webp
│   ├── gallery-bake.webp
│   ├── gallery-hand-coffee.webp
│   ├── gallery-cafe-interior.webp
│   ├── gallery-blue-lemonade.webp
│   └── ogp-lunea-coffee.webp
├── svg/
│   ├── logo-lunea.svg
│   └── favicon.svg
├── downloads/
│   ├── lunea-coffee.zip
│   ├── css.zip
│   ├── js.zip
│   ├── images.zip
│   └── svg.zip
└── README.md
```

## ダウンロード

サイト一式は `downloads/lunea-coffee.zip` から確認できます。ZIP には `index.html`、`css/`、`js/`、`images/`、`svg/`、`README.md` が含まれます。

`downloads/` 配下には必要に応じて、個別フォルダ確認用の `css.zip`、`js.zip`、`images.zip`、`svg.zip` も残しています。

## 公開前メモ

開発中の `og:image` は `images/ogp-lunea-coffee.webp` の相対パスです。GitHub Pages 公開後は、公開 URL の絶対パスへ差し替えて OGP 表示を確認します。

## 注意事項

本サイトはポートフォリオ掲載用に制作した架空のカフェサイトです。実在の店舗・団体とは関係ありません。
