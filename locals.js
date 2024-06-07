// | Check Local Storage
let localS = localStorage.getItem('theme'),
	themeToSet = localS;

// | If Local storage is not set we use the OS preference
if (!localS) {
	themeToSet = window.matchMedia('(prefers-color-scheme:dark)').matches
		? 'dark'
		: window.matchMedia('(prefers-color-scheme:light)').matches
		? 'light'
		: 'custom';
}

// | Set correct theme
document.documentElement.setAttribute('data-theme', themeToSet);
