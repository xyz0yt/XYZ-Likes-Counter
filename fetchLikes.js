import videoIds from './videoList.js'; // This should already contain your video IDs.
import { CHANNEL_ID, API_KEY } from './config.js'; // Import your Channel ID and API key

let totalLikes = 0; // To keep track of the total likes

// Function to fetch likes for each video
async function fetchLikes() {
    for (const videoId of videoIds) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&key=${API_KEY}`);
            const data = await response.json();

            // Loop through comments and count likes on your comments
            data.items.forEach(comment => {
                const commentData = comment.snippet.topLevelComment.snippet;
                if (commentData.authorChannelId.value === CHANNEL_ID) {
                    totalLikes += commentData.likeCount;
                }
            });
        } catch (error) {
            console.error(`Error fetching comments for video ${videoId}:`, error);
        }
    }

    // Display the total likes on the webpage
    document.getElementById("likeCounter").innerText = totalLikes;
}

// Run the fetchLikes function
fetchLikes();
