const API_KEY="38b1a396928b4d2c86d3a844ccf8144c";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("tesla"));


async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById('cardContainer');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone =newsCardTemplate.content.cloneNode(true);
        fillDataCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataCard(cardClone,article){
    const newsimg = cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-Source');
    const newsDesc =cardClone.querySelector('#news-desc');

    newsimg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.content;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"})
    newsSource.innerHTML=`${article.source.name} : ${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav=null;
function navItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search_button');
const searchText = document.getElementById('news_input');

searchButton.addEventListener('click', () => {
  const query = searchText.value; // Grab value right before using it
  if (!query) return;
  fetchNews(query); // Call fetchNews with the retrieved query
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
