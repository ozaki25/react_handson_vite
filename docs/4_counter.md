# 4.Counter編

- カウンターアプリを作る

## ゴール

- `useState`を使った状態管理を覚える
- クリックを検知して処理を実行できるようになる

## 完成形

![counter](/images/4/counter.gif)

## やること

- カウンターのレイアウトを作る
- ボタンクリックで処理を実行させる
- `useState`で値を管理する

## カウンターのレイアウトを作る

### Counterコンポーネントを作る

- 現在のカウンターの値とプラス/マイナスボタンを表示する
- `src/components/Counter.js`を作成する

```jsx
import React from 'react';

function Counter() {
  return (
    <div>
      <div>0</div>
      <button>ー</button>
      <button>＋</button>
    </div>
  )
}

export default Counter;
```

- Counterコンポーネントを表示するように`App.js`を修正

```jsx
import React from 'react';
import Counter from './components/Counter'; // importを追加

function App() {
  return <Counter />; // Counterコンポーネントを使う
}

export default App;
```

### Styleの追加

- このままでは見た目が悪いのでCounter.jsにstyleの定義を加える

```jsx
import React from 'react';

// styleの定義を追加
const styles = {
  counter: {
    textAlign: 'center'
  },
  count: {
    fontSize: '64px'
  }
};

function Counter() {
  return (
    // style属性を追加
    <div style={styles.counter}> 
      <div style={styles.count}>0</div>
      <button>ー</button>
      <button>＋</button>
    </div>
  );
}

export default Counter;
```

> ### メモ
> - ReactでCSSを書く方法はいろいろあるが、今回は最も簡易な方法を採用している
> - JavaScriptのコードにCSSを埋め込んでいるため、ケバブケース(text-align)ではなくキャメルケース(textAlign)で記載することに注意

- 画像のように中央寄せになっていればOK

![counter](/images/4/counter.png)

## ボタンクリックで処理を実行させる

- 見た目はできたので機能を追加していく
- プラス/マイナスボタンを押した時に処理を実行できるようにする

```jsx
// 省略

function Counter() {
  // ーを押した時の処理を追加
  const down = function() {
    alert('down');
  };

  // ＋を押した時の処理を追加
  const up = function() {
    alert('up');
  };

  return (
    <div style={styles.counter}>
      <div style={styles.count}>0</div>
      {/* onClick属性を追加 */}
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}
```

- onClick属性を使うことでクリック時の挙動を制御できる
- このコードを実行すると`ー`ボタンをクリックするとdownメソッドが呼ばれアラートに`down`と表示される(＋も同様)

> ### メモ
> - ボタンをクリックして出てくるポップアップは`alert()`の実行によって表示されている
> - 今回のように開発途中で、メソッドが呼ばれていることだけ確認したいような時に使うと便利

## `useState`で値を管理する

- 最後に、ボタンをクリックした時にカウンターの値を増減できるようにする
- 今はカウンターの値が埋め込みになっているので、この値をコンポーネントで管理するように変更する

### `useState`でcountを定義する

- Reactコンポーネントは`useState`を使うことで値を管理できるようになる

> ### メモ
>
> - 値を管理するとは？
>    - ユーザ操作等で変化し得る状態を保持することができる
>    - 管理する値が更新されると自動的に画面が再描画される
> - コンポーネントが管理する値のことをStateと呼ぶ

- `count`というカウンターの値を表すStateを持つようにする

```jsx
// 省略

function Counter() {
  // countというStateを定義する
  const [count, setCount] = React.useState(0)

  const down = function() {
    alert('down');
  };

  const up = function() {
    alert('up');
  };

  return (
    <div style={styles.counter}>
      {/* 変数countを使うように変更 */}
      <div style={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}
```

- 状態(State)の定義
    - `const [count, setCount] = React.useState(0)`でStateを定義している
    - `count`は現在の値
    - `setCount`は`count`を変更するための関数
    - `useState`の引数である`0`は`count`の初期値

> ### メモ
>
> - 今回は管理する値がcountだったので`count`、`setCount`という変数名をつけた
> - 変数名は用途に応じて任意の名前をつけることができる

### Stateを更新する

- `count`は`setCount`を使って更新する

```jsx
// 省略

function Counter() {
  const [count, setCount] = React.useState(0)

  const down = function() {
    // countの値を更新する処理を追加
    setCount(count - 1);
  };

  const up = function() {
    // countの値を更新する処理を追加
    setCount(count + 1);
  };

  return (
    <div style={styles.counter}>
      <div style={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}
```

- `setCount`を使って`count`の値を変更すると、フレームワークの機能により自動的に再描画され画面が更新される


- ここまでで完成形と同じものが完成

![counter](/images/4/counter.gif)

## 課題

- ボタンを押すと、現在の値を2乗した値に更新されるボタンを作ってみよう

![counter2](/images/4/counter2.gif)

## まとめ

- `useState`を使うことでコンポーネントでStateを管理することができる
- `useState`によって生成した`setXxx`メソッドを使うことでStateを更新することができる
- Stateが更新されると自動的に再描画され画面が更新される

## 課題の回答例

- Counter.js

```jsx
import React from 'react';

const styles = {
  counter: {
    textAlign: 'center'
  },
  count: {
    fontSize: '64px'
  }
};

function Counter() {
  const [count, setCount] = React.useState(0);

  const down = function() {
    setCount(count - 1);
  };

  const up = function() {
    setCount(count + 1);
  };

  const power = function() {
    setCount(count ** 2 );
  };

  return (
    <div style={styles.counter}>
      <div style={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
      <button onClick={power}>＊＊</button>
    </div>
  );
}

export default Counter;
```