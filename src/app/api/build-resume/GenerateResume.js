export const GenerateResume = (resume) => {

    const experiences = resume?.experiences?.map((ex, index)=>{
        return `
        <div>
            <div>
                <h2>${ex?.company}</h2>
                <h4>${ex?.position}</h4>
                <p style="display: flex;justify-content: space-between;align-items: center;"><span>${ex?.duration}</span> <span>${ex?.address}</span></p>
                <ul>${paragraphToBulletPoints(ex?.description)}</ul>
            </div>
        </div>
        `
    }).join('');
    const educations = resume?.educations?.map((edu, index)=>{
        return `
        <div>
            <div>
                <h2><strong>${edu?.course}</strong></h2>
                <p style="display: flex;justify-content: space-between;align-items: center;"><span>${edu?.college}</span> <span>${edu?.address}</span></p>
                <p>${edu?.duration}</p>
            </div>
        </div>
        `
    }).join('');
    return `
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Builder</title>
</head>
<style>
    .profile_name {
        margin-bottom: 10px;
    }

    .profile_position {
        margin-top: 0px;
        margin-bottom: 10px;
        color: gray;
    }

    .personal_area {
        margin-top: 1px solid #000;
        border-top: 2px solid;
        margin-top: 20px;
        border-bottom: 2px solid;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
.skill_list {
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}

.skill_list li {
    border: 1px solid;
    padding: 10px;
    border-radius: 12px;
    text-align: center;
}
</style>

<body>
    <section class="resume_section">
        <div>
            <div class="profile_area">
                <h2 class="profile_name">${resume?.name}</h2>
                <h4 class="profile_position">${resume?.position}</h4>
                <summary class="profile_summary">${resume?.profileSummary}</summary>
            </div>
        </div>
        <div>
            <div class="personal_area">
                <p class="personal_info">${resume?.phone}</p>
                <p class="personal_info"> <a href=${`mailto:${resume?.email}`} target="_blank" rel="noopener noreferrer">${resume?.email}</a></p>
                <p class="personal_info"><a href=${resume?.linkedin} target="_blank" rel="noopener noreferrer">${resume?.linkedin}</a></p>
                <p class="personal_info">${resume?.address}</p>
            </div>
        </div>
    </section>
    <section>
        <div>
            <div class="experience_area">
                <h3>WORK EXPERIENCE</h3>
                ${experiences}
            </div>
        </div>
    </section>
        <section>
        <div>
            <div class="experience_area">
                <h3>EDUCATION</h3>
                ${educations}
            </div>
        </div>
    </section>
        <section>
        <div>
            <div class="experience_area">
                <h3>SKILLS</h3>
                <ul class="skill_list">${getSkills(resume?.skills)}</ul>
            </div>
        </div>
    </section>
</body>

</html>
    `
}


export const paragraphToBulletPoints = (paragraph)=>{
    const sentences = paragraph.split(/\.\s*/).filter(Boolean);
    return sentences.map(sentence => `<li>${sentence}</li>`).join('');
}

export const getSkills = (skills)=>{
    const filteredSkills = skills.split(",");
    return filteredSkills.map(skill => `<li>${skill}</li>`).join('');
}