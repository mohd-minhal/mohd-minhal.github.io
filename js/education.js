window.renderEducation = function(educationArr) {
    const $container = $('#education-container');
    $container.empty();

    educationArr.forEach((edu, index) => {
        const wowDelay = (index * 0.2).toFixed(1);

        const eduHtml = `
      <div data-wow-delay="${wowDelay}s" class="timeline-container wow fadeInUp">
        <div class="content">
          <span class="time">${edu.year}</span>
          <h3 class="title">${edu.program}</h3>
          <p>${edu.institution}</p>
        </div>
      </div>
    `;

        $container.append(eduHtml);
    });
};
