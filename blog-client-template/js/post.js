document.addEventListener('DOMContentLoaded', function () {
    // Getting the id eleement from URL
    const urlParams = new URLSearchParams(location.search);
    const inläggID = urlParams.get('id');


    if (inläggID) {
        fetchPost(inläggID);
    } else {
        console.error('Inläggsid saknas i URL:en');
    }

    // Function to get the specifikt post
    async function fetchPost(inläggID) {
        try {
            
            const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${inläggID}`);
            const post = await response.json();

            const tagsHtml = post.tags ? `<p><strong>Tags:</strong> ${post.tags.join(', ')}</p>` : '';

 // Creating HTML elements for the post
            const postContentContainer = document.getElementById('post-content');
            const postHTML = `
                <h2>${post.title}</h2>
                <p>${post.author} ${post.date}</p>
                ${tagsHtml}
                <p>${post.content}</p>
              
                <a href="#" class="Index-button">Back</a>


            `;
           

            postContentContainer.innerHTML = postHTML;
        } catch (error) {
            console.error('Error fetching blog post:', error);
        }
           
           const tillbakaKnapp = document.querySelector('.Index-button');

           // Adding eventListener to the button
           tillbakaKnapp.addEventListener('click', function (e) {
               e.preventDefault();
               window.location.href = 'index.html';
           });
    }
});

