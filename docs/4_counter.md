# 4.Counter編

- カウンターアプリを作る

## ゴール

- Stateの使い方を覚える
- クリックを検知して処理を実行できるようになる

## 完成形

![counter](/react_handson/images/4/counter.gif)

## やること

- Classを使ったコンポーネントを作る
- ボタンクリックで処理を実行させる
- Stateで値を管理する

## Classを使ったコンポーネントを作る

- HelloWorld編ではコンポーネントは全て関数で作っていた
- Counter編ではStateを扱うためにClassでコンポーネントを定義する

### Counterコンポーネントを作る

- 現在のカウンターの値とプラス/マイナスボタンを表示する
- Classでコンポーネントを作る場合は`React.Component`を継承させる

```jsx
import React from 'react';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <div>0</div>
        <button>ー</button>
        <button>＋</button>
      </div>
    );
  }
}

export default Counter;
```

- Counterコンポーネントを使うように`App.js`を修正

```jsx
import React from 'react';
import Counter from './components/Counter'; // importを追加

const App = () => <Counter />; // Counterコンポーネントを使う

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

class Counter extends React.Component {
  render() {
    return (
      // style属性を追加
      <div style={styles.counter}> 
        <div style={styles.count}>0</div>
        <button>ー</button>
        <button>＋</button>
      </div>
    );
  }
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
class Counter extends React.Component {
  // ーを押した時の処理を追加
  down = () => {
    alert('down');
  }

  // ＋を押した時の処理を追加
  up = () => {
    alert('up');
  };

  render() {
    return (
      <div style={styles.counter}> 
        <div style={styles.count}>0</div> 
        {/* onClick属性を追加 */}
        <button onClick={this.down}>ー</button>
        <button onClick={this.up}>＋</button>
      </div>
    );
  }
}
```

- onClick属性を使うことでクリック時の挙動を制御できる
- クリック時に同じクラス内のメソッドを実行するときは`this.down`のような形式で呼び出す
- このコードを実行すると、`ー`ボタンをクリックするとdownメソッドが呼ばれアラートに`down`と表示される

> ### メモ
> - ボタンをクリックして出てくるポップアップは`alert()`の実行によって表示されている
> - 今回のように開発途中で、メソッドが呼ばれていることだけ確認したいような時に使うと便利

## Stateで値を管理する

- 最後に、ボタンをクリックした時にカウンターの値を増減できるようにする
- 今はカウンターの値が埋め込みになっているので、この値を管理できるようにする

### Stateを定義する

- Reactコンポーネントのclassは`state`として値を保持することができる
- `count`というカウンターの値を表す`state`を追加する

```jsx
class Counter extends React.Component {
  // constructorを追加
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // stateの初期値をセットする
  }

  down = () => {
    alert('down');
  }

  up = () => {
    alert('up');
  };

  render() {
    return (
      <div style={styles.counter}> 
        {/* stateが保持しているcountの値を表示する */}
        <div style={styles.count}>{this.state.count}</div> 
        <button onClick={this.down}>ー</button>
        <button onClick={this.up}>＋</button>
      </div>
    );
  }
}
```

> ### メモ
> - JavaScriptでは`{ count: 0 }`のようなものをオブジェクトと呼ぶ
> - コロンの左辺がkey(名前)で右辺がvalue(値)

### Stateを更新する

- `State`は`setState`メソッドを使って値を更新する

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  down = () => {
    // countの値を更新する処理を追加
    this.setState({ count: this.state.count - 1 });
  };

  up = () => {
    // countの値を更新する処理を追加
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div style={styles.counter}>
        <div style={styles.count}>{this.state.count}</div>
        <button onClick={this.down}>ー</button>
        <button onClick={this.up}>＋</button>
      </div>
    );
  }
}
```

- **Stateを更新するとrenderメソッドが勝手に呼ばれて、画面が再描画される**
- 処理の流れとしては
    - ＋ボタンクリック -> upメソッド -> setStateメソッド -> (Stateが更新される) -> renderメソッド -> 画面再描画
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

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  down = () => {
    this.setState({ count: this.state.count - 1 });
  };

  up = () => {
    this.setState({ count: this.state.count + 1 });
  };

  power = () => {
    this.setState({ count: this.state.count ** 2 });
  };

  render() {
    return (
      <div style={styles.counter}>
        <div style={styles.count}>{this.state.count}</div>
        <button onClick={this.down}>ー</button>
        <button onClick={this.up}>＋</button>
        <button onClick={this.power}>＊＊</button>
      </div>
    );
  }
}

export default Counter;
```