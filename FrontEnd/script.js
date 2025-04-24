fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projects) => {
        console.log("Projects:", projects);
        displayProjects(projects);
    })
    .catch((error) => {
        console.error("Error fetching projects:", error);
    }
);
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Clear out the praceholder projects

    projects.forEach((project) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;

        const figcaption = document.createElement("figcaption");
        CaretPosition.innerText = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}