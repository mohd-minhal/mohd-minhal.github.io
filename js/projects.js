window.renderProjects = function (projects) {
    const $container = $('#projects-container');
    $container.empty();

    const accentColors = ['#667eea', '#f5576c', '#00f2fe', '#38f9d7', '#fee140', '#330867'];

    // Generate filter buttons dynamically
    generateFilterButtons(projects);

    projects.forEach((project, index) => {
        const categoryClasses = project.tags ? project.tags.join(' ') : 'everything';
        const colorIndex = index % accentColors.length;
        const accentColor = accentColors[colorIndex];

        const projectHtml = `
    <div class="col-md-4 col-sm-6 project-item ${categoryClasses}"
         data-tags="${project.tags ? project.tags.join(' ') : 'everything'}">
        <a href="${project.url}" target="_blank" class="project-link" title="${project.tech}">
            <div class="project-card rounded shadow-dark" style="border-left: 4px solid ${accentColor}">
                <div class="project-thumb">
                    <div class="project-mask"></div>
                    <div class="project-details">
                        <span class="project-tags" style="background: ${accentColor}">${project.tech}</span>
                        <h2 class="project-title">${project.title}</h2>
                        <ul class="project-description">
                        ${project.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                        <span class="project-more" style="background: ${accentColor}">
                            <i class='bx bx-link-external'></i>
                        </span>
                    </div>
                    <div class="project-icon-overlay">
                    </div>
                </div>
            </div>
        </a>
    </div>
`;

        $container.append(projectHtml);
    });

    initProjectFilter();
};

function generateFilterButtons(projects) {
    const $filterContainer = $('.portfolio-filter');
    const $mobileSelect = $('.portfolio-filter-mobile');

    // Collect all unique tags
    const allTags = new Set();
    projects.forEach(project => {
        if (project.tags && Array.isArray(project.tags)) {
            project.tags.forEach(tag => allTags.add(tag));
        }
    });

    // Clear existing buttons and options
    $filterContainer.empty();
    $mobileSelect.empty();

    // Add "Everything" button and option
    $filterContainer.append(`<li class="list-inline-item current" data-filter="*">Everything</li>`);
    $mobileSelect.append(`<option value="*">Everything</option>`);

    // Add button and option for each unique tag
    const sortedTags = Array.from(allTags).sort();
    sortedTags.forEach(tag => {
        const displayName = tag.charAt(0).toUpperCase() + tag.slice(1);
        $filterContainer.append(`
            <li class="list-inline-item" data-filter="${tag}">${displayName}</li>
        `);
        $mobileSelect.append(`
            <option value="${tag}">${displayName}</option>
        `);
    });
}

function initProjectFilter() {
    const $filterButtons = $('.portfolio-filter');
    const $mobileSelect = $('.portfolio-filter-mobile');
    const $projectItems = $('.project-item');

    // Shared filtering function
    function filterProjects(filterValue) {
        if (filterValue === '*' || filterValue === 'all') {
            $projectItems.fadeIn(300);
        } else {
            $projectItems.each(function() {
                const tags = $(this).attr('data-tags') || '';
                if (tags.includes(filterValue)) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    }

    // Handle desktop clicks
    $filterButtons.on('click', 'li', function() {
        const filterValue = $(this).attr('data-filter');

        // Update active state
        $filterButtons.find('li').removeClass('current');
        $(this).addClass('current');

        // Sync mobile dropdown
        $mobileSelect.val(filterValue);

        // Filter projects
        filterProjects(filterValue);
    });

    // Handle mobile dropdown change
    $mobileSelect.on('change', function() {
        const filterValue = $(this).val();

        // Update active state on desktop buttons
        $filterButtons.find('li').removeClass('current');
        $filterButtons.find(`li[data-filter="${filterValue}"]`).addClass('current');

        // Filter projects
        filterProjects(filterValue);
    });
}
