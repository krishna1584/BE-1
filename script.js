document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.text();
                    showMessage(result, 'success');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    const error = await response.text();
                    showMessage(error, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('An error occurred. Please try again.', 'error');
            }
        });
    }
});

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
    `;

    if (type === 'success') {
        messageElement.style.backgroundColor = '#4cc9f0';
    } else {
        messageElement.style.backgroundColor = '#ef233c';
    }

    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

