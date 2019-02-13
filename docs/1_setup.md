# 1.開発環境構築

## 前提

- `node`がコマンドが使えること
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

![template](/react_handson/images/1/template.png)

- ホットリロードの確認
    - `src/App.js`を開き`Welcome to React`の文言を適当に書き換えて保存する
    - 自動でリロードが走りコンソールにログが流れる
    - ブラウザが勝手にリリードされ変更が反映される

![hotreload](/react_handson/images/1/hotreload.gif)
