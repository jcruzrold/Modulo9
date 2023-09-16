import * as Utils from "./utils";

const CHARACTER_ENDPOINT_URL = new URL("https://rickandmortyapi.com/api/character");

const apiExtraction = (url) => {
    return fetch(url.href)
    .then((response) => {
        return response.json();
    })
    .catch((reject) => console.error("Error while extracting information from API (apiExtraction) => " + reject));
}

const getCharacterPages = (response) => {
    let characterPages = new Array();

    for(let characterPage = 1; characterPage <= response.info.pages; characterPage ++){
        characterPages.push(apiExtraction(new URL(CHARACTER_ENDPOINT_URL.href + "?page=" + characterPage)));
    }

    return characterPages;
}

const buildCharacterList = (pages) => {
    document.getElementById("root").replaceChildren();

    for(const page of pages){
        page
        .then((charactersPage) => {
            for(const character of charactersPage.results){
                const characterElement = Utils.createCharacterRow(character);
                characterElement.addEventListener("click",() => {Utils.showCharacter(character)});
                document.getElementById("root").appendChild(characterElement);
            }
        })
        .catch((reject) => console.error("Error while consuming character pages promises (buildCharacterList) => " + reject));
    }
}

const getCharacterOriginData = (character) => {
    if(character.origin.url.length !== 0){
        return apiExtraction(new URL(character.origin.url))
        .then((originData) => {
            character.origin.type = originData.type;
            character.origin.dimension = originData.dimension;

            return character;
        })
        .catch((reject) => console.error("Error while extracting character origin data (getCharacterOriginData) => " + reject));
    }
    else{
        return new Promise((resolve) => {
            resolve({
                created:    "",
                dimension:  "",
                id:         undefined,
                name:       "unknown",
                residents:  [],
                type:       "",
                url:        ""
            });
        })
        .then((originData) => {
            character.origin.type = originData.type;
            character.origin.dimension = originData.dimension;

            return character;
        })
        .catch((reject) => console.error("Error while extracting character origin data (getCharacterOriginData) => " + reject));
    }
};

const getCharacterFirstLastEpisodesData = (character) => {
    const EPISODE_ENDPOINT_URL = new URL("https://rickandmortyapi.com/api/episode");
    const characterFirstLastEpisodeId = getCharacterFirstLastEpisode(character.episode);

    return apiExtraction(new URL(EPISODE_ENDPOINT_URL.href + "/" + characterFirstLastEpisodeId))
    .then((episodesData) => {
        character.episodes = new Array();

        for(const episodeData of episodesData){
            character.episodes.push({
                episode:    episodeData.episode,
                name:       episodeData.name
            });
        }

        if(character.episode.length === 1){
            character.episodes.push(character.episodes[0]);
        }

        return character;
    })
    .catch((reject) => console.error("Error while extracting character first-last episode data (getCharacterFirstLastEpisodesData) => " + reject));
};

const getEpisodeId = (url) => url.substring(Number.parseInt(url.lastIndexOf("/") + 1), Number.parseInt(url.length));

const getCharacterFirstLastEpisode = (episodesUrls) => {
    let characterFirstLastEpisode = "";

    characterFirstLastEpisode += Number.parseInt(getEpisodeId(episodesUrls[0]));
    characterFirstLastEpisode += ",";
    characterFirstLastEpisode += Number.parseInt(getEpisodeId(episodesUrls[episodesUrls.length-1]));

    return characterFirstLastEpisode;
}

export { CHARACTER_ENDPOINT_URL, apiExtraction, getCharacterPages, buildCharacterList, getCharacterOriginData, getCharacterFirstLastEpisodesData };