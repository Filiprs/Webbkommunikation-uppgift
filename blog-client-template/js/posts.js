document.addEventListener('DOMContentLoaded', function () {
    const blogPostsContainer = document.getElementById('blog-posts');

    // Function to get the latest post
    async function latestpost() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
            const blogPosts = await response.json();

            console.log('API Response:', blogPosts); 
            
            blogPostsContainer.innerHTML = '';

            //  Loop thru Api-answer and create html-element for each post
        
            blogPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');

               
                const title = post.title || 'Ingen titel';
                const author = post.author || 'Okänd författare';
                const date = post.date || 'Okänt datum';
                const content = post.content || 'Ingen text tillgänglig';
                const tags = post.tags ? post.tags.join(', ') : 'Inga taggar';

                postElement.innerHTML = `
                    <h2>${title}</h2>
                    <p> ${author} ${date} </p>
                    <p><strong>Tags:</strong> ${tags}</p>
                    <p class="post-content">${content.substring(0, 100)}...<a href="#" data-post-id="${post._id}" class="read-more">Read more...</a>
                    </p>
                `;

                blogPostsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }

   
    blogPostsContainer.addEventListener('click', function (e) {
        e.preventDefault();
        const Läsmerknapp = e.target.closest('.read-more');

        if (Läsmerknapp) {
            const postId = Läsmerknapp.getAttribute('data-post-id');
            console.log('Post ID when clicking "Läs mer":', postId); 

            //  Navigate to post.js with the chosen id element
            window.location.href = `post.html?id=${postId}`;
        }
    });

    // Get the latest blog posts
    latestpost();
});





