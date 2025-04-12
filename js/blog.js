document.addEventListener('DOMContentLoaded', function() {
    // Blog search functionality
    const blogSearchForm = document.querySelector('.blog-search');
    if (blogSearchForm) {
        blogSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                // In a real implementation, this would search through articles
                alert(`Searching for: ${searchTerm}`);
                // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }

    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.newsletter-form, .sidebar-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (email) {
                // In a real implementation, this would send to your email service
                alert(`Thank you for subscribing with ${email}`);
                this.reset();
            }
        });
    });

    // Comment form submission
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value.trim();
            const comment = this.querySelector('textarea').value.trim();
            
            if (name && comment) {
                // In a real implementation, this would send to your backend
                alert('Thank you for your comment! It will appear after moderation.');
                this.reset();
                
                // Example of how you might add the comment to the page
                /*
                const commentList = document.querySelector('.comment-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <img src="images/default-avatar.jpg" alt="${name}">
                    <div class="comment-content">
                        <h4>${name} <span>Just now</span></h4>
                        <p>${comment}</p>
                        <a href="#" class="reply-btn">Reply</a>
                    </div>
                `;
                commentList.appendChild(newComment);
                */
            }
        });
    }

    // Share buttons
    const shareButtons = document.querySelectorAll('.post-share a');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1];
            let shareUrl = '';
            const pageUrl = encodeURIComponent(window.location.href);
            const pageTitle = encodeURIComponent(document.title);
            
            switch(platform) {
                case 'fa-facebook-f':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'fa-twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'fa-pinterest-p':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}`;
                    break;
                case 'fa-linkedin-in':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});