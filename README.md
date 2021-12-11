# uBit CMS

### Description:
The goal of this project was to create both a frontend and backend, the frontend is using React, React router, Redux and Material UI and the backend uses .NET Identity & Entity Framework and MySQL for storage.

The CMS has 2 roles:
* Editor
* Admin

Users with the admin role can create new users, edit and remove posts while the editors are limited to just edit and remove posts. The CMS caches all the posts and uses the cache through out the session, if a users accesses a post by URL directly the CMS will do a request to fetch that specific post.

When visiting the website you will see a 2 column grid with all the posts (if there are any), there is also a small menu in the top right corner where you can login, create new user and create a new post if you have the right permisson for it.

When visiting a post there are a 2 options for both deleting and editing the post, those options are only visible to the administrators and editors.

Importing the .sql file located in this repository will add some sample data to the CMS and it will also add a Admin account with the login: ``Admin:P@ssword123``.

### Endpoints:

* ``/api/register`` - Used to register a new user.
* ``/api/login`` - Used to authenticate a user.
* ``/api/posts`` - Used to fetch all posts.
* ``/api/create-post`` - Used to create a new post.
* ``/api/delete-post`` - Used to delete a post.
* ``/api/update-post`` - Used to update a post with new content.
* ``/api/get-post`` - Used to fetch a specific post.