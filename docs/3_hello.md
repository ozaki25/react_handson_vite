# 3.HelloWorld編

- HelloWorldを表示する

## ゴール

- Reactのコンポーネントの使い方を理解する

## 完成形

![hello2](/react_handson/images/3/hello2.png)

## やること

- コンポーネントを作る
- コンポーネントを使う
- コンポーネントに引数を渡す

## コンポーネントを作る

- Reactは複数のコンポーネントを作成しそれらを組み合わせていくことで開発を行う

### Helloコンポーネントを作る

- `src/components`ディレクトリに`Hello.js`を作成する
    - `Hello World`を2つ表示するだけのコンポーネント

```jsx
import React from 'react';

const Hello = () => (
  <div>
    <h1>Hello World</h1>
    <p>Hello World</p>
  </div>
);

export default Hello;
```

## コンポーネントを使う

### Helloコンポーネントを使う

- 作成したHelloコンポーネントを呼び出して画面に表示されるようにする
- `import`したコンポーネントはhtmlタグのようにして使うことができる
- `App.js`を修正する

```jsx
import React from 'react';
import Hello from './components/Hello'; // Helloコンポーネントをimportする

const App = () => <Hello />; // importしたHelloコンポーネントを返すように変更する

export default App;
```

- ブラウザに`Hello World`が2つ表示されればOK

![hello](/react_handson/images/3/hello.png)

## コンポーネントに引数を渡す

- これまでのコンポーネントは毎回決まった値だけを返していた
- 次は、引数を渡してそれをコンポーネントに埋め込んでみる

### Greetコンポーネントを作る

- `src/components`ディレクトリに`Greet.js`を作成する

```jsx
import React from 'react';

const Greet = ({ name }) => (
  // {}で囲うと変数を埋め込むことができる
  <p>Hello {name}さん！</p>
);

export default Greet;
```

### Greetコンポーネントを使う

- `App.js`を修正してGreetコンポーネントを呼び出す

```jsx
import React from 'react';
import Hello from './components/Hello';
import Greet from './components/Greet'; // importを追加

const App = () => (
  <div>
    <Hello />
    {/* 引数は属性として渡す */}
    <Greet name="Ozaki" />
  </div>
);

export default App;
```

### 引数の受け渡し

- 引数は属性に値を設定することで渡すことができる
    - `<Greet name="Ozaki" />`
- 属性で渡された値は関数の宣言時に受け取ることができる
    - `const Greet = ({ name }) => (`
- 引数を渡す時の属性名と、受け取る時の変数名は同一でないといけないので注意
    - `{}`内の値は、渡した順序ではなく名前で紐づけされている
- 以下のような画面が表示されていれば完成

![hello2](/react_handson/images/3/hello2.png)

## 課題

- 引数を`name`から`firstName`と`lastName`の２つに変更し、以下の画面を再現してみよう

![hello3](/react_handson/images/3/hello3.png)

## まとめ

- コンポーネントはhtmlタグを返す関数として作る
- importしたコンポーネントはhtmlタグと同じように扱うことができる
- 属性に値を設定することで引数を渡すことができる

## 課題の回答例

- App.js

```jsx
import React from 'react';
import Hello from './components/Hello';
import Greet from './components/Greet';

const App = () => (
  <div>
    <Hello />
    <Greet firstName="Haruki" lastName="Nishikawa" />
    <Greet firstName="Takuya" lastName="Nakashima" />
    <Greet firstName="Taishi" lastName="Ohta" />
  </div>
);

export default App;
```

- Greet.js

```jsx
import React from 'react';

const Greet = ({ firstName, lastName }) => (
  <p>
    Hello {firstName} {lastName}さん！
  </p>
);

export default Greet;
```