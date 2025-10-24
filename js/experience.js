window.renderExperience = function(experiences) {
    const $container = $('#experience-container');
    $container.find('.timeline-container').remove(); // Clear previous entries except the line

    experiences.forEach((exp, index) => {
        const wowDelay = (index * 0.2).toFixed(1);

        const expHtml = `
            <div data-wow-delay="${wowDelay}s" class="timeline-container wow fadeInUp">
                <div class="content">
                    <span class="time">${exp.duration}</span>
                    <h3 class="title">${exp.title} - <em>${exp.company}</em></h3>
                    <ul>
                        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                    ${exp.tech ? `<p><strong>Technologies:</strong> ${exp.tech}</p>` : ''}
                </div>
            </div>
        `;

        $container.find('.line').before(expHtml);
    });
};