document.querySelector("#post-button").addEventListener("click", function (event) {
    event.preventDefault();  

    const factInput = document.querySelector("#fact-input");
    const sourceInput = document.querySelector("#source-input");
    const categorySelect = document.querySelector("#category-select");
    const factsList = document.querySelector("#facts-list");

    const factText = factInput.value.trim();
    const sourceText = sourceInput.value.trim();
    const categoryText = categorySelect.value;

   
    if (!factText || !sourceText) {
        alert("Please enter a fact and a trustworthy source before posting!");
        return;
    }

   
    const newFact = document.createElement("li");
    newFact.classList.add("fact");


    newFact.innerHTML = `
        <p>${factText} <a class="source" href="${sourceText}" target="_blank">(Source)</a></p>
        <span class="tag" style="background-color: ${categoryText === 'technology' ? '#3b82f6' : categoryText === 'science' ? '#16a34a' : '#eab308'};">${categoryText}</span>
        <div class="vote-buttons">
            <button>👍 0</button>
            <button>🤯 0</button>
            <button>❌ 0</button>
        </div>
    `;

  
    factsList.appendChild(newFact);

    factInput.value = "";
    sourceInput.value = "";
    categorySelect.value = "";
});
