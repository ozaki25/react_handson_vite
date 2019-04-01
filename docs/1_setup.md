# 1.開発環境構築

## コマンドの実行

- EclipseCheを使って開発する場合、コマンドは画面下部の`Terminal`で実行する

![terminal](/react_handson/images/1/terminal.png)

## 前提

- `node`コマンドが使えること
    - バージョンは8以上が望ましい
    - それ以下は動作未確認

```bash
node -v
# v11.6.0
```

## 雛形の生成

- `create-react-app`という公式のジェネレータを使う

```bash
// 雛形の生成
npx create-react-app react-handson

// 生成したプロジェクトへ移動
cd react-handson
```

## 動作確認

- 以下のコマンドを入力しアプリ起動
    - `npm start`
- ブラウザが勝手に開いて以下の画面が表示されればOK
    - `http://localhost:3000/`で稼働する
    - ※EclipseCheを使っている場合は以下の手順でURLを確認してアクセスする

![url1](/react_handson/images/1/url1.png)
![url2](/react_handson/images/1/url2.png)


![template](/react_handson/images/1/template.png)

- ホットリロードの確認
    - `src/App.js`を開き`Welcome to React`の文言を適当に書き換えて保存する
    - 自動でリロードが走りコンソールにログが流れる
    - ブラウザが勝手にリリードされ変更が反映される

![hotreload](/react_handson/images/1/hotreload.gif)
