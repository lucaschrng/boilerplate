import { ArticleStatus, ArticleVisibility } from '@prisma/client';

export interface SeedData {
  users: SeedUser[];
}

export interface SeedUser {
  articles: {
    content: string;
    status: ArticleStatus;
    title: string;
    visibility: ArticleVisibility;
  }[];
  email: string;
  name: string;
}

export const seedData: SeedData = {
  users: [
    {
      articles: [
        {
          content: 'Charlotte Emma Aitchison, known professionally as Charli xcx, has established herself as one of pop music\'s most innovative forces. Born in Cambridge, England in 1992, she began writing songs at age 14 and gained initial recognition through MySpace. Her breakthrough came with "I Love It" (with Icona Pop) and her feature on Iggy Azalea\'s "Fancy." Known for her futuristic pop sound and collaborations with PC Music producers, Charli has consistently pushed the boundaries of mainstream pop. Albums like "Pop 2" and "how i\'m feeling now" (created during lockdown) showcase her experimental approach and have cemented her status as a visionary artist redefining the pop landscape.',
          status: ArticleStatus.PUBLISHED,
          title: 'Charli xcx: The Future of Pop',
          visibility: ArticleVisibility.PUBLIC,
        },
        {
          content: 'Jane Remover (formerly known as dltzk) represents the cutting edge of bedroom pop and digicore. Emerging from online communities, Jane\'s music blends glitchy electronics, distorted guitars, and vulnerable vocals to create a sound that captures the anxiety and beauty of digital adolescence. Their debut album "frailty" received critical acclaim for its innovative production and raw emotional honesty. Jane\'s work speaks directly to a generation raised online, exploring themes of identity, connection, and alienation in the digital age. Despite their young age, Jane has already established a distinctive voice that resonates deeply with listeners navigating similar emotional landscapes.',
          status: ArticleStatus.PUBLISHED,
          title: 'Jane Remover: The Voice of Digital Anxiety',
          visibility: ArticleVisibility.PUBLIC,
        },
        {
          content: 'Scottish electronic duo Boards of Canada, consisting of brothers Michael Sandison and Marcus Eoin, have created some of the most distinctive and influential electronic music since their formation in the mid-1990s. Their sound is characterized by analog warmth, nostalgic samples, and subtly disquieting melodies that evoke half-remembered childhood experiences. Albums like "Music Has the Right to Children" and "Geogaddi" are considered landmarks in electronic music, blending ambient textures with hip-hop influenced beats. The duo is notoriously reclusive, rarely giving interviews or performing live, which has only added to their mystique. Their work continues to influence countless artists across electronic music genres.',
          status: ArticleStatus.DRAFT,
          title: 'Boards of Canada: Nostalgic Futurism',
          visibility: ArticleVisibility.PRIVATE,
        },
      ],
      email: 'user1@example.com',
      name: 'Music Journalist',
    },
    {
      articles: [
        {
          content: 'Tahliah Debrett Barnett, known professionally as FKA twigs, is a British singer, songwriter, producer, and dancer whose work defies categorization. Combining elements of R&B, electronic, trip-hop, and avant-garde pop, twigs has created a singular artistic vision that extends beyond music into visual art, dance, and fashion. Her albums "LP1" and "MAGDALENE" showcase her ethereal vocals and boundary-pushing production, while exploring themes of femininity, power, and vulnerability. A trained dancer, twigs incorporates pole dancing, sword fighting, and other physical disciplines into her performances, creating immersive multimedia experiences. Her meticulous attention to every aspect of her art has established her as one of the most innovative and complete artists of her generation.',
          status: ArticleStatus.PUBLISHED,
          title: 'FKA twigs: Redefining Performance Art',
          visibility: ArticleVisibility.PUBLIC,
        },
        {
          content: 'Led by the enigmatic Billy Corgan, The Smashing Pumpkins emerged from Chicago in the late 1980s to become one of alternative rock\'s most ambitious and influential bands. Their sound blended heavy metal\'s power with dream pop\'s ethereal textures, topped with Corgan\'s distinctive vocals and introspective lyrics. Albums like "Siamese Dream" and the epic double LP "Mellon Collie and the Infinite Sadness" showcased the band\'s range, from blistering rockers to delicate ballads. Despite lineup changes and hiatuses, the Pumpkins\'s legacy remains secure, with their ambitious scope and technical prowess continuing to inspire generations of rock musicians seeking to balance accessibility with artistic vision.',
          status: ArticleStatus.PUBLISHED,
          title: 'The Smashing Pumpkins: Alternative Rock Visionaries',
          visibility: ArticleVisibility.PRIVATE,
        },
        {
          content: 'Kayleigh Rose Amstutz, known professionally as Chappell Roan, has quickly established herself as one of pop music\'s most exciting new voices. Hailing from Missouri, Roan combines powerful vocals with theatrical performances and honest, often queer-focused storytelling. After initially being signed as a teenager, she took time to develop her distinctive artistic vision, which blends classic pop sensibilities with modern production and a striking visual aesthetic. Songs like "Pink Pony Club" and "Good Luck, Babe!" showcase her talent for crafting catchy yet emotionally resonant pop music. With her bold fashion choices and unapologetic approach to performance, Roan represents a new generation of pop artists who refuse to compromise their authenticity.',
          status: ArticleStatus.DRAFT,
          title: 'Chappell Roan: Pop\'s New Theatrical Force',
          visibility: ArticleVisibility.PUBLIC,
        },
        {
          content: 'Devon Karpf, known professionally as underscores, represents the thoughtful, genre-blurring approach of a new generation of electronic musicians. Emerging from the hyperpop scene but quickly establishing a sound that transcends easy categorization, underscores combines elements of pop, electronic music, emo, and experimental production to create songs that feel both futuristic and emotionally grounded. Their projects like "fishmonger" and "boneyard aka fearmonger" showcase an artist willing to take risks while maintaining a coherent artistic vision. What sets underscores apart is their ability to balance experimental production techniques with genuine emotional resonance, creating music that pushes boundaries while remaining deeply human.',
          status: ArticleStatus.DRAFT,
          title: 'underscores: Hyperpop\'s Thoughtful Innovator',
          visibility: ArticleVisibility.PRIVATE,
        },
      ],
      email: 'user2@example.com',
      name: 'Alternative Music Critic',
    },
  ],
};
