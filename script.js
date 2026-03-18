// --- Snake Game ---
document.addEventListener('DOMContentLoaded', function () {
	const canvas = document.getElementById('snakeCanvas');
	const scoreDisplay = document.getElementById('snakeScore');
	const playAgainBtn = document.getElementById('playAgainBtn');
	const fullscreenBtn = document.getElementById('fullscreenBtn');
	if (canvas && scoreDisplay && playAgainBtn && fullscreenBtn) {
				fullscreenBtn.addEventListener('click', function () {
					if (canvas.requestFullscreen) {
						canvas.requestFullscreen();
					} else if (canvas.webkitRequestFullscreen) { // Safari
						canvas.webkitRequestFullscreen();
					} else if (canvas.msRequestFullscreen) { // IE11
						canvas.msRequestFullscreen();
					}
				});
		const ctx = canvas.getContext('2d');
		const gridSize = 20;
		const tileCount = canvas.width / gridSize;
		let snake, direction, food, score, gameOver;
		function resetGame() {
			snake = [{ x: 10, y: 10 }];
			direction = { x: 0, y: 0 };
			food = { x: 5, y: 5 };
			score = 0;
			gameOver = false;
			scoreDisplay.textContent = score;
			playAgainBtn.style.display = 'none';
		}

		function draw() {
			// Background gradient
			const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
			bgGradient.addColorStop(0, '#23243a');
			bgGradient.addColorStop(1, '#2e3c5d');
			ctx.fillStyle = bgGradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw food as a fruit emoji
			const foodX = food.x * gridSize;
			const foodY = food.y * gridSize;
			ctx.font = `${gridSize - 2}px serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			// Pick a fruit emoji (random or fixed)
			const fruitEmojis = ['🍎','🍌','🍒','🍇','🍉','🍓','🍊','🍍'];
			const fruit = fruitEmojis[score % fruitEmojis.length];
			ctx.fillText(fruit, foodX + gridSize/2, foodY + gridSize/2);

			// Draw snake with gradient and border
			snake.forEach((segment, i) => {
				const segX = segment.x * gridSize;
				const segY = segment.y * gridSize;
				const snakeGrad = ctx.createLinearGradient(segX, segY, segX + gridSize, segY + gridSize);
				if (i === 0) {
					// Head: blue-green gradient
					snakeGrad.addColorStop(0, '#4a90e2');
					snakeGrad.addColorStop(1, '#50e3c2');
				} else {
					// Body: blue gradient
					snakeGrad.addColorStop(0, '#4a90e2');
					snakeGrad.addColorStop(1, '#357ab8');
				}
				ctx.fillStyle = snakeGrad;
				ctx.fillRect(segX, segY, gridSize, gridSize);
				// Border for each segment
				ctx.strokeStyle = 'rgba(255,255,255,0.18)';
				ctx.lineWidth = 2;
				ctx.strokeRect(segX + 1, segY + 1, gridSize - 2, gridSize - 2);

				// Draw face on head
				if (i === 0) {
					// Eyes
					ctx.fillStyle = '#222';
					let eyeOffsetX = direction.x === 1 ? 6 : direction.x === -1 ? -6 : 0;
					let eyeOffsetY = direction.y === 1 ? 6 : direction.y === -1 ? -6 : 0;
					// Default eyes forward
					let eye1 = { x: segX + gridSize/2 - 4 + eyeOffsetX/2, y: segY + gridSize/2 - 4 + eyeOffsetY/2 };
					let eye2 = { x: segX + gridSize/2 + 4 + eyeOffsetX/2, y: segY + gridSize/2 - 4 + eyeOffsetY/2 };
					ctx.beginPath();
					ctx.arc(eye1.x, eye1.y, 2, 0, 2 * Math.PI);
					ctx.arc(eye2.x, eye2.y, 2, 0, 2 * Math.PI);
					ctx.fill();
					// Smile
					ctx.strokeStyle = '#222';
					ctx.lineWidth = 1.2;
					ctx.beginPath();
					ctx.arc(segX + gridSize/2, segY + gridSize/2 + 3, 5, 0.15 * Math.PI, 0.85 * Math.PI);
					ctx.stroke();
				}
			});
		}

		function moveSnake() {
			if (direction.x === 0 && direction.y === 0) return; // Don't move until key pressed
			const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

			// Check collision with walls
			if (
				head.x < 0 || head.x >= tileCount ||
				head.y < 0 || head.y >= tileCount
			) {
				gameOver = true;
				return;
			}

			// Check collision with self
			for (let i = 0; i < snake.length; i++) {
				if (snake[i].x === head.x && snake[i].y === head.y) {
					gameOver = true;
					return;
				}
			}

			snake.unshift(head);

			// Check food
			if (head.x === food.x && head.y === food.y) {
				score++;
				scoreDisplay.textContent = score;
				placeFood();
			} else {
				snake.pop();
			}
		}

		function placeFood() {
			let newFood;
			while (true) {
				newFood = {
					x: Math.floor(Math.random() * tileCount),
					y: Math.floor(Math.random() * tileCount)
				};
				if (!snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) break;
			}
			food = newFood;
		}

		function gameLoop() {
			if (gameOver) {
				ctx.fillStyle = 'rgba(0,0,0,0.7)';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = '#fff';
				ctx.font = '2rem Arial';
				ctx.textAlign = 'center';
				ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
				playAgainBtn.style.display = 'inline-block';
				return;
			}
			moveSnake();
			draw();
			setTimeout(gameLoop, 180);
		}

		document.addEventListener('keydown', function (e) {
			switch (e.key) {
				case 'ArrowUp':
					if (direction.y !== 1) direction = { x: 0, y: -1 };
					break;
				case 'ArrowDown':
					if (direction.y !== -1) direction = { x: 0, y: 1 };
					break;
				case 'ArrowLeft':
					if (direction.x !== 1) direction = { x: -1, y: 0 };
					break;
				case 'ArrowRight':
					if (direction.x !== -1) direction = { x: 1, y: 0 };
					break;
			}
		});

		resetGame();
		draw();
		gameLoop();

		playAgainBtn.addEventListener('click', function () {
			resetGame();
			draw();
			gameLoop();
		});
	}

	// ...existing code for gallery, contact, theme switcher...
});
// Gallery modal popup
document.addEventListener('DOMContentLoaded', function () {
	// Gallery modal
	const gallery = document.querySelector('.gallery');
	if (gallery) {
		gallery.addEventListener('click', function (e) {
			if (e.target.tagName === 'IMG') {
				showModal(e.target.src, e.target.alt);
			}
		});
	}

	function showModal(src, alt) {
		let modal = document.createElement('div');
		modal.style.position = 'fixed';
		modal.style.top = 0;
		modal.style.left = 0;
		modal.style.width = '100vw';
		modal.style.height = '100vh';
		modal.style.background = 'rgba(0,0,0,0.7)';
		modal.style.display = 'flex';
		modal.style.alignItems = 'center';
		modal.style.justifyContent = 'center';
		modal.style.zIndex = 1000;
		modal.innerHTML = `<img src="${src}" alt="${alt}" style="max-width:90vw;max-height:80vh;border-radius:8px;box-shadow:0 2px 16px #000;">`;
		modal.addEventListener('click', () => document.body.removeChild(modal));
		document.body.appendChild(modal);
	}

	// Contact form
	const contactForm = document.getElementById('contactForm');
	const contactMsg = document.getElementById('contactMsg');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			contactMsg.textContent = 'Thank you for your message!';
			contactForm.reset();
			setTimeout(() => { contactMsg.textContent = ''; }, 3000);
		});
	}

	// Theme switcher
	const themeSwitcher = document.getElementById('themeSwitcher');
	if (themeSwitcher) {
		themeSwitcher.addEventListener('click', function () {
			document.body.classList.toggle('theme-dark');
			themeSwitcher.textContent = document.body.classList.contains('theme-dark') ? '☀️' : '🌙';
		});
	}
});
