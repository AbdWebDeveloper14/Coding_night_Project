const postModal = document.getElementById("postModal");
const postingBtn = document.getElementById("postingBtn");
const closeModal = document.getElementById("closeModal");

postingBtn.onclick = () => {
    postModal.style.display = "flex";
};

closeModal.onclick = () => {
    postModal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === postModal) {
        postModal.style.display = "none";
    }
};


let posts = JSON.parse(localStorage.getItem("posts")) || [];
let editId = null;


document.getElementById("createPostBtn").onclick = () => {
    const title = document.getElementById("post_title").value.trim();
    const desc = document.getElementById("post_desc").value.trim();
    const img = document.getElementById("post_img").value.trim();

    if (title === "" || desc === "") {
        alert("Title & Description are required!");
        return;
    }

    if (editId) {
 
        let p = posts.find(x => x.id === editId);
        p.title = title;
        p.desc = desc;
        p.img = img;

        editId = null;
        document.getElementById("createPostBtn").innerText = "Post Now";
    } else {
        const newPost = {
            id: Date.now(),
            title,
            desc,
            img,
            liked: false, 
            time: new Date().toISOString()
        };
        posts.unshift(newPost);
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();

    postModal.style.display = "none";


    document.getElementById("post_title").value = "";
    document.getElementById("post_desc").value = "";
    document.getElementById("post_img").value = "";
};

function displayPosts() {
    const container = document.getElementById("posting_area");
    container.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "postCard";

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.desc}</p>
            ${post.img ? `<img src="${post.img}" alt="Post Image">` : ""}
            <small>${new Date(post.time).toLocaleString()}</small>

            <div class="post_actions">
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                <button onclick="toggleLike(${post.id})">
                    ${post.liked ? "Unlike" : "Like"}
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

displayPosts();


function editPost(id) {
    let p = posts.find(x => x.id === id);

    document.getElementById("post_title").value = p.title;
    document.getElementById("post_desc").value = p.desc;
    document.getElementById("post_img").value = p.img;

    editId = id;
    document.getElementById("createPostBtn").innerText = "Update";

    postModal.style.display = "flex";
}


function deletePost(id) {
    if (!confirm("Delete this post?")) return;

    posts = posts.filter(x => x.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}


function toggleLike(id) {
    let post = posts.find(x => x.id === id);
    post.liked = !post.liked;
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}


document.getElementById("sortSelect").onchange = function () {
    const v = this.value;

    if (v === "latest") {
        posts.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else {
        posts.sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    displayPosts();
};


function searchPosts() {
    let value = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("postCard");

    for (let card of cards) {
        let content = card.innerText.toLowerCase();
        card.style.display = content.includes(value) ? "block" : "none";
    }
}
