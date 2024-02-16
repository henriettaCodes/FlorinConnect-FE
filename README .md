
# Florin Connect

### Introduction
Florin connect is a forum that allows posts for events, volunteering opportunities, and job listings to be made. The forum acts as a digital communitity bulletin board that can be interaccted with by any user.

### Installation and usage
- Clone or download the repo.
- Open the project in your preferred code editor.
- Run the application by opening 'index.html' in a live server which will open the browser on the page.

### Technologies

- HTML
- CSS
- Javascript
- REST api (part of backend)
- PostgresSQL database (part of backend)

### Process
- Started by creating wireframes for the project.
- Created a server with a custom api with information about users and their posts and replies.
- Created client side in html/css/javascript.
- Created various user stories to use as a guide.

### Features
- A public landing page that is only accessible to non-logged in users. The page contains the app's logo and options to continue as a guest (to posts page) or to create account. The footer displays links for the town of Florin's location and an 'about the application' page (this footer is used on every page of the website).
- A dashboard page that is only viewable to logged in users offers a summarative view of all the posts made within the application's database via an accordion folder headed by each category of posts and within a carousels of all the posts made in the given category.
- A posts page. This page displays all the posts stored in the application's database and has filters such as filter by category or search for keyword. Thie posts are displayed on postit note style cards with a 'reply' button if the user is logged in, an 'edit' button if the post belongs to the logged in user, and a 'delete' button if the post belongs to the logged in user or user is an admin.
- A replies page that is only accessible by logged in users. Displays the selected post and the replies to it. Allows users to write replies and users to delete their own replies and other replies if they are an admin user.
- Create and edit post pages. A form page that allows users to edit the content of the post title, post description, and post category. Any logged-in user can create a post however edit's can only be made by the posts owner.


### User guide
- Once opening the landing page, press create account.
- Fill in form with valid details and desired user type.
- to view posts go to the posts page and to view replies press reply on the desired post.
- to create post, go to the posts page and press 'add post' button. Fill out all fields in the form and press 'submut' and you will be redirected to the posts page where the newly created post will be displayed.
- To delee a post, go to the posts page and press the 'delete' button. Press confirm if the broswer alerts you once pressing the button.
- To post a reply, go to the posts page and press reply on a post you'd like to reply to. At the bottom of the page, enter the desired reply text and press 'post'. The page should now display the reply as a postit note under the post.
- To delete a reply, go to the replies page and press 'delete' on the reply needing to be deleted and confirm if browser gives an alert.
- To delte a post, go to the posts page and press 'delete' on the desired post and confirm if browser gives alert.
- To edit a post, go to the posts page and press 'edit' and ammend the values in the input boxes as desired before pressing 'submit'. The website will redirect to the posts page where the post's changes will be visible.

### Future Features
- client facing profiles for users
- Messaging between user
- Reply threads for replying to a reply
- Deleting token when user logs out or after a given amount of time to end session

### Credits
Developers & github usernames:
- Zephania Molla - zmolla99
- Thomas Wood - thomasWoodGH
- Henrietta Adeniran -henriettaCodes