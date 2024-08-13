let githubUsername = "code-with-alpha";

const main = async (githubUsername) => {
    try{
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let githubData = await response.json();

        document.getElementById('user').textContent = githubData.name ;

        showImage(githubData);
        showName(githubData);
        showUserName(githubData);
        showFollowers(githubData);
        showFollowing(githubData);
        showRepositories(githubData);
        showAccountCreationDate(githubData);

        if(githubData.bio){
            let div = document.createElement('div');
            div.innerHTML = `<span>Bio:</span>
                                <span class="bio"></span>    
        `;

        document.querySelector('.right-box').appendChild(div);

        const bio = document.querySelector('.bio');
        bio.textContent = githubData.bio;
        }

        if(githubData.location){
            let div = document.createElement('div');
            div.innerHTML = `<span>Location:</span>
                                <span class="location"></span>    
        `;

        document.querySelector('.right-box').appendChild(div);

        const location = document.querySelector('.location');
        location.textContent = githubData.location;
        }

        if(githubData.blog){
            let div = document.createElement('div');
            div.innerHTML = `<span>Personal Website:</span>
                                <span class="blog"></span>    
        `;

        document.querySelector('.right-box').appendChild(div);

        const blog = document.querySelector('.blog');
        blog.textContent = githubData.blog;
        }
        await reposData(githubUsername);

    }
    catch(error){
        console.error(error);
    }   
}

const showImage = (githubData) =>{
    let image = document.querySelector('.profile');
    image.src = githubData.avatar_url;
}

const showName = (githubData) =>{
    let userName = document.querySelector('.profile-name');
    userName.textContent = githubData.name;
}

const showUserName = (githubData) =>{
    let username = document.querySelector('.username');
    username.textContent = githubData.login;
}

const showFollowers = (githubData) =>{
    let followers = document.querySelector('.followers');
    followers.textContent = githubData.followers;
}

const showFollowing = (githubData) =>{
    let following = document.querySelector('.following');
    following.textContent = githubData.following;
}

const showRepositories = (githubData) =>{
    let repositories = document.querySelector('.repos');
    repositories.textContent = githubData.public_repos;
}

const showAccountCreationDate = (githubData) => {
    let creationDate = document.querySelector('.creation-date');
    accountCreation = new Date(githubData.created_at);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${months[accountCreation.getMonth()]} ${accountCreation.getDate()}, ${accountCreation.getFullYear()}`;

    creationDate.textContent = formattedDate;
}

const gitReposData = async (githubUsername) => {
    try{
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}

const reposData = async (githubUsername) => {
    try{
        const reposData = await gitReposData(githubUsername);
        const allGitRepos = document.querySelector('.all-repos');
        
        reposData.forEach((repo) => {
            let div = document.createElement('div');
            let repoName = document.createElement('div');
            let repoDescription = document.createElement('p');


            repoName.textContent = repo.name;
            repoDescription.textContent = repo.description;
            div.appendChild(repoName);
            div.appendChild(repoDescription);

            allGitRepos.appendChild(div);
        });
    }
    catch(error){
        console.error(error);
    }
}

main(githubUsername);