const questionInput = document.getElementById('question');
const answerContainer = document.getElementById('answer');

function askQuestion() {
    const question = questionInput.value;

    // Replace 'YOUR_API_KEY' with your actual GPT-3 API key
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Updated model name

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: question,
            max_tokens: 5000  // Adjust as needed
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const answer = data.choices[0].text;
        answerContainer.textContent = answer;
    })
    .catch(error => console.error(error));
}
