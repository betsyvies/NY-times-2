const formFetch = document.getElementById('search-form-fetch');
const searchFieldFetch = document.getElementById('search-keyword-fetch');
const responseContainerFetch = document.getElementById('response-container-fetch');

formFetch.addEventListener('submit', function(e) {
  e.preventDefault();
  
  /* Extraemos el valor del input */
  responseContainerFetch.innerHTML = '';
  let searchedForTextFetch = searchFieldFetch.value;
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForTextFetch}&api-key=347d672874fd431eb13860e1a3f4d50b`;

  fetch(url)
    .then(handleErrors) // Si todo esta bien corre el programa, sino saldra el error
    .then(parseJSON)
    .then(updateArticle)
    .catch(displayErrors);
});

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res) {
  return res.json();
}

function updateArticle(data) {
  console.log(data);
  const article = data.response.docs;
  
  article.forEach(function(element) {
    const title = element.headline.main;
    const snippet = element.snippet;
    const imgUrl = element.multimedia[2].url;
    const webUrl = element.web_url;
  
    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let text = document.createElement('p');
    let link = document.createElement('a');
    let div = document.createElement('div');

    text.className = 'articleClass';
    img.className = 'imgClass';
    h1.className = 'title';
    link.className = 'link';
    div.className = 'container';

    text.innerHTML = snippet;
    img.setAttribute('src', 'https://static01.nyt.com/' + imgUrl);
    link.setAttribute('href', webUrl);
    link.textContent = 'Read more';
    h1.innerHTML = title; 

    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(text);
    div.appendChild(link);
  
    responseContainerFetch.appendChild(div);
  });
}

function displayErrors(err) {
  console.log('INSIDE displayErrors!');
  console.log(err);
}
