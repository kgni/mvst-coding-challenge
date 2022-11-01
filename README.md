

# GITHUB REPO LIST
Small project working with the GitHub API. 
Contains functionality including searching for users and displaying/searching through all of their public repositories.

**Link to project:** https://mvst-github.vercel.app/

![mvst-coding-challenge](https://user-images.githubusercontent.com/84397151/199331770-f18667a9-c032-4862-9a80-9eb3713c238b.png)
## How It's Made:

**Tech used:** 
HTML, CSS, TailwindCSS, TypeScript, React, Next.js, [GitHub API](https://docs.github.com/en/rest)


## How to run it
Install

    npm i

Run dev server on port 3000

    npm run dev
App is now running on http://localhost:3000/

Start searching for users and get a list of all of their public repositories.


### GitHub API Rate limit
By default you are limited to 60 requests/hr (unauthorized users), however, it is possible to bump this up to 5000 requests/hr by adding a personal access token.

To get more requests per hour, and potentially more detailed responses, add your own personal access token as an environment variable to `env.local` file in your `root` directory.

- GITHUB_PERSONAL_TOKEN={your_token_here}

You can find more info on how to create GitHub Personal Access Tokens [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)


## Optimizations

### 1. Query a users repositories using API endpoint query parameters

Currently, all repositories for a specific user are being fetched on initial load, using SSR. 

The GitHub API has an endpoint, where you can fetch repositories owned by a specific user: 
`GET search/repositories?q=+user:{user}`

Currently, this endpoint is NOT being used, because I could only figure out how to get the repositories owned by the user, and NOT the repositories the user had also forked.

### How we are currently getting all repositories for a user included forked ones
All user repositories are instead being fetched by using another endpoint: `GET users/{user}/repos`

100 repositories are being fetched per page. To ensure we are getting all repositories for a user (if they have more than 100), a loop is made. 
This loop will do another fetch for the next 100 repositories if we are getting 100 back, if we get less than 100 back it means that we have fetched all repositories and we will break out of the loop, and return all the fetched repositories.

Because we most of the time are getting a small set of repositories back, you could argue that this is a viable way for fetching all repositories. However, for bigger datasets, we would run into performance issues where we would have long loading times, and in that case, it would be preferred to take advantage of the implemented server-side pagination that the API has. 

### How filtering of repositories is currently done

Currently, the filtering is made only in the front end, because (as mentioned) I couldn't figure out how to query all public repos for a user (including the forked repos). 

We have 3 ways of filtering/sorting client-side.

 1. By ***search term*** - only by title and description
 2. By ***type*** (public/all or forked repositories)
 3. Sort - by **name** or **last updated**

### Downsides of doing client-side filtering compared to using query parameters with the API

With client-side filtering, we are not getting as in-depth search results as we would by using the specific endpoint for querying a specific user's own repositories - the API is for example also looking in the readme for search terms, where we are currently only looking at the title and description
But as mentioned above, with this endpoint we won't get all the repositories that the user has forked, which is why I decided to go with the solution of fetching all repositories and then filtering them on the client side.

### 2. Possible to open both sort/filter drop-downs at once
For more info, see the issue here
Basically, I think a modal could fix this problem. So when you are clicking one of the buttons, an invisible modal appears underneath the modal filling the entire screen - when we click anywhere the drop-down will close/disappear

### 3. Make the loading state more clear after clicking a user.
For more info, see the issue here
I'm not sure if the small spinner on the user you clicked is making it clear enough that a request is being made.

### 4. Write tests / add testing library
Currently no tests are written for this application. This is certainly something that should be done in the future. 
Both when it comes to unit, integration, and e2e testing.

### 5. Add more comprehensive error handling
For now, the status codes for errors are not taken into account.
When searching for users "No user found" will be displayed for all errors. 
Instead, we would want more descriptive error messages, depending on the error (status code) we are getting.

The same goes for when we are fetching and doing the SSR for a user's info and repositories. Here we will simply just return a 404 page if something went wrong.

### 6. Create a loader between pages
Could implement a loader page for when we are switching pages from the search page to the user page.

### 7. Minor lag when loading pages.
Loading animation for the user's repository list will sometimes lag on load. 
Same goes for 


For more bugs/issues click [here](https://github.com/kgni/mvst-coding-challenge/issues)

## Lessons Learned:

This was my first time ever working with TypeScript. I learned a lot about the basics of TypeScript, and how to use it in React. 
I'm starting to see the patterns, and how great it really is. I wouldn't voluntarily want to go back to vanilla JavaScript after I've seen the true powers and all of the benefits TypeScript brings. I can see why it is an industry-standard and how it can save many hours in the long run.

I also learned about the GitHub API, including either its limitations when it comes to fetching user-specific repositories. 
It could also be that I just haven't figured out how to query the exact way I wanted to.

## Feedback
I really enjoyed doing this challenge, it was right up my alley. 
I think the amount of time for the challenge was fair, especially considering that I had to learn TypeScript (just the basics of course)

Compared to other coding challenges I have done, I feel like this type of take-home gives a good insight into who you are as a developer, including your strengths and weaknesses.

PS Sorry for the wall of text in the "Optimization" section. I definitely have to work on being more accurate when it comes to writing about technical stuff in English.
