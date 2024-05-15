import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    interweaver,
    kittycasino,
    threejs,
    lovetodeath,
} from "../assets";

export const navLinks = [
    {
        id: "projects",
        title: "Games",
    },
    {
        id: "work",
        title: "Experience",
    },
    {
        id: "about",
        title: "About",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Creative Director",
        icon: web,
    },
    {
        title: "Gameplay Programmer",
        icon: mobile,
    },
    {
        title: "Technical Artist",
        icon: backend,
    },
    {
        title: "Technical Designer",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Creative Director, Gameplay Programmer, Lead Technical Artist",
        company_name: "Aurora Interactive",
        icon: starbucks,
        iconBg: "#383E56",
        date: "September 2023 - May 2024",
        points: [
            "Proposed and spearheaded the development of my senior capstone project, assembled a leadership team, and led a team of 14 students from a variety of disciplines to develop the title in 35 weeks, on-time and within budget.",
            "Reduced designer workload by 30% by streamlining all gameplay systems with custom tools and functions.",
            "Orchestrated the visual direction as the sole technical artist, crafted intricate VFX, particle systems, and shaders to elevate gameplay immersion and effectively communicate gameplay mechanics.",
            "<need one more>",
        ],
    },
    {
        title: "Lead Gameplay Programmer, Project Manager",
        company_name: "Vault Studios",
        icon: tesla,
        iconBg: "#E6DEDD",
        date: "January 2023 - May 2024",
        points: [
            "Founded and led a game development studio that successfully developed and released 3 games on Itch.io.",
            "<bullet>",
            "<bullet>",
            "<bullet>",
        ],
    },
    {
        title: "Full-Stack Game Developer",
        company_name: "University of Central Florida",
        icon: shopify,
        iconBg: "#383E56",
        date: "January 2023 - December 2023",
        points: [
            "Designed and programmed a game using geospatial data in collaboration with UCF professor using Unreal Engine and C++, resulting in highly realistic character behavior and dynamic gameplay experiences that received a 9.5/10 rating from UCF panelists.",
            "<bullet>",
            "<bullet>",
        ],
    },
    {
        title: "Game Design Instructor",
        company_name: "iDTech",
        icon: meta,
        iconBg: "#E6DEDD",
        date: "October 2020 - August 2021",
        points: [
            "Taught classes on Game Development in Unity, C#, C++, coding Minecraft plugins in Java, Adobe Photoshop and Illustrator, advanced math, physics, and more.",
            "Observed student learning and guided them through 2D and 3D game design software, taking students with little to no technical experience to creating fully playable games of their own in an average of 5 weeks.",
            "Improved learning outcomes of my students by customizing generic training material to skill-level appropriate content.",
        ],
    },
    {
        title: "Junior Gameplay Engineer, User Researcher, Playtester",
        company_name: "Microsoft",
        icon: meta,
        iconBg: "#E6DEDD",
        date: "August 2018 - August 2021",
        points: [
            "Developed innovative gameplay mechanics, matchmaking, and network-based multiplayer systems.",
            "Performed pre-release compatibility testing, debugged test cases, gameplay functionality by finding, reproducing, documenting bugs, and verifying fixes.",
            "Tested new entities, maps, items, and gameplay modes to ensure playability and gameplay balance.",
        ],
    },
];

const projects = [
    {
        name: "Interweaver",
        description:
            "<description here>",
        image: interweaver,
        source_code_link: "https://github.com/",
    },
    {
        name: "Kitty Casino",
        description:
            "<description here>",
        image: kittycasino,
        source_code_link: "https://github.com/",
    },
    {
        name: "Love to Death",
        description:
            "<description here>",
        image: lovetodeath,
        source_code_link: "https://github.com/",
    },
];

export { services, technologies, experiences, projects };