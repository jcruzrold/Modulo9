import * as DataBusiness from "./data-business";

const createCharacterRow = (character) => {
    const element = document.createElement("div");
    const avatar = createAvatar(character);
    element.appendChild(avatar);
    const link = createRowText(character);
    element.appendChild(link);
    element.className = "character-row";
    return element;
};

const createAvatar = (character) => {
    const element = document.createElement("img");
    element.width = 150;
    element.className = "thumbnail";
    element.src = character.image;
    return element;
};

const createRowText = (character) => {
    const element = document.createElement("span");
    element.append(character.name);
    return element;
};

const showCharacter = (character) => {
    const characterDetail = document.getElementById("character-detail");
    characterDetail.replaceChildren("Loading...");

    DataBusiness.getCharacterOriginData(character)
    .then(DataBusiness.getCharacterFirstLastEpisodesData)
    .catch((reject) => console.error("Error while extracting character first-last episode data (showCharacter) => " + reject))
    .then((character) => {
        characterDetail.replaceChildren(createAvatarDetail(character));
        characterDetail.appendChild(createParagraph("Name: " + character.name));
        characterDetail.appendChild(createParagraph("Status: " + character.status));
        characterDetail.appendChild(createParagraph("Species: " + character.species));
        characterDetail.appendChild(createParagraph("Origin "));
        characterDetail.appendChild(createParagraph("Name: " + character.origin.name,"indented-text"));
        characterDetail.appendChild(createParagraph("Type: " + character.origin.type,"indented-text"));
        characterDetail.appendChild(createParagraph("Dimension: " + character.origin.dimension,"indented-text"));
        characterDetail.appendChild(createParagraph("First appearance "));
        characterDetail.appendChild(createParagraph("Episode: " + character.episodes[0].episode,"indented-text"));
        characterDetail.appendChild(createParagraph("Name: " + character.episodes[0].name,"indented-text"));
        characterDetail.appendChild(createParagraph("Last appearance "));
        characterDetail.appendChild(createParagraph("Episode: " + character.episodes[1].episode,"indented-text"));
        characterDetail.appendChild(createParagraph("Name: " + character.episodes[1].name,"indented-text"));
    })
    .catch((reject) => console.error("Error while building character detail (showCharacter) => " + reject));
};

const createAvatarDetail = (character) => {
    const element = document.createElement("img");
    element.width = 350;
    element.src = character.image;
    return element;
};

const createParagraph = (text,className) => {
    const element = document.createElement("p");
    element.append(text);
    if(className !== undefined){
        element.className = className;
    }
    return element;
};

export { createCharacterRow, showCharacter };