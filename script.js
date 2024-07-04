// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the counter
const counterRef = database.ref('counter');
const nameRef = database.ref('name');

// Initial load of counter value
counterRef.on('value', (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counterValue').textContent = counterValue;
});

// Initial load of saved name
nameRef.on('value', (snapshot) => {
    const savedName = snapshot.val();
    document.getElementById('savedName').textContent = savedName;
});

// Function to increment the counter
function incrementCounter() {
    counterRef.transaction((currentValue) => {
        return (currentValue || 0) + 1;
    });
}

// Function to save visitor's name
function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput !== '') {
        nameRef.set(nameInput);
        document.getElementById('nameInput').value = '';
    }
}
