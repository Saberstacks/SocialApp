// script.js

// Login Page Functionality
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Get the input values
        var username = document.getElementById('username').value || 'Business Owner';
        var email = document.getElementById('email').value || 'email@example.com';
        // Store them in sessionStorage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('email', email);
        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    });
}

// Dashboard Page Functionality
if (document.getElementById('post-feed')) {
    var posts = [
        {
            username: "Bright Windows LLC",
            content: "We’re now offering discounts on eco-friendly cleaning services!",
            timestamp: "2 hours ago",
            likes: 12
        },
        {
            username: "Smith’s Bakery",
            content: "Collaborating with LocalCoffeeShop for a holiday cookie launch!",
            timestamp: "Yesterday",
            likes: 8
        },
        {
            username: "Joe’s Lawn Care",
            content: "Looking for other landscapers to co-host a spring expo!",
            timestamp: "4 hours ago",
            likes: 5
        }
    ];

    // Function to render posts
    function renderPosts() {
        var postFeed = document.getElementById('post-feed');
        postFeed.innerHTML = '';
        posts.forEach(function(post, index) {
            var postCard = document.createElement('div');
            postCard.className = 'bg-white rounded-lg shadow-lg p-4 mb-4 post-card';
            postCard.innerHTML = `
                <p class="font-bold">${post.username}</p>
                <p>${post.content}</p>
                <p class="text-gray-500 text-sm">${post.timestamp}</p>
                <div class="flex items-center mt-2">
                    <button class="like-button text-blue-600 mr-4 hover:text-blue-800" data-index="${index}">
                        <i class="fas fa-thumbs-up"></i> Like (<span>${post.likes}</span>)
                    </button>
                    <button class="comment-button text-blue-600 mr-4 hover:text-blue-800">
                        <i class="fas fa-comment"></i> Comment
                    </button>
                    <button class="collaborate-button text-blue-600 hover:text-blue-800">
                        <i class="fas fa-handshake"></i> Collaborate
                    </button>
                </div>
            `;
            postFeed.appendChild(postCard);
        });
    }

    // Initial render
    renderPosts();

    // Handle post creation
    document.getElementById('post-button').addEventListener('click', function() {
        var postContent = document.getElementById('post-input').value;
        if (postContent.trim() !== '') {
            var newPost = {
                username: sessionStorage.getItem('username') || 'Anonymous',
                content: postContent,
                timestamp: 'Just now',
                likes: 0
            };
            posts.unshift(newPost);
            renderPosts();
            document.getElementById('post-input').value = '';
        }
    });

    // Handle like button click
    document.getElementById('post-feed').addEventListener('click', function(e) {
        if (e.target && e.target.matches('button.like-button, button.like-button *')) {
            var button = e.target.closest('button.like-button');
            var index = button.getAttribute('data-index');
            posts[index].likes += 1;
            renderPosts();
        }
    });

    // Dynamic placeholder rotation
    var placeholders = [
        "What’s happening in your business?",
        "Share a tip or ask a question!",
        "Announce your latest service or event!"
    ];
    var placeholderIndex = 0;
    setInterval(function() {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        document.getElementById('post-input').placeholder = placeholders[placeholderIndex];
    }, 5000);
}

