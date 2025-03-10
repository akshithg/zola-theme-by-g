//===== lights on/off
// set body class
function setBodyElements(mode) {
    document.documentElement.dataset.theme = mode;
    if (mode === "dark") {
        document.querySelector("#action-toggle-icon").innerHTML = "👓";
    } else {
        document.querySelector("#action-toggle-icon").innerHTML = "🕶️";
    }
}
// set local storage
function setLocalStorage(mode) {
    localStorage.setItem("theme", mode);
}
// set theme
function setTheme(mode) {
    setLocalStorage(mode);
    setBodyElements(mode);
    setImageTheme(mode);
}
// toggle theme
function toggleTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}
// toggler
document.querySelector("#action-toggle").addEventListener("click", toggleTheme);
// set theme on load
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);


//===== Zola footnote bug fix
// from - https://github.com/getzola/zola/issues/1070#issuecomment-1166637092
// The DOMContentLoaded event fires when the initial HTML
// document has been completely loaded and parsed, without
// waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener("DOMContentLoaded", (_event) => {
    const references = document.getElementsByClassName("footnote-reference");
    // For each footnote reference, set an id so we can refer to it from the definition.
    // If the definition had an id of 'some_id', then the reference has id `some_id_ref`.
    for (const reference of references) {
        const link = reference.firstChild;
        const id = link.getAttribute("href").slice(1); // skip the '#'
        link.setAttribute("id", `${id}_ref`);
    }

    const footnotes = document.getElementsByClassName("footnote-definition");
    // For each footnote-definition, add an anchor element with an href to its corresponding reference.
    // The text used for the added anchor is 'Leftwards Arrow with Hook' (U+21A9).
    for (const footnote of footnotes) {
        const id = footnote.getAttribute("id");
        const backReference = document.createElement("a");
        backReference.setAttribute("href", `#${id}_ref`);
        backReference.setAttribute("class", "footnote-backref");
        backReference.textContent = "↩";
        footnote.append(backReference);
    }
});
