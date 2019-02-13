# 4.Counter編

- カウンターアプリを作る

## ゴール

- `useState`を使った状態管理を覚える
- クリックを検知して処理を実行できるようになる

## 完成形

![counter](/react_handson/images/4/counter.gif)

## やること

- 見た目だけ作る
- ボタンクリックで処理を実行させる
- `useState`で値を管理する

## 見た目だけ作る

### Counterコンポーネントを作る

- 現在のカウンターの値とプラス/マイナスボタンを表示する

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
> - JavaScriptのコードに埋め込んでいるため、ケバブケース(text-align)ではなくキャメルケース(textAlign)で記載することに注意

- 画像のように中央寄せになっていればOK

![counter](/react_handson/images/4/counter.png)

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
- このコードを実行すると、`ー`ボタンをクリックするとdownメソッドが呼ばれアラートに`down`と表示される

> ### メモ
> - ボタンをクリックして出てくるポップアップは`alert()`の実行によって表示されている
> - 今回のように開発途中で、メソッドが呼ばれていることだけ確認したいような時に使うと便利

## `useState`で値を管理する

- 最後に、ボタンをクリックした時にカウンターの値を増減できるようにする
- 今はカウンターの値が埋め込みになっているので、この値を管理できるようにする

### `useState`でcountを定義する

- Reactコンポーネントは`useState`を使うことで値を管理できるようになる
- `count`というカウンターの値を表す変数を持つようにする

```jsx
// 省略

function Counter() {
  // useStateの引数としてデフォルト値をセットすることができる
  const [count, setCount] = React.useState(0)

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
      {/* 変数countを使うように変更 */}
      <div style={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}
```

> ### メモ
>  - React.useStateの戻り値は配列で受け取る
>    - `const [count, setCount]`
>  - 第一要素は値が格納されるstate
>  - 第二要素の`setCount`を使うことで`count`の値を更新することができる
>  - `setCount`によってstateを更新すると自動で再レンダリングされて表示内容が更新される

### stateを更新する

- `count`は`setCount`を使って更新する

```jsx
// 省略

function Counter() {
  const [count, setCount] = React.useState(0)

  // ーを押した時の処理を追加
  const down = function() {
    // countの値を更新する処理を追加
    setCount(count - 1);
  };

  // ＋を押した時の処理を追加
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

- **stateを更新するとrenderメソッドが勝手に呼ばれて、画面が再描画される**
- 処理の流れとしては
    - ＋ボタンクリック -> upメソッド -> setCountメソッド -> (stateが更新される) -> renderメソッド -> 画面再描画
- ここまでで完成形と同じものが完成

![counter](/react_handson/images/4/counter.gif)

## 課題

- ボタンを押すと、現在の値を2乗した値に更新されるボタンを作ってみよう

![counter2](/react_handson/images/4/counter2.gif)

## まとめ

- コンポーネントをclassで定義するとStateを持つことができる
- Stateは必ずsetStateを使って更新する
- Stateが更新されるとrenderメソッドが呼ばれて画面が再描画される

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