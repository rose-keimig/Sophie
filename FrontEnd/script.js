let allProjects = [];

// fetch and dsiplay projects
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((projects) => {
        console.log("Projects:", projects);
        allProjects = projects;
        displayProjects(projects);
    })
    .catch((error) => {
        console.error("Error fetching projects:", error);
    });

// fetch and display categories
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        console.log("Categories:", categories);
        displayCategories(categories);
    })
    .catch((error) => {
        console.error("Error fetching categories:", error);
    });

// display projects
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Clear out existing content

    projects.forEach((project) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// display categories
function displayCategories(categories) {
    const menu = document.querySelector(".categories-filter");
    menu.innerHTML = ""; // Clear out existing content
    
    // Create "All" button
    const allButton = document.createElement("button");
    allButton.innerText = "All";
    allButton.classList.add("active");
    allButton.addEventListener("click", () => {
        displayProjects(allProjects);
        setActiveButton(allButton);
    });
    menu.appendChild(allButton);

    // Create buttons for each category
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.innerText = category.name;
        button.addEventListener("click", () => {
            const filtered = allProjects.filter(
                (project) => project.categoryId === category.id
            );
            displayProjects(filtered);
            setActiveButton(button);
        });
        menu.appendChild(button);
    });
}

// switches active class for category buttons
function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll(".categories-filter button");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    activeButton.classList.add("active");
}