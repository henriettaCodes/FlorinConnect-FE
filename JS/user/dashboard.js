document.addEventListener('DOMContentLoaded', function () {
    let data = [
        {
            "post_id": 1,
            "user_id": 1,
            "title": "Job Opening at XYZ Corp",
            "category": "job",
            "content": "We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!We have a new job opening for software engineers. Apply now!",
            "date_posted": "2024-02-12"
        },
        {
            "post_id": 2,
            "user_id": 2,
            "title": "Volunteer Opportunity: Local Community Cleanup",
            "category": "volunteering",
            "content": "Join us for a community cleanup event. Let's make our neighborhood clean!",
            "date_posted": "2024-02-13"
        },
        {
            "post_id": 3,
            "user_id": 3,
            "title": "Upcoming Tech Conference",
            "category": "events",
            "content": "Exciting tech conference featuring industry experts. Save the date!",
            "date_posted": "2024-02-14"
        },
        {
            "post_id": 4,
            "user_id": 1,
            "title": "Part-time Job Opportunity",
            "category": "job",
            "content": "Looking for part-time workers for our retail store. Apply within!",
            "date_posted": "2024-02-15"
        },
        {
            "post_id": 5,
            "user_id": 2,
            "title": "Join Our Environmental Conservation Project",
            "category": "volunteering",
            "content": "Help us protect the environment. Join our conservation project today!",
            "date_posted": "2024-02-16"
        },
        {
            "post_id": 6,
            "user_id": 3,
            "title": "Local Music Festival",
            "category": "events",
            "content": "Don't miss the upcoming music festival. Get your tickets now!",
            "date_posted": "2024-02-17"
        }
    ]

    let x = 1
    const carouselInner = document.querySelector('.carousel-inner');
    data.forEach((item, index) => {
        const isUserX = item.user_id === x
        const activeClass = index === 0 ? 'active' : ''
        const card = document.createElement('div');
        card.className = `carousel-item ${activeClass}`;
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">${item.title}</h5>
                    <p class="card-text text-center" style="padding: 0 100px;">${item.content}</p>
                    <p class="card-text text-center">${item.date_posted}</p>
                    ${isUserX ? `<button class="btn btn-primary" style="margin: 0 100px;" onclick="logPostId(${item.post_id})">Log Post ID</button>` : ''}
                    <button class="btn btn-primary" style="margin: 0 100px;" onclick="logPostId(${item.post_id})">View</button>
                    </div>
            </div>
        `
        carouselInner.appendChild(card)
    })
    window.logPostId = (post_id) => {
        console.log(`Post ID: ${post_id}`)
        localStorage.setItem("post_id", `${post_id}`)
    }
})