# 7.通信処理編

- 翻訳APIに日本語を送信し、翻訳結果を画面に表示するサンプルを作成する

## ゴール

- axiosを使った通信処理を実行できるようになる

## 完成形

![communication](/images/7/communication.gif)

## やること

- axiosのインストール
- 見た目の作成
- 通信処理の実装
- 通信結果を画面に反映

## axiosのインストール

- 今回は通信処理の実装に[axios](https://github.com/axios/axios)というライブラリを使う
- 以下のコマンドでaxiosをインストールする

```bash
npm i axios
```

## 見た目の作成

- `src/components/Translate.js`を作成する

```jsx
import React from 'react';
import translateApi from '../api/translateApi';

function Translate() {
  return (
    <div>
      <input />
      <button>日->英</button>
      <p>翻訳結果</p>
    </div>
  );
}

export default Translate;
```

- `App.js`をTranslateコンポーネントを使うように修正する

```jsx
import React from 'react';
import Translate from './components/Translate'; // importを追加

function App() {
  return <Translate />; // Translateコンポーネントを使用
}

export default App;
```

- ここまでで以下のような見た目が完成する

![communication2](/images/7/communication2.png)

- もうひと手間加えて、ボタンクリック時に入力内容を取得できるところまで実装しておく
    - これまでの章で学んだことの復習
- `src/components/Translate.js`を修正する

```jsx
import React from 'react';

function Translate() {
  // 入力域への参照を格納する変数を定義
  const input = React.useRef(null);

  // ボタンクリック時に実行するメソッドを定義
  const onClick = () => {
    // 入力内容を取得しalertで表示
    alert(input.current.value)
  };

  return (
    <div>
      {/* reg属性を追加 */}
      <input ref={input} />
      {/* onClick属性を追加 */}
      <button onClick={onClick}>日->英</button>
      <p>翻訳結果</p>
    </div>
  );
}

export default Translate;
```


## 通信処理の実装

- 今回のメインとなるaxiosを使った通信処理を実装する
- `src/api`ディレクトリを作成しそこに通信処理の実装を含むファイルを作成する
    - テストのしやすさや再利用性の観点からコンポーネントの中にロジックは極力含まないほうがよい

### 通信処理を行うメソッドの作成

- `src/api/translateApi.js`を作成する

```js
// ①axiosをimport
import axios from 'axios';

// ②接続先のURL
const url = 'https://script.google.com/macros/s/AKfycby3NwZhozMWbkS8evh2t3dvfJgKxCBdchI0Xdr31L_BoUb7uqyE/exec';

// ③翻訳したい文字列を引数で受け取る
export function translateJaToEn(text) {
  // ④通信処理を実行し結果をreturnしている
  return axios.get(`${url}?text=${text}&source=ja&target=en`);
}
```

- ①:axiosを使用するためにimportしている
- ②:今回用意した翻訳APIのURL
    - 個人アカウントで作成しているので叩き過ぎには注意!!
- ③:引数を一つ受け取る`translateJaToEn`メソッドを作成
- ④:axiosでgetの通信を実施し結果をreturnしている
    - `axios.get(URL)`の形式でget通信を実行することができる
    - 翻訳したい文字列をURLに含む仕様のため、引数として受け取った`text`を埋め込んでいる

> ### メモ
> - HTTP通信はURLとHTTPメソッドを指定することで通信先を特定することができる
> - axiosにはHTTPメソッドごとにメソッドが用意されており、`axios.get(URL)`や`axios.post(URL)`といった形式で使うことができる

> ### メモ
> - 通信処理を実行する際に任意のパラメータを渡すことができる(メソッドを実行する時に引数を渡すのと同じような感覚)
> - HTTPメソッドがGETの場合はURLにクエリとして付与する
>     - 以下の`?`移行がクエリに当たる
>     - `axios.get('http://localhost:8080/test?name=ozaki25&age=28')`
> - HTTPメソッドがGET以外の場合(POST等)は第二引数として渡すことができる
>     - `axios.post('http://localhost:8080/test', JSON.stringify({ name: 'ozaki25', age: 28 }))`
>     - 詳細はまた別の機会に

> ### メモ
> - JavaScriptは文字列を``(バッククオート)で定義した場合`${}`を使うことで変数を埋め込むことができる
> ```js
> const name = 'ozaki25';
> console.log(`Hello ${name} さん`);
> // Hello ozaki25 さん

### 通信処理を行うメソッドを使う

- Translateコンポーネントで、今作成した`translateJaToEn`メソッドを使うようにする

```jsx
import React from 'react';
// ①:importを追加
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  const input = React.useRef(null);
  const onClick = () => {
    // ②:通信処理を呼び出している
    const response = translateJaToEn(input.current.value);
    console.log(response);
  };

  return (
    <div>
      <input ref={input} />
      <button onClick={onClick}>日->英</button>
      <p>翻訳結果</p>
    </div>
  );
}

export default Translate;
```

- ①:先程作成した`translateJaToEn`メソッドをimportしている
    - これまでと違ってimport対象を`{}`で囲って記述しているのはexport時に`default`を使っていないため
    - 今後`translateEnToJa`等々が登場した時に追加しやすいようにdefaultエクスポートは使わなかった
    - [参考記事](https://qiita.com/ozaki25/items/9723cb3c1c72845157d5)
- ②:通信メソッドの実行結果を取得しconsoleに表示している
- この段階で翻訳したい日本語を入力してボタンを押すとコンソールに`Promise`と表示されてしまう

![communication3](/images/7/communication3.png)

- `Promise`を返すメソッドは非同期(=処理が完了する前に結果を返す)で実行されている
    - 今回の例でいうと通信処理が完了する前に結果がreturnされてしまう
    - 実行結果が分かる前にreturnしているので`Promise`という特殊な値が返される
- なので非同期処理の実行が完了してからreturnしてもらうように以下のような修正を加える

```jsx
import React from 'react';
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  const input = React.useRef(null);
  // asyncを追加
  const onClick = async () => {
    // awaitを追加
    const response = await translateJaToEn(input.current.value);
    console.log(response);
  };
  // 省略
}

export default Translate;
```

- `Promise`を返すメソッド実行時に`await`というキーワードを付与すると、処理が完了してから結果をreturnしてくれるようになる
- `await`が使われているメソッドには`async`というキーワードを定義しておかなければいけない
- この状態で実行すると以下のように通信処理の結果を取得することができている
    - 通信処理の結果は`data`プロパティに入っているので、ここでは`response.data`とすると翻訳結果にアクセスできる

![communication4](/images/7/communication4.png)


## 通信結果を画面に反映

- 翻訳APIにアクセスして結果を取得するところまでできたので、画面へ表示させる処理を追加する
- これまでの章にも登場した`React.useState`を使って翻訳結果の値を管理する

```jsx
import React from 'react';
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  // 翻訳結果を管理するStateを定義(初期値は空文字)
  const [result, setResult] = React.useState('');
  const input = React.useRef(null);
  const onClick = async () => {
    const response = await translateJaToEn(input.current.value);
    // 通信処理の結果をset
    setResult(response.data);
  };

  return (
    <div>
      <input ref={input} />
      <button onClick={onClick}>日->英</button>
      {/* Stateの値を表示するように変更 */}
      <p>{result}</p>
    </div>
  );
}

export default Translate;
```

- `useState`を使って`result`というStateを定義した
    - 初期値は空文字を設定している
- 翻訳を実行して結果が返ってきたら`setResult`を実行して結果をsetしている
- pタグの値を`result`変更することで翻訳結果を表示するようにした
- ここまでで入力した日本語を翻訳APIを使って英訳し、画面に表示するまでが完成した

![communication5](/images/7/communication5.png)
