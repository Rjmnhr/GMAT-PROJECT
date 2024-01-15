import blogImage1 from "../../icons/gmat-blog-2.jpg";
import blog2Image from "../../icons/blog2-image.jpg"
import blog2Preview from "../../icons/blog2-preview.jpg"
export const BlogContentArr = [
  {
    main: "Strategies for GMAT Success: Transforming Weaknesses into Strengths",
    subMain:
      "Embarking on the challenging journey of GMAT preparation requires more than just showcasing strengths; it involves a strategic approach to convert weaknesses into opportunities. Recognizing and addressing these weaknesses is a crucial step toward achieving success on this standardized test",
    mainImg: blogImage1,
    imgPreview: blogImage1,
    subContent: [
      {
        no: 1,
        content:
          "A holistic strategy involves a nuanced analysis of your profile, aiming not to conceal weaknesses but to understand and strategically present them. The goal is not evasion but proactive growth – turning vulnerabilities into strengths.",
      },
      {
        no: 2,
        content: "So what are your weaknesses? Are you aware of them?",
      },
      {
        no: 3,
        content:
          "You can take our free GMAT diagnostic test and quickly detect your weaknesses.",
      },
      {
        no: 4,
        content:
          "Our proprietary methodology is based on actual adaptive test algorithm and reflects how the actual GMAT works.",
      },
    ],
    footer:
      "Login below and create a profile to test your skills and take your mock GMAT tests",
    footerButton: (
      <a href="/gmat">
        <button className="btn btn-lg btn-primary">Try now</button>
      </a>
    ),
  },
  {
    main: "Building a Strong MBA Resume: What Business Schools Look For",
    subMain:
      "Crafting an effective MBA resume goes beyond listing achievements. Here's what business schools value most:",
    mainImg:
    blog2Image,
    imgPreview:
      blog2Preview,
    subContent: [
      {
        no: 1,
        content:
          "Numbers that Matter: Showcase achievements with tangible results. Numbers speak volumes and demonstrate your impact.",
      },
      {
        no: 2,
        content:
          "Leadership Stories: Highlight experiences where you led or played a key role. Business schools want candidates with leadership potential.",
      },
      {
        no: 3,
        content:
          "Professional Impact: Share your professional journey, emphasizing growth and the positive changes you've made",
      },
      {
        no: 4,
        content:
          "Community Involvement: Mention your community service or extracurricular activities. Business schools appreciate candidates who contribute beyond work",
      },
      {
        no: 5,
        content:
          "Innovative Contributions: Showcase instances where your innovative thinking led to solutions. Business schools seek fresh perspectives.",
      },
      {
        no: 6,
        content:
          "Global Perspective: If relevant, mention experiences that reflect your global exposure. Adaptability is a key trait",
      },
      {
        no: 6,
        content:
          "Clear and Concise Style: Keep it clear and concise. Business schools prefer resumes that are easy to read, focusing on key accomplishments",
      },
    ],
    footer:
      "To try a sample role, simply register and try out our salary tool for free",
    footerButton: (
      <a href="/price-a-job">
        <button className="btn btn-lg btn-primary">Click here</button>
      </a>
    ),
  },
];
