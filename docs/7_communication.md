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
- その他

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

- `src/App.js`をTranslateコンポーネントを使うように修正する

```jsx{2,5}
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

```jsx{4-5,7-11,15-18}
import React from 'react';

function Translate() {
  // 入力域への参照を格納する変数を定義
  const input = React.useRef(null);

  // ボタンクリック時に実行する関数を定義
  const onClick = () => {
    // 入力内容を取得しalertで表示
    alert(input.current.value)
  };

  return (
    <div>
      {/* ref属性を追加 */}
      <input ref={input} />
      {/* onClick属性を追加 */}
      <button onClick={onClick}>日->英</button>
      <p>翻訳結果</p>
    </div>
  );
}

export default Translate;
```

- ボタンをクリックすると入力内容がalertに表示されるようになった

## 通信処理の実装

- 今回のメインとなるaxiosを使った通信処理を実装する
- `src/api`ディレクトリを作成しそこに通信処理の実装を含むファイルを作成する
    - テストのしやすさや再利用性の観点からコンポーネントの中にロジックは極力含まないほうがよい

### 通信処理を行う関数の作成

- `src/api/translateApi.js`を作成する

```js
import axios from 'axios'; // axiosをimport

// 通信先のURLを定義
const url = 'https://script.google.com/macros/s/AKfycby3NwZhozMWbkS8evh2t3dvfJgKxCBdchI0Xdr31L_BoUb7uqyE/exec';

// 翻訳したい文字列を引数で受け取る関数
export function translateJaToEn(text) {
  // 通信処理を実行し結果を返却
  return axios.get(`${url}?text=${text}&source=ja&target=en`);
}
```

- 通信先のURLはGoogle翻訳を使っている
    - 個人アカウントで作成しているので叩き過ぎには注意!!
- 引数を一つ受け取る`translateJaToEn`関数を作成
    - 関数に`export`をつけることで別のファイルから`import`できるようにしている
    - axiosでgetの通信を実施し結果を`return`している
        - `axios.get(URL)`の形式でGETの通信を実行することができる
        - 今回使いAPIは翻訳したい文字列をURLに含む仕様のため、引数として受け取った`text`をURLに埋め込んでいる

::: tip
- HTTP通信はURLとHTTPメソッド(GETやPOST)を指定することで通信先を特定することができる
- axiosにはHTTPメソッドごとに関数が用意されており、`axios.get(URL)`や`axios.post(URL)`といった形式で使うことができる
:::

::: tip
- 通信処理を実行する際に任意のパラメータを渡すことができる(関数を実行する時に引数を渡すのと同じような感覚)
- HTTPメソッドがGETの場合はURLにクエリとして付与する
    - 以下の`?`以降がクエリに当たる
    - `axios.get('http://localhost:8080/test?name=ozaki25&age=28')`
- HTTPメソッドがGET以外の場合(POST等)は第二引数として渡すことができる
    - `axios.post('http://localhost:8080/test', JSON.stringify({ name: 'ozaki25', age: 28 }))`
    - 詳細はまた別の機会に
:::

::: tip
- JavaScriptは文字列を``(バッククオート)で定義した場合`${}`を使うことで変数を埋め込むことができる
```js
const name = 'ozaki25';
console.log(`Hello ${name} さん`);
// Hello ozaki25 さん
```
:::

### 作成した通信処理を行う関数を使用する

- Translateコンポーネントで、今作成した`translateJaToEn`関数を使うようにする

```jsx{2,7-9}
import React from 'react';
import { translateJaToEn } from '../api/translateApi'; // importを追加

function Translate() {
  const input = React.useRef(null);

  const onClick = () => {
    // 通信処理を呼び出している
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

- 通信処理の実行結果を取得しconsoleに表示している
    - この段階で翻訳したい日本語を入力してボタンを押すとコンソールに`Promise`と表示されてしまう

![communication3](/images/7/communication3.png)

- `Promise`を返す関数は非同期(=処理が完了する前に結果を返す)で実行されてしまう
    - 今回の例でいうと通信処理が完了する前に結果がreturnされてしまう
    - 実行結果が分かる前にreturnしているので`Promise`という特殊な値が返される
- なので非同期処理の実行が完了してからreturnしてもらうように以下のような修正を加える

```jsx{7-10}
import React from 'react';
import { translateJaToEn } from '../api/translateApi'; // importを追加

function Translate() {
  const input = React.useRef(null);

  // asyncを追加
  const onClick = async () => {
    // awaitを追加
    const response = await translateJaToEn(input.current.value);
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

- `Promise`を返す関数の実行時に`await`というキーワードを付与すると、処理が完了してから結果をreturnしてくれるようになる
- `await`を使うためには、その処理が記述されている関数に`async`というキーワードを定義しておかなければいけない
- この状態で実行すると以下のように通信処理の結果を取得することができている
    - 通信処理のレスポンスは`data`プロパティに入っているので、ここでは`response.data`とすると翻訳結果にアクセスできる

![communication4](/images/7/communication4.png)


## 翻訳結果を画面に反映

- 翻訳APIにアクセスして結果を取得するところまでできたので、画面へ表示させる処理を追加する
- これまでの章にも登場した`React.useState`を使って翻訳結果の値を管理する

```jsx{5-6,12-13,20-21}
import React from 'react';
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  // 翻訳結果を管理するStateを定義(初期値は空文字)
  const [result, setResult] = React.useState('');

  const input = React.useRef(null);

  const onClick = async () => {
    const response = await translateJaToEn(input.current.value);
    // 翻訳結果をsetする
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

- 6行目で`useState`を使って`result`というStateを定義した
    - 初期値は空文字を設定している
- onClick関数の中で翻訳処理を呼び出して結果が返ってきたら`setResult`を実行して結果をsetしている
- pタグの値を`result`に変更することで翻訳結果を表示するようにした
- ここまでで入力した日本語を翻訳APIを使って英訳し、画面に表示するまでが完成した

![communication5](/images/7/communication5.png)

## その他

- ここまでで機能は完成したが、実践的な場面も見据えてあと2つ機能を追加する

### エラーハンドリング

- 通信処理の実装をする時はエラーハンドリングを必ず考えないといけない
- 今回はエラーが発生した場合alertにメッセージを表示するようにする
- `src/api/translateApi.js`の`onClick`関数を修正する


```jsx{10-17}
import React from 'react';
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  const [result, setResult] = React.useState('');

  const input = React.useRef(null);

  const onClick = async () => {
    // try-catchを追加する
    try {
      const response = await translateJaToEn(input.current.value);
      setResult(response.data);
    } catch (e) {
      // エラーが起きた場合エラー内容をalertに出す
      alert(e.toString());
    }
  };

  return (
    <div>
      <input ref={input} />
      <button onClick={onClick}>日->英</button>
      <p>{result}</p>
    </div>
  );
}

export default Translate;
```

- try-catchを使うことで例外発生時のハンドリングを追加した
- ネットワークを切断してボタンを押してみると以下のようにalertが表示される

![communication6](/images/7/communication6.png)

### Loadingの表示

- 最後に、通信処理が実行されている間、処理中であることをユーザに伝えるためのLoadingを表示する
- 今回は通信中に文字列で`Loading...`と表示するようにしてみる
    - 実際のアプリではインジケータなどを出すようにするとよい
- `src/api/translateApi.js`を修正する

```jsx{6-7,13-14,19-21,25-26}
import React from 'react';
import { translateJaToEn } from '../api/translateApi';

function Translate() {
  const [result, setResult] = React.useState('');
  // 通信中かどうかを管理するStateを追加
  const [loading, setLoading] = React.useState(false);

  const input = React.useRef(null);

  const onClick = async () => {
    try {
      // 通信処理実行前にloadingにtrueをset
      setLoading(true);
      const response = await translateJaToEn(input.current.value);
      setResult(response.data);
    } catch (e) {
      alert(e.toString());
    } finally {
      // 処理が完了したらloadingにfalseをset
      setLoading(false);
    }
  };

  // loadingがtrueの場合はLoading...を表示する
  if (loading) return <p>Loading...</p>;

  // loadingがfalseの場合は今まで通り
  return (
    <div>
      <input ref={input} />
      <button onClick={onClick}>日->英</button>
      <p>{result}</p>
    </div>
  );
}

export default Translate;
```

- 7行目に通信中かどうかを管理するloadingというStateを追加した
    - この値がtrueなら`Loading...`を、falseならコンテンツを表示するようにする
- onClick関数の中でloadingの値を切り替えるようにした
    - 通信処理を開始する直前にloadingをtrueに更新
    - 通信処理が完了したらloadingをfalseに更新
        - `finally`の処理は、例外が発生してcatchに入った時も含めて必ず最後に実行される
- ここまでできると完成形と同じ動きが完成する

![communication](/images/7/communication.gif)

## 課題

- 日本語から英語に翻訳した結果を、英語から日本語に再翻訳する機能を実装してみよう
- 英語から日本語に翻訳するには`translateApi.js`の以下の実装部分を変更すればよい
    - クエリ部分の`source`が翻訳元の言語で`target`が翻訳後の言語を定義してるのでそこを書き換えることで翻訳言語を指定できる

```js
  return axios.get(`${url}?text=${text}&source=ja&target=en`);
```

![communication7](/images/7/communication7.gif)

## まとめ

- axiosを使うことで通信処理を実装することができる
- Promiseを返す非同期処理を扱う時はasync/awaitを使うとよい
- 通信処理を扱う時はエラーハンドリングやLoadingの表示にも気を使うとよい

## 課題の回答例

- `src/api/translateApi.js`

```js
import axios from 'axios';

const url =
  'https://script.google.com/macros/s/AKfycby3NwZhozMWbkS8evh2t3dvfJgKxCBdchI0Xdr31L_BoUb7uqyE/exec';

export function translateJaToEn(text) {
  return axios.get(`${url}?text=${text}&source=ja&target=en`);
}

export function translateEnToJa(text) {
  return axios.get(`${url}?text=${text}&source=en&target=ja`);
}
```

- `src/components/Translate.js`

```jsx
import React from 'react';
import { translateJaToEn, translateEnToJa } from '../api/translateApi';

function Translate() {
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const input = React.useRef(null);

  const onClickTranslate = async () => {
    try {
      setLoading(true);
      const response = await translateJaToEn(input.current.value);
      setResult(response.data);
    } catch (e) {
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  const onClickRetranslate = async () => {
    try {
      setLoading(true);
      const response = await translateEnToJa(result);
      setResult(response.data);
    } catch (e) {
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input ref={input} />
          <button onClick={onClickTranslate}>日->英</button>
          <button onClick={onClickRetranslate}>日本語に再翻訳</button>
          <p>{result}</p>
        </>
      )}
    </div>
  );
}

export default Translate;
```
