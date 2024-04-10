const API_KEY="38b1a396928b4d2c86d3a844ccf8144c";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));


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
    newsDesc.innerHTML=article.urlToImage;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"})
    newsSource.innerHTML=`${article.source.name} . ${date}`
}