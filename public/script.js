// script.js

// Common Variables
var currentUser = {
    username: sessionStorage.getItem('username') || 'Business Owner',
    category: 'General',
    location: 'Your Location',
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
    // Mode Switch (Local/National)
    var isLocalMode = true;
    var modeSwitch = document.getElementById('mode-switch');
    var serviceAreaContainer = document.getElementById('service-area-container');

    modeSwitch.addEventListener('change', function() {
        isLocalMode = !isLocalMode;
        if (isLocalMode) {
            serviceAreaContainer.classList.remove('hidden');
        } else {
            serviceAreaContainer.classList.add('hidden');
        }
        renderPosts();
        renderBlogs();
        renderCitations();
    });

    // Mock Data
    var localPosts = [
        {
            username: "Bright Windows LLC",
            category: "Window Cleaning",
            location: "Brooklyn, NY",
            content: "We’re now offering discounts on eco-friendly cleaning services!",
            timestamp: "2 hours ago",
            likes: 12,
            comments: 3,
            commentsData: []
        },
        {
            username: "Smith’s Bakery",
            category: "Bakery",
            location: "Brooklyn, NY",
            content: "Collaborating with LocalCoffeeShop for a holiday cookie launch!",
            timestamp: "Yesterday",
            likes: 8,
            comments: 2,
            commentsData: []
        },
        {
            username: "Joe’s Lawn Care",
            category: "Lawn Care",
            location: "Queens, NY",
            content: "Looking for other landscapers to co-host a spring expo!",
            timestamp: "4 hours ago",
            likes: 5,
            comments: 1,
            commentsData: []
        }
    ];

    var nationalPosts = [
        {
            username: "SparklePro Services",
            category: "National Cleaning Services",
            location: "Nationwide",
            content: "Proud to be named the #1 cleaning service in the U.S. for 2024!",
            timestamp: "3 days ago",
            likes: 24,
            comments: 5,
            commentsData: []
        },
        {
            username: "GreenNation Landscapes",
            category: "Landscaping",
            location: "Nationwide",
            content: "Join us for a free webinar on sustainable landscaping practices!",
            timestamp: "5 hours ago",
            likes: 18,
            comments: 4,
            commentsData: []
        },
        {
            username: "TopTier Baking Supplies",
            category: "Wholesale Bakery Supplier",
            location: "Nationwide",
            content: "Get 20% off on baking supplies for the holiday season!",
            timestamp: "Yesterday",
            likes: 15,
            comments: 3,
            commentsData: []
        }
    ];

    var posts = isLocalMode ? localPosts : nationalPosts;

    // Render Posts
    function renderPosts() {
        var postFeed = document.getElementById('post-feed');
        postFeed.innerHTML = '';
        posts = isLocalMode ? localPosts : nationalPosts;
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
                        <i class="fas fa-comment mr-1"></i> Comment (<span>${post.comments}</span>)
                    </button>
                </div>
                <div class="comment-section hidden mt-4">
                    <div class="mb-2">
                        <input type="text" class="w-full p-2 border rounded comment-input" placeholder="Add a comment..." data-index="${index}">
                    </div>
                    <div class="space-y-2 comment-list">
                        <!-- Comments will be inserted here -->
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
                comments: 0,
                commentsData: []
            };
            if (isLocalMode) {
                localPosts.unshift(newPost);
            } else {
                nationalPosts.unshift(newPost);
            }
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
            if (isLocalMode) {
                localPosts[index].likes += 1;
            } else {
                nationalPosts[index].likes += 1;
            }
            renderPosts();
        }
        // Comment Button
        if (e.target && (e.target.matches('button.comment-button') || e.target.closest('button.comment-button'))) {
            var button = e.target.closest('button.comment-button');
            var index = button.getAttribute('data-index');
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

    // Comment Submission
    document.getElementById('post-feed').addEventListener('keypress', function(e) {
        if (e.target && e.target.matches('input.comment-input')) {
            if (e.key === 'Enter') {
                var input = e.target;
                var index = input.getAttribute('data-index');
                var commentText = input.value;
                if (commentText.trim() !== '') {
                    var commentData = { user: currentUser.username, text: commentText };
                    if (isLocalMode) {
                        localPosts[index].commentsData.push(commentData);
                        localPosts[index].comments += 1;
                    } else {
                        nationalPosts[index].commentsData.push(commentData);
                        nationalPosts[index].comments += 1;
                    }
                    input.value = '';
                    renderPosts();
                }
            }
        }
    });

    // Tabs Navigation
    document.getElementById('tab-profile').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
    document.getElementById('tab-feed').addEventListener('click', function() {
        showSection('post-feed-section');
    });
    document.getElementById('tab-blogs').addEventListener('click', function() {
        showSection('blogs-section');
        renderBlogs();
    });
    document.getElementById('tab-citations').addEventListener('click', function() {
        showSection('citations-section');
        renderCitations();
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

    // Blogs & Articles
    function renderBlogs() {
        var blogsContent = document.getElementById('blogs-content');
        blogsContent.innerHTML = '';
        var blogs = isLocalMode ? [
            {
                title: "Top 5 Ways to Attract Local Customers to Your Business",
                publisher: "Brooklyn Business Journal"
            },
            {
                title: "Why SEO Is Key for Small Businesses in Brooklyn",
                publisher: "Local Insights Media"
            }
        ] : [
            {
                title: "2024 Trends in Small Business Marketing",
                publisher: "Entrepreneur Weekly"
            },
            {
                title: "How to Scale Your Business Without Breaking the Bank",
                publisher: "National Business News"
            }
        ];
        blogs.forEach(function(blog) {
            var blogCard = document.createElement('div');
            blogCard.className = 'bg-white rounded-lg shadow p-4 mb-4';
            blogCard.innerHTML = `
                <h3 class="text-xl font-bold text-google-blue">${blog.title}</h3>
                <p class="text-gray-600">Published by ${blog.publisher}</p>
            `;
            blogsContent.appendChild(blogCard);
        });
    }

    // Local Citations
    function renderCitations() {
        var citationsContent = document.getElementById('citations-content');
        citationsContent.innerHTML = '';
        var citations = isLocalMode ? [
            "Submit Your Business to BrooklynLocal.com for More Visibility!",
            "Claim Your Spot on NYSmallBizDirectory.net!"
        ] : [
            "Get Listed on TopBusinessDirectory.com!",
            "Boost Your Visibility on BizNation.io!"
        ];
        citations.forEach(function(citation) {
            var citationCard = document.createElement('div');
            citationCard.className = 'bg-white rounded-lg shadow p-4 mb-4';
            citationCard.innerHTML = `
                <p class="text-gray-800">${citation}</p>
            `;
            citationsContent.appendChild(citationCard);
        });
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
                    comments: 3
                }
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

    // Set Map
    var mapIframe = document.getElementById('profile-map');
    var mapLocation = encodeURIComponent(profileData.location);
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapLocation}`;

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
                        <i class="fas fa-comment mr-1"></i> Comment (<span>${post.comments}</span>)
                    </button>
                </div>
            `;
            profilePostsContainer.appendChild(postCard);
        });
    }

    renderProfilePosts();

    // Message Button
    document.getElementById('message-button').addEventListener('click', function() {
        document.getElementById('chat-box').classList.remove('hidden');
    });

    // Close Chat
    document.getElementById('close-chat').addEventListener('click', function() {
        document.getElementById('chat-box').classList.add('hidden');
    });

    // Edit Profile
    var isEditing = false;
    document.getElementById('edit-profile-button').addEventListener('click', function() {
        isEditing = !isEditing;
        if (isEditing) {
            document.getElementById('edit-profile-section').classList.remove('hidden');
            document.getElementById('edit-business-name').value = profileData.username;
            document.getElementById('edit-category').value = profileData.category;
            document.getElementById('edit-location').value = profileData.location;
            document.getElementById('edit-description').value = profileData.description;
        } else {
            document.getElementById('edit-profile-section').classList.add('hidden');
        }
    });

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
        document.getElementById('edit-profile-section').classList.add('hidden');
        isEditing = false;
    });
}
