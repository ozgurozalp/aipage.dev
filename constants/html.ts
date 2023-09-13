import {
  Blog,
  FAQ,
  Features,
  FeaturesFeature,
  Footer,
  Header,
  Hero,
  IndividualFeatures,
  IndividualFeaturesFeature,
  Member,
  Post,
  Question,
  Team,
  Testimonial,
  Testimonials,
} from "@/types";
import { prompts } from "@/constants/prompts";

export const html = `<!doctype html>
<html lang="en">
  <head>
    <title>Landing page</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
      header.menu:not(:has(.menu-item:nth-child(1))), 
      section.hero:not(:has(.hero-item:nth-child(1))),
      section.blogs:not(:has(.blog-item:nth-child(1))),
      section.features:not(:has(.feature-item:nth-child(1))),
      section.team:not(:has(.team-item:nth-child(1))),
      section.faq:not(:has(.faq-item:nth-child(1))),
      section.individual-features:not(:has(.individual-feature-item:nth-child(1))),
      section.testimonials:not(:has(.testimonial-item:nth-child(1))),
      footer.footer:not(:has(.social-link-item:nth-child(1))) {
        display: none;
      }
    </style>
  </head>
  <body>
    <header class="menu">
      <nav
        class="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800"
      >
        <div
          class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
        >
          <a href="#" class="flex items-center">
            <span
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
              >LOGO</span
            >
          </a>
          <div class="flex lg:hidden items-center lg:order-2">
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul
              class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
            >
            <!--MENU_START-->
            <!--MENU_END-->
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <section class="hero bg-white dark:bg-gray-900">
      <!--HERO_START-->
      <!--HERO_END-->
    </section>

    <section class="features bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2
            class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white"
          >
            Features
          </h2>
        </div>
        <div
          class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
        >
          <!--FEATURES_START-->
          <!--FEATURES_END-->
        </div>
      </div>
    </section>

    <section class="individual-features bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="space-y-6">
          <div class="space-y-6">
            <!--INDIVIDUAL_FEATURES_START-->
            <!--INDIVIDUAL_FEATURES_END-->
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2
          class="mb-8 text-4xl text-center font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Testimonials
        </h2>
        <div class="grid grid-cols-2 gap-6">
          <!--TESTIMONIALS_START-->
          <!--TESTIMONIALS_END-->
        </div>
      </div>
    </section>

    <section class="blogs bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2
          class="mb-8 text-4xl text-center font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Recent Blog Posts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <!--BLOG_POSTS_START-->
          <!--BLOG_POSTS_END-->
        </div>
      </div>
    </section>

    <section class="team bg-gray-50 dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2
          class="mb-8 text-4xl text-center font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Our Team
        </h2>
        <div class="grid grid-cols-3 gap-6">
           <!--TEAM_START-->
           <!--TEAM_END-->
        </div>
      </div>
    </section>

    <section class="faq bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <h2
          class="mb-8 text-4xl text-center font-extrabold leading-tight text-gray-900 dark:text-white"
        >
          Frequently asked questions
        </h2>
        <div>
          <div class="space-y-6">
          <!--FAQS_START-->
          <!--FAQS_END-->
          </div>
        </div>
      </div>
    </section>

    <footer class="footer p-4 bg-gray-50 sm:p-6 dark:bg-gray-900">
      <div class="mx-auto max-w-screen-xl">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="#" class="flex items-center">
              <span
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                >LOGO</span
              >
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Resources
              </h2>
              <ul class="text-gray-600 dark:text-gray-400">
                <li class="mb-4">
                  <a href="https://aipage.dev" class="hover:underline">AIPage.dev</a>
                </li>
                <li>
                  <a href="#" class="hover:underline">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Follow us
              </h2>
              <ul class="text-gray-600 dark:text-gray-400">
                <li class="mb-4">
                  <a href="#" class="hover:underline">Github</a>
                </li>
                <li>
                  <a href="#" class="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Legal
              </h2>
              <ul class="text-gray-600 dark:text-gray-400">
                <li class="mb-4">
                  <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
            >© 2023 <a href="#" class="hover:underline">Your website</a>. All
            Rights Reserved.
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <!--SOCIAL_START-->
            <!--SOCIAL_END-->
          </div>
        </div>
      </div>
    </footer>
    <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
  </body>
</html>
`;

export function replaceMenu(html: string, { header }: { header: Header }) {
  const template = (text: string) =>
    `<li class="menu-item"><a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">${text}</a></li>`;

  const menu = header?.navigationMenuItems
    ?.filter(Boolean)
    ?.map((menu) => template(menu))
    ?.join("");

  return replaceBetween(
    html,
    "<!--MENU_START-->",
    "<!--MENU_END-->",
    menu ?? "",
  );
}

export function replaceFooter(html: string, { footer }: { footer: Footer }) {
  const socialIconMap: Record<string, string> = {
    Facebook: '<i class="fa-brands fa-facebook"></i>',
    Twitter: '<i class="fa-brands fa-twitter"></i>',
    Instagram: '<i class="fa-brands fa-instagram"></i>',
    LinkedIn: '<i class="fa-brands fa-linkedin"></i>',
    YouTube: '<i class="fa-brands fa-youtube"></i>',
  };
  const template = (icon: string) =>
    `<a href="#" class="social-link-item text-gray-500 hover:text-gray-900 dark:hover:text-white">${icon}</a>`;

  const links = footer?.socialMediaLinks
    ?.filter(Boolean)
    ?.map((link) => template(socialIconMap[link]))
    ?.join("");

  return replaceBetween(
    html,
    "<!--SOCIAL_START-->",
    "<!--SOCIAL_END-->",
    links ?? "",
  );
}

export function replaceFeatures(
  html: string,
  { features }: { features: Features },
) {
  const template = (title: string, description: string) => `<div>
            <div
              class="feature-item flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900"
            >
              <svg
                class="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                ></path>
              </svg>
            </div>
            <h3 class="mb-2 text-xl font-bold dark:text-white">
              ${title}
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              ${description}
            </p>
          </div>`;
  const content = Object.entries(features ?? {})
    ?.filter(([, feature]) => feature.title && feature.description)
    ?.map(([, feature]: [string, FeaturesFeature]) => {
      return template(feature.title, feature.description);
    })
    .join("");

  return replaceBetween(
    html,
    "<!--FEATURES_START-->",
    "<!--FEATURES_END-->",
    content ?? "",
  );
}

export function replaceIndividualFeatures(
  html: string,
  { individualFeatures }: { individualFeatures: IndividualFeatures },
) {
  const template = (
    title: string,
    description: string,
    cta: string,
  ) => `<div class="individual-feature-item flex odd:flex-row-reverse [&>*]:flex-1 gap-8">
              <div>
              <img
                src="https://source.unsplash.com/featured/1280x720/?${title}"
                class="rounded-lg"
                alt=""
              />
            </div>
              <div class="flex flex-col justify-center gap-y-4">
              <h3 class="text-3xl font-semibold text-gray-900 dark:text-white">
                ${title}
              </h3>
              <p class="text-gray-900 dark:text-white">
                ${description}
              </p>
              <a
                href="#"
                class="self-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >${cta}</a
              >
            </div>
            </div>`;

  const content = Object.entries(individualFeatures ?? {})
    ?.filter(
      ([, feature]) => feature.title && feature.description && feature.cta,
    )
    ?.map(([, feature]: [string, IndividualFeaturesFeature]) => {
      return template(feature.title, feature.description, feature.cta);
    })
    .join("");

  return replaceBetween(
    html,
    "<!--INDIVIDUAL_FEATURES_START-->",
    "<!--INDIVIDUAL_FEATURES_END-->",
    content ?? "",
  );
}

export function replaceFaqs(html: string, { faq }: { faq: FAQ }) {
  const template = (question: string, answer: string) => `<div>
              <div
                class="faq-item text-gray-900 dark:text-white text-lg leading-6 font-medium"
              >
                ${question}
              </div>
              <div class="mt-2 text-base text-gray-900 dark:text-white/60">
                ${answer}
              </div>
            </div>`;

  const content = Object.entries(faq ?? {})
    ?.filter(([, f]) => f.question && f.answer)
    ?.map(([, f]: [string, Question]) => {
      return template(f.question, f.answer);
    })
    .join("");

  return replaceBetween(
    html,
    "<!--FAQS_START-->",
    "<!--FAQS_END-->",
    content ?? "",
  );
}

export function replaceTestimonials(
  html: string,
  { testimonials }: { testimonials: Testimonials },
) {
  const template = (
    feedback: string,
    name: string,
    role: string,
  ) => `<div class="testimonial-item bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400 rounded-lg p-8">
            <p>
              ${feedback}
            </p>
            <div class="mt-4">
              <h4 class="text-lg font-semibold text-gray-600 dark:text-gray-300">${name}</h4>
              <p class="text-sm">${role}</p>
            </div>
          </div>`;
  const content = Object.entries(testimonials ?? {})
    ?.filter(
      ([, testimonial]) =>
        testimonial.feedback && testimonial.name && testimonial.role,
    )
    ?.map(([, testimonial]: [string, Testimonial]) =>
      template(testimonial.feedback, testimonial.name, testimonial.role),
    )
    .join("");

  return replaceBetween(
    html,
    "<!--TESTIMONIALS_START-->",
    "<!--TESTIMONIALS_END-->",
    content ?? "",
  );
}

export function replaceBlog(html: string, { blog }: { blog: Blog }) {
  const template = (
    title: string,
    description: string,
  ) => `<div class="blog-item">
            <h4 class="text-lg text-gray-900 dark:text-white font-semibold mb-2">${title}</h4>
            <p class="text-gray-800 dark:text-white/90">
                ${description}
            </p>
            <a href="#" class="mt-2 block text-blue-500 hover:underline">Read More</a>
          </div>`;

  const content = Object.entries(blog ?? {})
    ?.filter(([, post]) => post.title && post.shortDescription)
    ?.map(([, post]: [string, Post]) =>
      template(post.title, post.shortDescription),
    )
    .join("");

  return replaceBetween(
    html,
    "<!--BLOG_POSTS_START-->",
    "<!--BLOG_POSTS_END-->",
    content ?? "",
  );
}

export function replaceTeam(html: string, { team }: { team: Team }) {
  const template = (
    name: string,
    role: string,
  ) => `<div class="team-item bg-gray-50 text-gray-600 space-y-2 dark:bg-gray-800 dark:text-gray-400 rounded-lg p-8">
            <div class="flex justify-center">
              <img alt="{{TEAM_MEMBER_1_NAME}}" class="object-cover aspect-square w-[250px] rounded-full" src="https://source.unsplash.com/featured/1280x720/?face&name=${name}">
            </div>
            <div class="text-center space-y-2">
              <p class="text-gray-900 font-bold dark:text-white">
                ${name}
              </p>
              <span class="text-gray-800 dark:text-white/90">
                ${role}
              </span>
            </div>
          </div>`;

  const content = Object.entries(team ?? {})
    ?.filter(([, team]) => team.name && team.role)
    ?.map(([, team]: [string, Member]) => template(team.name, team.role))
    .join("");

  return replaceBetween(
    html,
    "<!--TEAM_START-->",
    "<!--TEAM_END-->",
    content ?? "",
  );
}

export function replaceHero(html: string, { hero }: { hero: Hero }) {
  const template = (data: {
    title: string;
    description: string;
    cta: string;
    jumbotron?: string;
  }) => `
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="hero-item mr-auto place-self-center lg:col-span-7">
          <h1
            class="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white"
          >
            ${data?.title ?? ""}
          </h1>
          <p
            class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            ${data?.description ?? ""}
          </p>
          <a
            href="#"
            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            ${data?.cta ?? ""}
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
      ${
        data?.jumbotron
          ? `<div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <h2
          class="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl"
        >
          ${data?.jumbotron}
        </h2>
      </div>`
          : ""
      }
  `;

  let content = "";
  if (
    Object.keys(hero ?? {})?.every((key) =>
      ["title", "description", "cta", "jumbotron"].includes(key),
    )
  ) {
    content = template(hero);
  }

  return replaceBetween(
    html,
    "<!--HERO_START-->",
    "<!--HERO_END-->",
    content ?? "",
  );
}

export function replaceBetween(
  text: string,
  start: string,
  end: string,
  textToReplace: string,
) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    return text;
  }

  const old = text.substring(startIndex + start.length, endIndex);
  const newText = start + old + end;

  return text.replace(newText, start + textToReplace + end);
}
