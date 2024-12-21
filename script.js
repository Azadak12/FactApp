import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD1FVbihz05b7JOHmdNQ-Hqs7Nopke0z9U",
  authDomain: "myfacta-2403c.firebaseapp.com",
  projectId: "myfacta-2403c",
  storageBucket: "myfacta-2403c.appspot.com",
  messagingSenderId: "81605323899",
  appId: "1:81605323899:web:e4518b85f4088f9c2106de"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 


async function loadFacts() {
  const factsList = document.querySelector("#facts-list");

 
  const querySnapshot = await getDocs(collection(db, "facts"));
  querySnapshot.forEach((docSnapshot) => {
    const factData = docSnapshot.data();
    const factText = factData.fact;
    const sourceText = factData.source;
    const categoryText = factData.category;
    const votes = factData.votes || { thumbsUp: 0, mindBlown: 0, cross: 0 };

    
    const newFact = document.createElement("li");
    newFact.classList.add("fact");
    newFact.innerHTML = `
      <p>${factText} <a class="source" href="${sourceText}" target="_blank">(Source)</a></p>
      <span class="tag" style="background-color: ${categoryText === 'technology' ? '#3b82f6' : categoryText === 'science' ? '#16a34a' : '#eab308'};">${categoryText}</span>
      <div class="vote-buttons">
        <button class="vote-btn" data-vote="thumbs-up">👍 <span>${votes.thumbsUp}</span></button>
        <button class="vote-btn" data-vote="mind-blown">🤯 <span>${votes.mindBlown}</span></button>
        <button class="vote-btn" data-vote="cross">❌ <span>${votes.cross}</span></button>
      </div>
      <button class="delete-btn">Delete</button> <!-- Add delete button -->
    `;
    factsList.appendChild(newFact);

    
    const voteButtons = newFact.querySelectorAll(".vote-btn");
    voteButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const voteType = button.getAttribute('data-vote');
        const countSpan = button.querySelector("span");
        let count = parseInt(countSpan.textContent);
        count++;

     
        const factRef = doc(db, "facts", docSnapshot.id);
        const updatedVotes = { ...votes }; 
        updatedVotes[voteType] = count; 
        console.log("Updating Firestore with: ", updatedVotes);

        try {
         
          await updateDoc(factRef, { votes: updatedVotes });

          
          countSpan.textContent = count;
          console.log("Vote updated successfully in Firestore");
        } catch (error) {
          console.error("Error updating vote in Firestore: ", error);
        }
      });
    });

   
    const deleteButton = newFact.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async function () {
      try {
        
        const factRef = doc(db, "facts", docSnapshot.id);
        await deleteDoc(factRef);
        console.log("Fact deleted from Firestore");

       
        newFact.remove();
      } catch (error) {
        console.error("Error deleting fact from Firestore: ", error);
      }
    });
  });
}


document.querySelector("#post-button").addEventListener("click", async function (event) {
  event.preventDefault();

  const factInput = document.querySelector("#fact-input");
  const sourceInput = document.querySelector("#source-input");
  const categorySelect = document.querySelector("#category-select");
  const factsList = document.querySelector("#facts-list");

  const factText = factInput.value.trim();
  const sourceText = sourceInput.value.trim();
  const categoryText = categorySelect.value;

  if (!factText || !sourceText || !categoryText) {
    alert("Please enter a fact, a trustworthy source, and select a category!");
    return;
  }

  try {
  
    const docRef = await addDoc(collection(db, "facts"), {
      fact: factText,
      source: sourceText,
      category: categoryText,
      votes: { thumbsUp: 0, mindBlown: 0, cross: 0 } 
    });

    console.log("Document written with ID: ", docRef.id);

    
    const newFact = document.createElement("li");
    newFact.classList.add("fact");
    newFact.innerHTML = `  
      <p>${factText} <a class="source" href="${sourceText}" target="_blank">(Source)</a></p>
      <span class="tag" style="background-color: ${categoryText === 'technology' ? '#3b82f6' : categoryText === 'science' ? '#16a34a' : '#eab308'};">${categoryText}</span>
      <div class="vote-buttons">
        <button class="vote-btn" data-vote="thumbs-up">👍 <span>0</span></button>
        <button class="vote-btn" data-vote="mind-blown">🤯 <span>0</span></button>
        <button class="vote-btn" data-vote="cross">❌ <span>0</span></button>
      </div>
      <button class="delete-btn">Delete</button> <!-- Add delete button to new post -->
    `;
    
    factsList.appendChild(newFact);

    
    const voteButtons = newFact.querySelectorAll(".vote-btn");
    voteButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const voteType = button.getAttribute('data-vote');
        const countSpan = button.querySelector("span");
        let count = parseInt(countSpan.textContent);
        count++;

        
        const factRef = doc(db, "facts", docRef.id); 
        const updatedVotes = { thumbsUp: 0, mindBlown: 0, cross: 0 }; 
        updatedVotes[voteType] = count; 

        console.log("Updating Firestore with: ", updatedVotes);

        try {
         t
          await updateDoc(factRef, { votes: updatedVotes });

        
          countSpan.textContent = count;
          console.log("Vote updated successfully in Firestore");
        } catch (error) {
          console.error("Error updating vote in Firestore: ", error);
        }
      });
    });

  
    const deleteButton = newFact.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async function () {
      try {
        
        const factRef = doc(db, "facts", docRef.id);
        await deleteDoc(factRef);
        console.log("Fact deleted from Firestore");

       
        newFact.remove();
      } catch (error) {
        console.error("Error deleting fact from Firestore: ", error);
      }
    });

  
    factInput.value = "";
    sourceInput.value = "";
    categorySelect.value = "";

    console.log("Fact posted successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});


window.onload = loadFacts;
