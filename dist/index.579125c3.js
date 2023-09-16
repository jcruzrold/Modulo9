//import "./styles.css";
const CHARACTER_ENDPOINT_URL = new URL("https://rickandmortyapi.com/api/character");
const apiAccess = (url)=>{
    return fetch(url.href).then((response)=>{
        return response.json();
    });
};
const manageError = (message)=>{
    console.error(message);
    document.getElementById("root").replaceChildren(message);
};
const getPages = (response)=>{
    let pages = new Array();
    for(let page = 1; page <= response.info.pages; page++)pages.push(apiAccess(new URL(CHARACTER_ENDPOINT_URL.href + "?page=" + page)));
    return pages;
};
const getCharacters = (Pages)=>{
    for (let Page of Pages)Page.then((characters)=>{
        console.log(characters.results);
    });
};
const main = ()=>{
    apiAccess(CHARACTER_ENDPOINT_URL).then(getPages).catch((error)=>{
        manageError("Error al recuperar info del endpoint (" + CHARACTER_ENDPOINT_URL.href + ") : " + error);
    }).then(getCharacters);
};
window.onload = main;

//# sourceMappingURL=index.579125c3.js.map
