const skillColors = [
    "#DD1E2F",
    "#970cc1",
    "#EBB035",
    "#55a69f",
    "#06A2CB",
    "#218559",
    "#192823"
];

window.renderSkills = function(skills) {
    const $container = $('#skills-container');
    $container.empty();

    skills.forEach((skill, index) => {
        const color = skillColors[index % skillColors.length];

        const skillBarHtml = `
            <div class="skillBar clearfix" data-percent="100%">
                <div class="skillBar-title" style="background: ${color};"><span>${skill}</span></div>
                <div class="skillBar-bar"></div>
                <div class="skill-bar-percent"></div>
            </div>
        `;
        $container.append(skillBarHtml);
    });

    // Animate skill bars
    $('.skillBar').each(function() {
        $(this).find('.skillBar-bar').animate({
            width: $(this).attr('data-percent')
        }, 3000);
    });
};
