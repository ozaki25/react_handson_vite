# 5.TodoList編

- TodoListを作る

## ゴール

- リストを表示できるようになる
- 入力内容を取得できるようになる

## 完成形

![todo5](/react_handson/images/5/todo5.gif)

## やること

- TodoListを表示する
- Todoの完了/未完了を切り替える
- Todoを追加する

## TodoListを表示する

### TodoListコンポーネントを作成

- `src/components/TodoList.js`を作成する

```jsx
import React from 'react';

class TodoList extends React.Component {
  render() {
    return (
      <div>
        <h1>TodoList</h1>
      </div>
    );
  }
}

export default TodoList;
```

- TodoListコンポーネントを表示するように`App.js`を修正

```jsx
import React from 'react';
import TodoList from './components/TodoList'; // importを追加

const App = () => <TodoList />; // TodoListコンポーネントを使用

export default App;
```

- ここまででは画面に`TodoList`と表示されるだけ

### TodoListの定義

- StateとしてTodoのリストを保持するようにする
- `todoList`というStateを定義し初期値を設定する
- `console.log`でStateに値を設定できていることを確認する

```jsx
// TodoListのデフォルト値の定義を追加
const defaultTodo = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false }
];

class TodoList extends React.Component {
  // constructorを追加
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo }; // Stateの初期値を設定
  }

  render() {
    console.log(this.state.todoList); // Stateの値を確認する処理を追加
    return (
      <div>
        <h1>TodoList</h1>
      </div>
    );
  }
}
```

- Todoは`id`、`title`、`done`の3つのフィールドを持つ
- TodoListはTodoの配列

![todo_console](/react_handson/images/5/todo_console.png)

> ### メモ
> - ブラウザ上でF12を押すと開発者ツールを出すことができる
> - Consoleタブを選択すると`console.log()`の出力を確認することができる
> - 出力のされ方はブラウザによって多少の差異がある

### TodoListを画面に表示する

- Stateで保持しているTodoListを画面に表示する
- `map`を使うことで配列に対して繰り返し処理を行っている

```jsx
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo };
  }

  render() {
    return (
      <div>
        <h1>TodoList</h1>
        {/* TodoListの各Todoに対してPタグを生成する処理を追加 */}
        {this.state.todoList.map(todo => <p key={todo.id}>{todo.title}</p>)}
      </div>
    );
  }
}
```

- `map`を使うことでTodoの数だけPタグを組み立てて画面に表示している
- 今回のようにループ処理で同じ形式のタグを複数生成する場合は`key`属性に一意な値を設定する必要がある
    - Reactの特徴である仮想DOMを用いたレンダリングの最適化を実現するために使われる
- ここまででTodoの一覧が表示されるようになった

![todo](/react_handson/images/5/todo.png)


## Todoの完了/未完了を切り替える

- 次は表示されたTodoをクリックすることでTodoの完了/未完了を切り替えられるようにする

### 完了時の見た目を修正する

- 今のままでは完了も未完了も同じ見た目になっているので、完了の場合に取り消し線がつくようにしておく
- styleを定義し、doneがtrueの場合のみ適用されるようにする

```jsx
// styleの定義を追加
const styles = {
  done: {
    color: '#bbb',
    textDecoration: 'line-through'
  }
};

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo };
  }

  render() {
    return (
      <div>
        <h1>TodoList</h1>
        {this.state.todoList.map(todo => (
          // style属性を追加
          // doneがtrueならstyleを適用、falseなら何も適用しない
          <p key={todo.id} style={todo.done ? styles.done : null}>
            {todo.title}
          </p>
        ))}
      </div>
    );
  }
}
```

> ### メモ
> - styleの適用部分で三項演算子を使っている
> - `(条件式) ? (trueの時の処理) : (falseの時の処理);`

- doneがtrueのTodoに取り消し線が表示される

![todo2](/react_handson/images/5/todo2.png)

### クリックされたことを検知する

- TodoのPタグに`onClick`属性を追加する
- どのTodoがクリックされたか判別できるように`id`属性も追加しておく
- `toggleComplete`メソッドを追加しクリックした際に呼び出されるようにする

```jsx
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo };
  }

  // toggleCompleteメソッドを追加
  toggleComplete = e => {
    alert(e.target.id); // e.target.idでクリックされた要素のid属性を取得できる
  };

  render() {
    return (
      <div>
        <h1>TodoList</h1>
        {this.state.todoList.map(todo => (
          // id属性とonClick属性を追加
          <p
            key={todo.id}
            style={todo.done ? styles.done : null}
            id={todo.id}
            onClick={this.toggleComplete}
          >
            {todo.title}
          </p>
        ))}
      </div>
    );
  }
}
```

- Todoの文字列をクリックすると、そのTodoのidがalertで表示される

### クリックされたTodoのdoneを切り替える

- クリックしたTodoのdoneの値を更新する

```jsx
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo };
  }

  toggleComplete = e => {
    // 属性の値は全て文字列で返却されるので数値型に変換する
    const id = Number(e.target.id);

    // Stateに保持しているtodoListに対してループ処理
    const todoList = this.state.todoList.map(todo => {
      // クリックされたtodoとidが一致したらdoneのtrue/falseを反転させる
      if (todo.id === id) todo.done = !todo.done;
      return todo;
    });

    // doneを更新したtodoを含むtodoListでStateを更新する
    // this.setState({ todoList: todoList }) の省略形
    this.setState({ todoList });
  };

  render() {
    return (
      <div>
        <h1>TodoList</h1>
        {this.state.todoList.map(todo => (
          <p
            key={todo.id}
            style={todo.done ? styles.done : null}
            id={todo.id}
            onClick={this.toggleComplete}
          >
            {todo.title}
          </p>
        ))}
      </div>
    );
  }
}
```

> ### メモ
> - JavaScriptでは等価演算子は`===`を使うようにする
> - 否定の場合は`!==`

- ここまでできるとTodoの完了/未完了をクリックすることで切り換えられるようになる

![todo3](/react_handson/images/5/todo3.gif)

## Todoを追加する

- ここまででTodoの完了/未完了を管理できるようになった
- 次は新しくTodoを追加できるようにする

### 入力フォームの作成

- Todoの内容を入力するフォームと追加ボタンを配置する

```jsx
  render() {
    return (
      <div>
        <h1>TodoList</h1>
        {/* 入力域とボタンを追加 */}
        <p>
          <input />
          <button>追加</button>
        </p>
        {this.state.todoList.map(todo => (
          <p
            key={todo.id}
            style={todo.done ? styles.done : null}
            id={todo.id}
            onClick={this.toggleComplete}
          >
            {todo.title}
          </p>
        ))}
      </div>
    );
  }
```

![todo4](/react_handson/images/5/todo4.png)

### 入力内容を取得する

```jsx
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoList: defaultTodo };
    // 入力域を参照する`input`というプロパティを追加
    this.input = React.createRef();
  }

  // ...

  // addTodoメソッドを追加
  addTodo = () => {
    alert(this.input.current.value); // 入力内容はthis.input.current.valueで取得できる
  };

  render() {
    return (
      <div>
        <h1>TodoList</h1>
        <p>
          {/* 入力域を参照できるようにref属性を追加 */}
          <input ref={this.input} />
          {/* onClick属性を追加 */}
          <button onClick={this.addTodo}>追加</button>
        </p>
        {this.state.todoList.map(todo => (
          <p
            key={todo.id}
            style={todo.done ? styles.done : null}
            id={todo.id}
            onClick={this.toggleComplete}
          >
            {todo.title}
          </p>
        ))}
      </div>
    );
  }
}
```

- 追加ボタンをクリックすると、フォームに入力されている内容がアラートで表示される
- `this.input`にinputタグを紐づけたことによって入力された値を取得することができた

### 入力内容をTodoListに追加

```jsx
class TodoList extends React.Component {
  // ...

  addTodo = () => {
    // 新しいtodoを組み立てる
    const todo = {
      id: this.state.todoList.length + 1,
      title: this.input.current.value, // 入力内容をtitleにセット
      done: false
    };

    // [...this.state.todoList, todo]とすることで現在のtodoListの配列の最後尾に新しいtodoを追加できる
    this.setState({ todoList: [...this.state.todoList, todo] });

    this.input.current.value = ''; // 入力域を空にする
  };

  // ...
}
```

- これで入力された内容がTodoListの末尾に追加されるようになった
- 入力した内容が残り続けないように、空文字をセットすることでフォームをリセットしている

![todo5](/react_handson/images/5/todo5.gif)

### まとめ

- mapをうまく活用することで配列を繰り返し処理で画面に表示することができる
- refを使って入力域とフィールドを紐付けることで入力内容を取得することができる
