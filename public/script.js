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
            category: "Window Cleaning",
            location: "Brooklyn, NY",
            content: "We’re now offering discounts on eco-friendly cleaning services!",
            timestamp: "2 hours ago",
            likes: 12
        },
        {
            username: "Smith’s Bakery",
            category: "Bakery",
            location: "Brooklyn, NY",
            content: "Collaborating with LocalCoffeeShop for a holiday cookie launch!",
            timestamp: "Yesterday",
            likes: 8
        },
        {
            username: "Joe’s Lawn Care",
            category: "Lawn Care",
            location: "Brooklyn, NY",
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
            postCard.className = 'bg-white rounded-lg shadow p-4 mb-6 post-card fade-in';
            postCard.innerHTML = `
                <div class="mb-2">
                    <p class="text-lg font-bold text-google-blue">${post.username}</p>
                    <p class="text-sm text-gray-600">${post.category} • ${post.location}</p>
                </div>
                <p class="text-gray-800 mb-4">${post.content}</p>
                <p class="text-gray-500 text-sm mb-4">${post.timestamp}</p>
                <div class="flex items-center space-x-6">
                    <button class="like-button interactive-button text-google-blue flex items-center" data-index="${index}">
                        <i class="fas fa-thumbs-up mr-1"></i> Like (<span>${post.likes}</span>)
                    </button>
                    <button class="comment-button interactive-button text-google-blue flex items-center">
                        <i class="fas fa-comment mr-1"></i> Comment
                    </button>
                    <button class="collaborate-button interactive-button text-google-blue flex items-center">
                        <i class="fas fa-handshake mr-1"></i> Collaborate
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
                category: document.getElementById('business-category').value || 'General',
                location: 'Brooklyn, NY',
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
        if (e.target && (e.target.matches('button.like-button') || e.target.closest('button.like-button'))) {
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

    // Update business name and category display
    var businessName = sessionStorage.getItem('username') || 'Your Business';
    document.getElementById('business-name').textContent = businessName;

    document.getElementById('business-category').addEventListener('change', function() {
        document.getElementById('business-category-display').textContent = this.value;
    });
}
