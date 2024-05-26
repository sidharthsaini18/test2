// Initialize Dexie
const db = new Dexie("SongDatabase");
db.version(1).stores({
    songs: "++id,imageUrl,songName,songUrl"
});

async function loadCards() {
    const songs = await db.songs.toArray();
    
    if (songs.length > 0) {
        const container = document.getElementById('songCardsContainer');
        container.innerHTML = ''; // Clear existing cards
        songs.forEach(song => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${song.imageUrl}" alt="Song Image">
                <h2>${song.songName}</h2>
                <a href="${song.songUrl}" target="_blank">Listen Now</a>
                <button class="delete-btn" data-id="${song.id}">Delete</button>
            `;
            container.appendChild(card);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async function() {
                const id = parseInt(this.getAttribute('data-id'));
                await deleteCard(id);
                loadCards(); // Reload cards after deletion
            });
        });
    } else {
        document.getElementById('songCardsContainer').innerHTML = '<p>No song data available.</p>';
    }
}

async function deleteCard(id) {
    await db.songs.delete(id);
}

loadCards();

      