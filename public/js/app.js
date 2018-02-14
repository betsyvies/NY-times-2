const formFetch = document.getElementById('search-form-fetch');
const searchFieldFetch = document.getElementById('search-keyword-fetch');
const responseContainerFetch = document.getElementById('response-container-fetch');

formFetch.addEventListener('submit', function(e) {
  e.preventDefault();
  
  /* Extraemos el valor del input */
  responseContainerFetch.innerHTML = '';
  let searchedForTextFetch = searchFieldFetch.value;
  const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForTextFetch}&api-key=347d672874fd431eb13860e1a3f4d50b`;

  fetch(url)
    .then(handleErrors)
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
  console.log(article);
  article.forEach(function(element) {
    const title = element.headline.main;
    const snippet = element.snippet;
  
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerHTML = snippet;
  
    responseContainerFetch.appendChild(li);
  });
}

function displayErrors(err) {
  console.log('INSIDE displayErrors!');
  console.log(err);
}