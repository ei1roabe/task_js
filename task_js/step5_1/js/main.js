$(function(){
	$('.btn-gather').on('click', function(e){
		var $target = $(e.currentTarget);
		var story_id = $target.attr('story-id');
		var key = $target.attr('key');

		if (!$target.hasClass('select')) {
			$(this).siblings().removeClass('select');
			$target.addClass('select');

			if ($target !== $(this)) {
				$('.disp-area').empty();
				renderDisp(story_id, key);
			} else {
				renderDisp(story_id, key);
			}
		} else {
			$target.removeClass('select');
			$('.disp-area').empty();
		}
	});
});

function renderDisp(story_id, key) {
	var story_list = [
		// 第3部
		{'category': [3, 4, 5], 'name': '空条 承太郎', 'stand': 'スタープラチナ'},
		{'category': [3], 'name': 'モハメド・アヴドゥル', 'stand': 'マジシャンズ・レッド'},
		{'category': [3, 4], 'name': 'ジョセフ・ジョースター', 'stand': 'ハーミットパープル'},
		{'category': [3], 'name': '花京院典明', 'stand': 'ハイエロファント・グリーン'},
		{'category': [3], 'name': 'グレー・フライ', 'stand': 'タワー・オブ・グレー'},
		{'category': [3], 'name': 'ジャン・ピエール', 'stand': 'ポルナレフ：シルバー・チャリオッツ'},
		{'category': [3], 'name': 'キャプテン・テニール', 'stand': 'ダークブルームーン'},
		{'category': [3], 'name': 'オランウータン', 'stand': 'ストレングス'},
		{'category': [3], 'name': '呪いのデーボ', 'stand': 'エボニーデビル'},
		{'category': [3], 'name': 'ラバーソール', 'stand': 'イエローテンパランス'},
		{'category': [3], 'name': 'Ｊ・ガイル', 'stand': 'ハングドマ'},
		{'category': [3], 'name': 'ホル・ホース', 'stand': 'エンペラー'},
		{'category': [3], 'name': 'ネーナ', 'stand': 'エンプレス'},
		{'category': [3], 'name': 'ズィー・ズィー', 'stand': 'ホイール・オブ・フォーチュ'},
		{'category': [3], 'name': 'エンヤ婆', 'stand': 'ジャスティス'},
		{'category': [3], 'name': 'スティーリー・ダン', 'stand': 'ラバーズ'},
		{'category': [3], 'name': 'マニッシュ・ボーイ', 'stand': 'デス・サーティーン'},
		{'category': [3], 'name': 'カメオ', 'stand': 'ジャッジメント'},
		{'category': [3], 'name': 'ミドラー', 'stand': 'ハイプリエステス'},
		{'category': [3], 'name': 'イギー', 'stand': 'ザ・フール'},
		{'category': [3], 'name': 'ンドゥール', 'stand': 'ゲブ神'},
		{'category': [3], 'name': 'ボインゴ（弟）', 'stand': 'トト神'},
		{'category': [3], 'name': 'オインゴ（兄）', 'stand': 'クヌム神'},
		{'category': [3], 'name': 'マライア', 'stand': 'バステト女神'},
		{'category': [3], 'name': 'アレッシー', 'stand': 'セト神'},
		{'category': [3], 'name': 'ダニエル・Ｊ・ダービー', 'stand': 'オシリス神'},
		{'category': [3], 'name': 'ペット・ショップ', 'stand': 'ホルス神'},
		{'category': [3], 'name': 'テレンス・Ｔ・ダービー', 'stand': 'アトゥム神'},
		{'category': [3], 'name': 'ケニー・Ｇ', 'stand': 'ティナー・サックス'},
		{'category': [3], 'name': 'ヴァニラ・アイス', 'stand': 'クリーム'},
		{'category': [3, 4, 5], 'name': 'ディオ・ブランドー', 'stand': 'ザ・ワールド'},

		// 第4部
		{'category': [,4,], 'name': '東方 仗助', 'stand': 'クレイジー・ダイヤモンド'},
		{'category': [,4,], 'name': '片桐 安十郎', 'stand': 'アクア・ネックレス'},
		{'category': [,4,], 'name': '虹村 億泰', 'stand': 'ザ・ハンド'},
		{'category': [,4,], 'name': '虹村 形兆', 'stand': 'バッド・カンパニー'},
		{'category': [,4,], 'name': '広瀬 康一', 'stand': 'エコーズ、エコーズ・ＡＣＴ２、エコーズ・ＡＣＴ２'},
		{'category': [,4,], 'name': '音石 明', 'stand': 'レッド・ホット・チリ・ペッパー'},
		{'category': [,4,], 'name': '小林 玉美', 'stand': 'ザ・ロック'},
		{'category': [,4,], 'name': '間田 敏和', 'stand': 'サーフィス'},
		{'category': [,4,], 'name': '山岸 由花子', 'stand': 'ラブ・デラックス'},
		{'category': [,4,], 'name': 'トニオ・トラサルディー', 'stand': 'パール・ジャム'},
		{'category': [,4,], 'name': '静・ジョースター', 'stand': 'アクトン・ベイビー'},
		{'category': [,4,], 'name': '岸辺 露伴', 'stand': 'ヘブンズ・ドアー'},
		{'category': [,4,], 'name': '矢安宮 重清', 'stand': 'ハーヴェスト'},
		{'category': [,4,], 'name': '吉良 吉影', 'stand': 'キラークイーン、シアーハートアタック、バイツァ・ダスト'},
		{'category': [,4,], 'name': '辻 彩', 'stand': 'シンデレラ'},
		{'category': [,4,], 'name': '吉良 吉廣', 'stand': 'アトム・ハート・ファーザー'},
		{'category': [,4,], 'name': '大柳 賢', 'stand': 'ボーイ・Ⅱ・マン'},
		{'category': [,4,], 'name': '支倉 未起隆', 'stand': 'アース・ウインド・アンド・ファイヤー'},
		{'category': [,4,], 'name': '噴上 裕也', 'stand': 'ハイウェイ・スター'},
		{'category': [,4,], 'name': '猫草', 'stand': 'ストレイ・キャット'},
		{'category': [,4,], 'name': '鋼田一 豊大', 'stand': 'スーパーフライ'},
		{'category': [,4,], 'name': '宮本 輝之輔', 'stand': 'エニグマ'},
		{'category': [,4,], 'name': '乙（きのと） 雅三', 'stand': 'チープ・トリック'},

		// 第5部
		{'category': [,,5], 'name': 'ジョルノ・ジョバァーナ', 'stand': 'ゴールド・エクスペリエンス、ゴールド・エクスペリエンス・レクイエム'},
		{'category': [,,5], 'name': 'ブローノ・ブチャラティ', 'stand': 'スティッキィ・フィンガーズ'},
		{'category': [,,5], 'name': 'ポルポ', 'stand': 'ブラック・サバス'},
		{'category': [,,5], 'name': 'マリオ・ズッケェロ', 'stand': 'ソフト・マシーン'},
		{'category': [,,5], 'name': 'レオーネ・アバッキオ', 'stand': 'ムーディー・ブルース'},
		{'category': [,,5], 'name': 'グイード・ミスタ', 'stand': 'セックス・ピストルズ'},
		{'category': [,,5], 'name': 'サーレー', 'stand': 'クラフト・ワーク'},
		{'category': [,,5], 'name': 'ホルマジオ', 'stand': 'リトル・フィート'},
		{'category': [,,5], 'name': 'ナランチャ・ギルガ', 'stand': 'エアロスミス'},
		{'category': [,,5], 'name': 'イルーゾォ', 'stand': 'マン・イン・ザ・ミラー'},
		{'category': [,,5], 'name': 'パンナコッタ・フーゴ', 'stand': 'パープル・ヘイズ'},
		{'category': [,,5], 'name': '亀（ココ・ジャンボ）', 'stand': 'ミスター・プレジデント'},
		{'category': [,,5], 'name': 'ペッシ', 'stand': 'ビーチ・ボーイ'},
		{'category': [,,5], 'name': 'プロシュート', 'stand': 'ザ・グレイトフル・デッド'},
		{'category': [,,5], 'name': 'メローネ', 'stand': 'ベイビィ・フェイス'},
		{'category': [,,5], 'name': 'ギアッチョ', 'stand': 'ホワイト・アルバム'},
		{'category': [,,5], 'name': 'ディアボロ', 'stand': 'キング・クリムゾン'},
		{'category': [,,5], 'name': 'スクアーロ', 'stand': 'クラッシュ'},
		{'category': [,,5], 'name': 'ティッツァーノ', 'stand': 'トーキング・ヘッド'},
		{'category': [,,5], 'name': 'カルネ', 'stand': 'ノトーリアス・B・I・G'},
		{'category': [,,5], 'name': 'トリッシュ・ウナ', 'stand': 'スパイス・ガール'},
		{'category': [,,5], 'name': 'リゾット・ネエロ', 'stand': 'メタリカ'},
		{'category': [,,5], 'name': 'チョコラータ', 'stand': 'グリーン・ディ'},
		{'category': [,,5], 'name': 'セッコ', 'stand': 'オアシス'},
		{'category': [,,5], 'name': 'ポルナレフ', 'stand': 'チャリオッツ・レクイエム'},
		{'category': [,,5], 'name': 'ジョルノ・ジョバァーナ', 'stand': 'ゴールド・エクスペリエンス・レクイエム'},
		{'category': [,,5], 'name': 'スコリッピ', 'stand': 'ローリング・ストーン（ズ）'}
	];

	story_list.forEach(function(v, k){
		if (+v.category[key] === +story_id) {
			$('.disp-area').append(
				'<div class="list-name">名前：'+ v.name +'</div>'+
				'<div class="list-stand">スタンド：'+ v.stand  +'</div>'
			);
		}
	});
}
