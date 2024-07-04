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

// Reference to the visitor's count and names
const counterRef = database.ref('counter');
const visitorsRef = database.ref('visitors');

// Initial load of counter value
counterRef.on('value', (snapshot) => {
    const counterValue = snapshot.val();
    document.getElementById('counterValue').textContent = counterValue;
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
        visitorsRef.push().set({
            name: nameInput
        });
        document.getElementById('nameInput').value = '';
    }
}

// Display visitors' names
visitorsRef.on('child_added', (snapshot) => {
    const visitor = snapshot.val();
    const visitorItem = document.createElement('li');
    visitorItem.textContent = visitor.name;
    document.getElementById('visitorList').appendChild(visitorItem);
});
