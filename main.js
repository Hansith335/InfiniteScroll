const container = document.getElementById("container");
const loading = document.querySelector('.loading');

getpost();
getpost();
getpost();

window.addEventListener( 'scroll', ()=>{
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 5) {
        showLoading();
        }
})

function showLoading() {
    loading.classList.add('show');
    setTimeout(getpost, 1000)
  }

async function getpost(){
    const postresponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`);
    const postdata = await postresponse.json();
    const userresponse = await fetch('https://randomuser.me/api');
    const userdata = await userresponse.json();
    const data = { post: postdata , user : userdata.results[0]};
    addDataToDOM(data);
}

function getRandomNr(){
    return (Math.floor(Math.random()*100 )+1);
}

function addDataToDOM(data){
    const postElement = document.createElement('div');
    postElement.classList.add("blog-post");
    postElement.innerHTML=`
        <h2 class="title">${data.post.title}</h2>
        <p class="text">${data.post.body}</p>
        <div class="user-info">
            <img src="${data.user.picture.large}" alt="${data.user.name.first}" />
            <span>${data.user.name.first} ${data.user.name.last}</span>
        </div>
    `;
    container.appendChild(postElement);
    loading.classList.remove('show');
}