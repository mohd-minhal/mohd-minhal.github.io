document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle if it’s an in-page anchor
            if (href.length > 1 && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    // Sections must match the tooltips order
    const sectionIds = ["home", "about", "skills", "experience", "education", "works", "contact"];

    const menuLinks = document.querySelectorAll(".vertical-menu .nav-link");

    // ---- CLICK SCROLLING ----
    menuLinks.forEach((link, index) => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const section = document.getElementById(sectionIds[index]);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            // Update active link manually
            document.querySelector(".nav-link.active")?.classList.remove("active");
            link.classList.add("active");
        });
    });

    // ---- SCROLLSPY ----
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleId = entry.target.id;
                document.querySelector(".nav-link.active")?.classList.remove("active");
                const index = sectionIds.indexOf(visibleId);
                if (index !== -1) {
                    menuLinks[index].classList.add("active");
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe each section
    sectionIds.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) observer.observe(sec);
    });
});


let toast = new Toast()
let loader = new Loader()
let form = document.querySelector("#contact-form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    loader.show()
    let formData = new FormData(e.target)
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = formData.get('subject');

    const body = {
        name, email, message, subject
    }
    let hasError = false
    Object.keys(body).forEach(key => {
        if (body[key].toString().trim() === "") {
            loader.hide()
            toast.error(`${key} should not be empty`)
            hasError = true
        }
    })

    if (hasError) return
    let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    let data = await res.json()
    loader.hide()
    if (data.type === "error") {
        toast.error(data.error, 'Email not sent')
        return
    }
    if (data.type === "info") {
        toast.warning(data.message, 'Email not delivered')
        return
    }
    toast.success('Mail Sent, please wait for response', data.success)
})
