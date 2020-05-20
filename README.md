# JavaScript 課題

# 課題6 シューティングゲーム
* Javascriptのフレームワークを使用する<br>
* Html5とcanvasを使用する<br>
* sassを使用する<br>
* 仮想環境を構築して使用する<br>
* ブラウザで遊べる<br>

## 環境
* Docker<br>
* Nginx<br>
* jQuery<br>
* gulp<br>

### 仕様
1. 自機のHP10<br>
2. 敵機のHP5<br>
3. 敵機を20機倒したらクリア<br>
4. 縦スクロール<br>
5. 画面サイズ（640 * 640）<br>
6. webブラウザ<br>
7. 自機も敵機も動ける範囲はcanvas内<br>
8. 弾は一種類<br>
9. ダメージを受けたら一瞬半透明<br>
10. 自機のHPが0になったらゲームオーバー<br>
11. 敵機のHPが0になったら消える<br>
12. 敵の攻撃が当たったらHPだけ減る<br>
13. 発射時の効果音付ける<br>
14. BGM付ける（画面右上のアイコンでon/offの切り替え）<br>

### 設計
ロケット（オブジェクト）ができること<br>
┗ 上下左右に動ける（↑、↓、←、→）<br>
┗ 弾発射（shoot）<br>
敵<br>
┗ ランダムで出現<br>
ステータス<br>
┗ 敵にあたったらHP-1（MAX10）<br>
┗ 敵機を20機倒したらクリア