function copyCommand() {
	const command = document.getElementById('install-command').textContent;
	navigator.clipboard.writeText(command).then(() => {
		const button = document.querySelector('.copy-button');
		button.textContent = 'Copied!';
		setTimeout(() => {
			button.textContent = 'Copy Command';
		}, 2000);
	});
}

document.getElementById('os-select').addEventListener('change', function () {
	// to be fixed
	console.log('Selected OS:', this.value);
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
	if (theme === 'dark') {
		body.classList.add('dark-mode');
	} else {
		body.classList.remove('dark-mode');
	}
	localStorage.setItem('theme', theme);
}

function getTheme() {
	return localStorage.getItem('theme') || 'system';
}

function applySystemTheme() {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		setTheme('dark');
	} else {
		setTheme('light');
	}
}

const currentTheme = getTheme();
if (currentTheme === 'system') {
	applySystemTheme();
} else {
	setTheme(currentTheme);
}

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (e) => {
		if (getTheme() === 'system') {
			setTheme(e.matches ? 'dark' : 'light');
		}
	});

themeToggle.addEventListener('click', () => {
	const currentTheme = getTheme();
	if (currentTheme === 'light') {
		setTheme('dark');
	} else if (currentTheme === 'dark') {
		setTheme('system');
		applySystemTheme();
	} else {
		setTheme('light');
	}
	updateToggleButtonText();
});

function updateToggleButtonText() {
	const currentTheme = getTheme();
	themeToggle.textContent = `Theme: ${
		currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)
	}`;
}

updateToggleButtonText();
