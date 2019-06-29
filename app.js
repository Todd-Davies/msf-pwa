const ID_CONTENT = 'content';

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
      li.appendChild(document.createTextNode(article.name));
      ul.appendChild(li);
    });

    const card = document.getElementById(ID_CONTENT);
    if (card) {
      console.log('Unable to find content element!');
    }
    card.innerHTML = '';
    card.appendChild(ul);
  });
};

window.onload = renderList;