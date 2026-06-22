export interface ArticleData {
  id: string | number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  contentParagraphs?: string[];
  description?: string;
}

export const allNewsArticles: ArticleData[] = [
  // Top Headlines
  {
    id: '1',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: '2',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: '3',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: '4',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: '5',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  },
  {
    id: '6',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&h=300&q=80'
  },
  
  // Trending/UAE Featured Grid
  {
    id: 'ft1',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fu1',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm3',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1574328405096-7fcfa4a9b583?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'm4',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 's1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 's2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 's3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80'
  },

  // Banking & Finance
  {
    id: 'bf-f1',
    title: 'How 5G Will Transform CCCC Class Communication and , ac aliquet Class',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-s1',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-s2',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551281622-d7b3010b9a69?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-s3',
    title: 'Yorem ipsum dolor sit amet, secte consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-m1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-m2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bf-m3',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80'
  },

  // Real Estate & Construction
  {
    id: 're-f1',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 're-s1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 're-s2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 're-s3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 're-m1',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 're-m2',
    title: 'Yorem ipsum dolor sit amet, consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  },

  // Economy & Policy
  {
    id: 'ec-f1',
    title: 'How 5G Will Transform Communication and Connectivity',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ec-s1',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s2',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ec-s3',
    title: 'Yorem ipsum dolor sit amet, secte ipsum dolor consectetur',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=200&q=80'
  }
];

export const getArticleById = (id: string | number): ArticleData => {
  const cleanId = String(id);
  const found = allNewsArticles.find(a => String(a.id) === cleanId);
  
  if (found) {
    return {
      ...found,
      contentParagraphs: [
        'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
        'Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisl. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisl. Proin vitae facilisis nisl, ac posuere leo.',
        'Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisl, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisl, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.'
      ]
    };
  }

  // Fallback default article details
  return {
    id: cleanId,
    title: 'How 5G Will Transform Class Communication and , ac aliquet Class',
    category: 'Oil, Gas & Energy',
    date: 'July 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80',
    contentParagraphs: [
      'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
      'Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisl. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisl. Proin vitae facilisis nisl, ac posuere leo.',
      'Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisl, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisl, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.'
    ]
  };
};
