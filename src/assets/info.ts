export interface media {
  imgSrc: string;
  altText: string;
  url: string;
  title: string;
  meta: string;
  description: string;
  lang: string[];
}

export const infos = [
  {
    headline: "message.info.section1.headline",
    introduction: "message.info.section1.introduction",
    media: [],
  },
  {
    headline: "message.info.section2.headline",
    introduction: "message.info.section2.introduction",
    media: [
      {
        imgSrc: "dominion.jpg",
        altText: "Dominion Cover",
        url: "https://an3x.org/dominion",
        title: "message.info.section2.media.title1",
        meta: "YouTube (2:00:00)",
        description: "message.info.section2.media.description1",
        lang: ["en", "de"],
      },
      {
        imgSrc: "earthlings.jpg",
        altText: "Earthlings Cover",
        url: "https://an3x.org/earthlings",
        title: "message.info.section2.media.title2",
        meta: "YouTube, 1:35:46",
        description: "message.info.section2.media.description2",
        lang: ["en", "de"],
      },
      {
        imgSrc: "systemmilch.jpg",
        altText: "Das System Milch Cover",
        url: "https://www.netflix.com/watch/80234791",
        title: "message.info.section2.media.title3",
        meta: "Netflix, 1:30:54",
        description: "message.info.section2.media.description3",
        lang: ["en", "de"],
      },
      {
        imgSrc: "blackfish.jpg",
        altText: "Blackfish Cover",
        url: "https://www.netflix.com/watch/70267802",
        title: "message.info.section2.media.title4",
        meta: "Netflix, 1:19:34",
        description: "message.info.section2.media.description4",
        lang: ["en", "de"],
      },
      {
        imgSrc: "tiereessen.png",
        altText: "Tiere Essen Cover",
        url: "https://www.youtube.com/watch?v=QBBY04zTaXI",
        title: "message.info.section2.media.title5",
        meta: "YouTube, 0:02:29",
        description: "message.info.section2.media.description5",
        lang: ["de"],
      },
      {
        imgSrc: "milk.png",
        altText: "MILK Cover",
        url: "https://www.youtube.com/watch?v=zX8BLGDNyxc",
        title: "message.info.section2.media.title6",
        meta: "YouTube, 0:04:29",
        description: "message.info.section2.media.description6",
        lang: ["en", "de"],
      },
      {
        imgSrc: "bioland.png",
        altText: "Bioland Cover",
        url: "https://vimeo.com/227801403",
        title: "message.info.section2.media.title7",
        meta: "Vimeo, 0:05:31",
        description: "message.info.section2.media.description7",
        lang: ["de"],
      },
    ] as media[],
  },
  {
    headline: "message.info.section3.headline",
    introduction: "message.info.section3.introduction",
    media: [
      {
        imgSrc: "seaspiracy.jpg",
        altText: "Seaspiracy Cover",
        url: "https://www.netflix.com/watch/81014008",
        title: "message.info.section3.media.title1",
        meta: "Netflix, 01:30:00",
        description: "message.info.section3.media.description1",
        lang: ["en", "de"],
      },
      {
        imgSrc: "cowspiracy.jpg",
        altText: "Cowspiracy Cover",
        url: "https://www.netflix.com/watch/80033772",
        title: "message.info.section3.media.title2",
        meta: "Netflix, 1:26:00",
        description: "message.info.section3.media.description2",
        lang: ["en", "de"],
      },
      {
        imgSrc: "endofmeat.jpg",
        altText: "The End of Meat Cover",
        url: "https://www.theendofmeat.com/",
        title: "message.info.section3.media.title3",
        meta: "1:34:00",
        description: "message.info.section3.media.description3",
        lang: ["en", "de"],
      },
      {
        imgSrc: "milked.jpg",
        altText: "Milked Cover",
        url: "https://www.youtube.com/watch?v=MCwpsMtmMhM",
        title: "message.info.section3.media.title4",
        meta: "YouTube, 1:30:00",
        description: "message.info.section3.media.description4",
        lang: ["en", "de"],
      },
      {
        imgSrc: "kurzgesagt.png",
        altText: "Cover",
        url: "https://www.youtube.com/watch?v=8eeYdcCql24",
        title: "message.info.section3.media.title5",
        meta: "YouTube, 0:11:49",
        description: "message.info.section3.media.description5",
        lang: ["de"],
      },
    ] as media[],
  },
  {
    headline: "message.info.section4.headline",
    introduction: "message.info.section4.introduction",
    media: [
      {
        imgSrc: "gamechangers.jpg",
        altText: "The Game Changers Cover",
        url: "https://www.netflix.com/watch/81157840",
        title: "message.info.section4.media.title1",
        meta: "Netflix, 1:57:00",
        description: "message.info.section4.media.description1",
        lang: ["en", "de"],
      },
      {
        imgSrc: "whatthehealth.jpg",
        altText: "What the health Cover",
        url: "https://www.netflix.com/watch/80174177",
        title: "message.info.section4.media.title2",
        meta: "Netflix, 1:37:00",
        description: "message.info.section4.media.description2",
        lang: ["en", "de"],
      },
      {
        imgSrc: "kurzgesagt-milch.png",
        altText: "Die Wahrheit über Milch Cover",
        url: "https://www.youtube.com/watch?v=5IpAsztfBBA",
        title: "message.info.section4.media.title3",
        meta: "YouTube, 0:08:53",
        description: "message.info.section4.media.description3",
        lang: ["de"],
      },
    ] as media[],
  },
  {
    headline: "message.info.section5.headline",
    introduction: "message.info.section5.introduction",
    media: [
      {
        imgSrc: "veganeernährungfüreinsteiger.jpg",
        altText: "Vegane Ernährung für Einsteiger Cover",
        url: "https://www.nikorittenau.com/vegane-ernaehrung-einsteiger/",
        title: "message.info.section5.media.title1",
        description: "message.info.section5.media.description1",
        lang: ["de"],
      },
      {
        imgSrc: "veganklischeeade.jpg",
        altText: "Vegan Klischee, Ade Cover",
        url: "https://www.nikorittenau.com/vegan-klischee-ade/",
        title: "message.info.section5.media.title2",
        description: "message.info.section5.media.description2",
        lang: ["de"],
      },
      {
        imgSrc: "howtonotdie.jpg",
        altText: "How not to die Cover",
        url: "https://nutritionfacts.org/book/how-not-to-die/",
        title: "message.info.section5.media.title3",
        description: "message.info.section5.media.description3",
        lang: ["en", "de"],
      },
      {
        imgSrc: "eatinganimals.jpg",
        altText: "message.info.section5.media.title4",
        url: "",
        title: "message.info.section5.media.title4",
        description: "message.info.section5.media.description4",
        lang: ["en", "de"],
      },
      {
        imgSrc: "lovedogs.jpg",
        altText: "message.info.section5.media.title5",
        url: "https://www.youtube.com/c/EarthlingEdChannel",
        title: "message.info.section5.media.title5",
        description: "message.info.section5.media.description5",
        lang: ["en", "de"],
      },
    ] as media[],
  },
  {
    headline: "message.info.section6.headline",
    introduction: "message.info.section6.introduction",
    type: "profile",
    media: [
      {
        imgSrc: "nikorittenau.jpg",
        altText: "Niko Rittenau",
        url: "https://www.youtube.com/c/NikoRittenau",
        title: "message.info.section6.media.title1",
        description: "message.info.section6.media.description1",
        lang: ["de"],
      },
      {
        imgSrc: "artgenosse.jpg",
        altText: "Der Artgenosse",
        url: "https://www.youtube.com/c/DerArtgenosse",
        title: "message.info.section6.media.title2",
        description: "message.info.section6.media.description2",
        lang: ["de"],
      },
      {
        imgSrc: "earthlingEd.jpg",
        altText: "Earthling Ed",
        url: "https://www.youtube.com/c/EarthlingEdChannel",
        title: "message.info.section6.media.title3",
        description: "message.info.section6.media.description3",
        lang: ["en"],
      },
    ] as media[],
  },
];
