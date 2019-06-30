const ID_CONTENT = 'content';
var serviceWorker = null;

function handleServiceWorkerActive(registration) {
    console.log('Service worker registered.', registration);
    if (registration.active) {
        serviceWorker = registration.active;
    }
}

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(handleServiceWorkerActive);
  });
}

const renderList = function() {
  // Fetch the list
  fetch('api/list.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    return response.json();
  }).then(json => {
    // Create a list
    const ul = document.createElement("ul");

    // Iterate over the list and add new elements
    json.forEach(article => {
      const li = document.createElement("li");
      li.classList.add("articleItem");

      // Create the article title
      const articleTitle = document.createElement("a");
      articleTitle.appendChild(document.createTextNode(article.name));
      articleTitle.classList.add("articleTitle");
      articleTitle.setAttribute("href", article.file);
      articleTitle.setAttribute("target", "_blank");
      li.appendChild(articleTitle);

      // Create the author list
      const authors = document.createElement("span");
      authors.appendChild(document.createTextNode(article.authors.join(", ")));
      authors.classList.add("authors");
      li.appendChild(authors);
      
      // Create the author list
      const abstract = document.createElement("span");
      abstract.innerHTML = article.abstract.replace(/\n/g,"<br>");
      abstract.classList.add("abstract");
      li.appendChild(abstract);

      ul.appendChild(li);
    });

    const card = document.getElementById(ID_CONTENT);
    card.innerHTML = '';
    card.appendChild(ul);
  });
};

const saveOffline = function(articlePath) {
  serviceWorker.postMessage(articlePath);
}

window.onload = renderList;