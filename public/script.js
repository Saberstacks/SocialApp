// script.js

// Common Variables
var currentUser = {
    username: sessionStorage.getItem('username') || 'Business Owner',
    category: 'General',
    location: 'Brooklyn, NY',
    description: 'This is a placeholder description of the business.'
};

// Index Page Functionality
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Get input values
        var username = document.getElementById('username').value || 'Business Owner';
        sessionStorage.setItem('username', username);
        // Redirect to dashboard
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
            likes: 12,
            comments: [
                { user: "John's Cleaning", text: "Great offer!" },
                { user: "Eco Cleaners", text: "We should collaborate!" }
            ]
        },
        // Add more mock posts as needed
    ];

    // Render Posts
    function renderPosts() {
        var postFeed = document.getElementById('post-feed');
        postFeed.innerHTML = '';
        posts.forEach(function(post, index) {
            var postCard = document.createElement('div');
            postCard.className = 'bg-white bg-opacity-90 rounded-lg shadow p-4 mb-6 post-card border border-light-blue';
            postCard.innerHTML = `
                <div class="mb-2">
                    <a href="#" class="text-lg font-bold text-google-blue post-username">${post.username}</a>
                    <p class="text-sm text-gray-600">${post.category} • ${post.location}</p>
                </div>
                <p class="text-gray-800 mb-4">${post.content}</p>
                <p class="text-gray-500 text-sm mb-4">${post.timestamp}</p>
                <div class="flex items-center space-x-6">
                    <button class="like-button interactive-button text-google-blue flex items-center" data-index="${index}">
                        <i class="fas fa-thumbs-up mr-1"></i> Like (<span>${post.likes}</span>)
                    </button>
                    <button class="comment-button interactive-button text-google-blue flex items-center" data-index="${index}">
                        <i class="fas fa-comment mr-1"></i> Comment
                    </button>
                </div>
                <div class="comment-section hidden mt-4">
                    <div class="mb-2">
                        <input type="text" class="w-full p-2 border rounded" placeholder="Add a comment...">
                    </div>
                    <div class="space-y-2">
                        ${post.comments.map(comment => `
                            <p><strong>${comment.user}:</strong> ${comment.text}</p>
                        `).join('')}
                    </div>
                </div>
            `;
            postFeed.appendChild(postCard);
        });
    }

    renderPosts();

    // Post Creation
    document.getElementById('post-button').addEventListener('click', function() {
        var postContent = document.getElementById('post-input').value;
        if (postContent.trim() !== '') {
            var newPost = {
                username: currentUser.username,
                category: currentUser.category,
                location: currentUser.location,
                content: postContent,
                timestamp: 'Just now',
                likes: 0,
                comments: []
            };
            posts.unshift(newPost);
            renderPosts();
            document.getElementById('post-input').value = '';
        }
    });

    // Like and Comment Functionality
    document.getElementById('post-feed').addEventListener('click', function(e) {
        // Like Button
        if (e.target && (e.target.matches('button.like-button') || e.target.closest('button.like-button'))) {
            var button = e.target.closest('button.like-button');
            var index = button.getAttribute('data-index');
            posts[index].likes += 1;
            renderPosts();
        }
        // Comment Button
        if (e.target && (e.target.matches('button.comment-button') || e.target.closest('button.comment-button'))) {
            var button = e.target.closest('button.comment-button');
            var commentSection = button.parentElement.nextElementSibling;
            commentSection.classList.toggle('hidden');
        }
        // Username Click (Visit Profile)
        if (e.target && e.target.matches('a.post-username')) {
            e.preventDefault();
            var username = e.target.textContent;
            sessionStorage.setItem('profileUsername', username);
            window.location.href = 'profile.html';
        }
    });

    // Tab Navigation
    document.getElementById('tab-feed').addEventListener('click', function() {
        showSection('post-feed-section');
    });
    document.getElementById('tab-blogs').addEventListener('click', function() {
        showSection('blogs-section');
    });
    document.getElementById('tab-citations').addEventListener('click', function() {
        showSection('citations-section');
    });
    document.getElementById('tab-map').addEventListener('click', function() {
        showSection('map-section');
    });

    function showSection(sectionId) {
        var sections = ['post-feed-section', 'blogs-section', 'citations-section', 'map-section'];
        sections.forEach(function(id) {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }
}

// Profile Page Functionality
if (document.getElementById('profile-business-name')) {
    var profileUsername = sessionStorage.getItem('profileUsername') || currentUser.username;
    // Mock data for profiles
    var profiles = {
        "Bright Windows LLC": {
            username: "Bright Windows LLC",
            category: "Window Cleaning",
            location: "Brooklyn, NY",
            description: "We provide eco-friendly window cleaning services.",
            posts: [
                {
                    content: "We’re now offering discounts on eco-friendly cleaning services!",
                    timestamp: "2 hours ago",
                    likes: 12,
                    comments: []
                }
                // Add more posts as needed
            ]
        },
        // Add more profiles as needed
    };

    var profileData = profiles[profileUsername] || currentUser;

    // Set Profile Data
    document.getElementById('profile-business-name').textContent = profileData.username;
    document.getElementById('profile-category').textContent = profileData.category;
    document.getElementById('profile-location').textContent = profileData.location;
    document.getElementById('profile-description').textContent = profileData.description;

    // Render Profile Posts
    function renderProfilePosts() {
        var profilePostsContainer = document.getElementById('profile-posts');
        profilePostsContainer.innerHTML = '';
        profileData.posts.forEach(function(post) {
            var postCard = document.createElement('div');
            postCard.className = 'bg-white bg-opacity-90 rounded-lg shadow p-4 mb-6 post-card border border-light-blue';
            postCard.innerHTML = `
                <p class="text-gray-800 mb-4">${post.content}</p>
                <p class="text-gray-500 text-sm mb-4">${post.timestamp}</p>
                <div class="flex items-center space-x-6">
                    <button class="interactive-button text-google-blue flex items-center">
                        <i class="fas fa-thumbs-up mr-1"></i> Like (<span>${post.likes}</span>)
                    </button>
                    <button class="interactive-button text-google-blue flex items-center">
                        <i class="fas fa-comment mr-1"></i> Comment
                    </button>
                </div>
            `;
            profilePostsContainer.appendChild(postCard);
        });
    }

    renderProfilePosts();

    // Save Profile Info
    document.getElementById('save-profile').addEventListener('click', function() {
        var name = document.getElementById('edit-business-name').value;
        var category = document.getElementById('edit-category').value;
        var location = document.getElementById('edit-location').value;
        var description = document.getElementById('edit-description').value;

        if (name) {
            profileData.username = name;
            document.getElementById('profile-business-name').textContent = name;
        }
        if (category) {
            profileData.category = category;
            document.getElementById('profile-category').textContent = category;
        }
        if (location) {
            profileData.location = location;
            document.getElementById('profile-location').textContent = location;
        }
        if (description) {
            profileData.description = description;
            document.getElementById('profile-description').textContent = description;
        }

        alert('Profile information saved successfully!');
    });
}
