# 1.開発環境構築

## 雛形の生成

- `create-react-app`という公式のジェネレータを使う

```bash
// create-react-appのインストール
npm i -g create-react-app

// 雛形の生成
create-react-app react-handson

// 生成したプロジェクトへ移動
cd react-handson
```

## 動作確認

- 以下のコマンドを入力しアプリ起動
    - `npm start`
- ブラウザが勝手に開いて以下の画面が表示されればOK
    - `http://localhost:3000/`で稼働する

![template](/images/1/template.png)

- ホットリロードの確認
    - `src/App.js`を開き`Welcome to React`の文言を適当に書き換えて保存する
    - 自動でリロードが走りコンソールにログが流れる
    - ブラウザが勝手にリリードされ変更が反映される

![hotreload](/images/1/hotreload.gif)
