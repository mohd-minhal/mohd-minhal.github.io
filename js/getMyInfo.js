const getMyInfo = async () => {
    try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbxauiFQs-E014b8efg_3YwxhoND0M-Rf-Vh9X5ubmRAI1Vw-6L4xIANly1mqRK534qP/exec');
        if (!res.ok) throw new Error('Network response not ok');
        const data = await res.json();
        return data.portfolio;
    } catch (error) {
        console.error('Failed to load JSON:', error);
        return null;
    }
};

getMyInfo().then(portfolio => {
    if (portfolio) {
        const personal = portfolio.personal;
        // Set name and title
        document.querySelector('#my-name').textContent = personal.name;
        document.querySelector('#title').textContent = personal.title;

        // Set social links dynamically
        document.querySelector('#github').href = personal.contact.github;
        document.querySelector('#linkedin').href = personal.contact.linkedin;
        document.querySelector('#codepen').href = personal.contact.codepen;

        // Update image alt attribute with name
        const img = document.querySelector('.my-pic');
        if (img) img.alt = personal.name;

        // About me
        document.querySelector('#bio').textContent = personal.description;

        // Dynamically set the CV download link
        const resumeId = personal.resume_id;
        if (resumeId) {
            const downloadCV = document.querySelector('#download-cv');
            if (downloadCV) {
                // Construct Google Drive direct download link
                const driveLink = `https://drive.google.com/uc?export=download&id=${resumeId}`;
                downloadCV.href = driveLink;
                downloadCV.setAttribute('download', '');
            }
        }
        // Skills
        if (window.renderSkills) {
            window.renderSkills(personal.skills);
        }

        // Render experience dynamically
        if (window.renderExperience && personal.experience) {
            window.renderExperience(personal.experience);
        }

        // render education
        if (window.renderEducation) {
            window.renderEducation(personal.education);
        }

        // Render projects dynamically
        if (window.renderProjects && portfolio.projects) {
            window.renderProjects(portfolio.projects);

            // Update "See More Projects" link dynamically
            const githubLink = personal.contact.github + '?tab=repositories';
            $('#more-projects-btn').attr('href', githubLink);
        }

        // Set contact email dynamically
        const emailEl = document.querySelector('#contact-email');
        if (emailEl && personal.contact.email) {
            emailEl.href = `mailto:${personal.contact.email}`;
        }
    }
});
