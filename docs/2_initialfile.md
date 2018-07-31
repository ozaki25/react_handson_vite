# 2.雛形の整理

- `create-react-app`で生成したコードを整理する

## ディレクトリ構成の整理

- 今回は最小構成で作成するため以下の使わないファイルを削除する

```bash
rm public/manifest.json src/*
```

- srcディレクトリに最小構成のファイルを作成する

### src/index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### src/App.js

```jsx
import React from 'react';

const App = () => <h1>Hello World</h1>;

export default App;
```

### public/index.html

- htmlファイルの不要な記述を削除する

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 動作確認

- この状態で`npm start`すると画面に`Hello World`が表示される

![hello](/react_handson/images/2/hello.png)

## ファイル一覧

- ここまでで以下のようなディレクトリ構成になった

```
.
├── node_modules    // 外部ライブラリ
├── README.md       // プロジェクトの説明などを記載するファイル
├── package.json    // 依存するライブラリなどを記載するファイル
├── public          // Web上に公開するディレクトリ
│   ├── favicon.ico // ブラウザのタブに出るアイコン
│   └── index.html  // エントリーポイントとなるhtml
└── src             // 開発者が書くコードを置くディレクトリ
    ├── App.js      // ルートコンポーネント
    └── index.js    // Reactのコードのエントリーポイント
```

- 基本的に`src`配下のファイルをいじっていくことになる


## 雛形の動作の説明

- `npm start`を実行すると画面に`HelloWorld`が表示されるがどういった仕組みになっているのか
- 注目するファイルは以下の3つ
    - `public/index.html`
    - `src/App.js`
    - `src/index.js`

### index.html

- body部分だけ抜粋

```html
<body>
  <div id="root"></div>
</body>
```

- 画面に表示する要素は空っぽのdivタグだけしかない(空っぽなので何も表示されない)
    - `root`というid属性をつけている

### App.js


```jsx
import React from 'react';

const App = () => <h1>Hello World</h1>;

export default App;
```

- `App.js`の正体は`<h1>Hello World</h1>`というhtmlタグを返す関数である

> ### メモ
> - `const App = () => <h1>Hello World</h1>`はJavaScriptの関数(メソッド)の省略記法
> - 省略せずに書くと以下のようになる
>   ```jsx
>   const App = () => {
>     return <h1>Hello World</h1>;
>   }
>   ```
> - Javaでいう以下のメソッドと同じようなイメージ(厳密にはだいぶ違うけど)
>   ```java
>   public static String App() {
>     return "<h1>Hello World</h1>";
>   }
>   ```
>
>
> - `export default App;`のようにexportしないと、他のファイルから`import`できない

### index.js

- jsの世界とhtmlの世界をつなぐファイル

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

- 最後の行に注目する
    - ReactDOMのrenderメソッドを呼んでいる
        - App.jsの内容(`<h1>Hello World</h1>`)をid属性がrootの要素(index.htmlにあるdivタグ)に挿入する、という動きをする

![reactdom](/react_handson/images/reactdom.png)

- つまりApp.jsの内容を拡張していくことで、画面に表示する内容を拡張していくことができる

> #### メモ
> - JavaScriptでは外部ライブラリや別ファイルを`import`で読み込む
> - 自作のファイルは相対パスで指定する
> - 拡張子が`.js`の場合は省略できる


### まとめ

- これまでの3つのファイルを整理すると
    - index.html・・・空っぽのdivタグを配置(id属性にrootを設定)
    - App.js・・・h1タグを返す関数
    - index.js・・・id属性がrootのdivタグに、App.jsの内容(つまりh1タグ)を挿入している
- App.jsに当たる部分を拡張していくことでアプリを作っていく
