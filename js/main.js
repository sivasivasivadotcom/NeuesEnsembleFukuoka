'use strict';

{
	// 全ての演奏会のpopupを同じ関数で処理する
	// .for_popupをつけた要素を配列に格納
	const html = document.querySelector('html');
	const forPopup = document.querySelectorAll('.for_popup');
	const blackback = document.getElementById('blackback');
	const popupClose = document.querySelectorAll('.popup_closeArea');
	const mainWrap = document.getElementById('main_wrap');

	let scrollpos;

	forPopup.forEach(item => {
		let popupId = item.dataset.num;
		let popupItem = document.getElementById(popupId);

		function popup() {
			scrollpos = window.pageYOffset;// 現在のスクロール位置を取得
			html.style.scrollBehavior = 'auto';
			mainWrap.style.top = scrollpos * -1 + 'px';
			blackback.classList.remove('hidden');
			popupItem.classList.remove('hidden');
			popupItem.classList.remove('opacityNone');
			mainWrap.classList.add('no_touch');
		}
		
		function outDelay() {
			blackback.classList.add('hidden');
			popupItem.classList.add('opacityNone');
			mainWrap.classList.remove('no_touch');
			window.scrollTo(0, scrollpos);
			html.style.scrollBehavior = 'smooth';
		}
		
		function popout() {
			setTimeout(outDelay, 1000);
			popupItem.classList.add('hidden');
		}

		item.addEventListener('click', popup);
		blackback.addEventListener('click', popout);
		popupClose.forEach(item => {
			item.addEventListener('click', popout);
		});
	});


	// #mailをクリックしたらクリップボードにアドレスをコピーする
	const copyMail = document.getElementById('mail');
	const eMail = document.getElementById('e_mail').textContent;

	function copy() {
		navigator.clipboard.writeText(eMail);
		alert(`メールアドレスをコピーしました。(${eMail})`);
	}

	copyMail.addEventListener('click', copy);


	// .fixed_navAreaの表示領域を設定する
	const top = document.getElementById('top');
	const fixedNav = document.getElementById('fixedNav');

	function callback(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				fixedNav.classList.remove('fixed_navArea');
				return;
			}
			fixedNav.classList.add('fixed_navArea');
		});
	}

	const observer = new IntersectionObserver(callback);

	observer.observe(top);


	// SPmenuのviolinをclickしたら、violinがさらに表示される。menuはcloseになる
	const spMenu = document.getElementById('sp_menu');
	const spClose = document.getElementById('sp_close');

	function appear() {
		spMenu.classList.toggle('appeared');
		spClose.classList.toggle('appeared');
		fixedNav.classList.toggle('more');
	}

	spMenu.addEventListener('click', appear);
	spClose.addEventListener('click', appear);

	// SPmenuのliをクリックしたらfixedNav内は初期値になる
	const navLists = document.querySelectorAll('.fixed_navLi');

	navLists.forEach(item => {
		function initial() {
			spMenu.classList.add('appeared');
			spClose.classList.remove('appeared');
			fixedNav.classList.remove('more');
		}
		item.addEventListener('click', initial);
	});
}

// 