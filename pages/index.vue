<script setup lang="ts">
import legacyDocument from '~/page/index.html?raw'

const siteUrl = 'https://www.syu.kr'
const pageTitle = 'SYU KR | 삼육대학교 재학생 편의 서비스'
const pageDescription =
  '삼육대학교 재학생을 위한 서비스 허브입니다. 시간표 마법사, 수강신청 장바구니, 경쟁률 조회, 공지 알리미 등 캠퍼스 생활에 필요한 서비스를 한눈에 확인하세요.'
const ogImage = `${siteUrl}/assets/img/banner.png`
const robotsContent = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

const bodyHtml = (legacyDocument.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '')
  .replace(/<script\s+src="assets\/js\/main\.js"><\/script>/i, '')
  .trim()

const inlineStyles = Array.from(legacyDocument.matchAll(/<style>([\s\S]*?)<\/style>/gi)).map((match) => match[1].trim())

const topServices = [
  {
    name: '한끼 · 삼육대학교 후문',
    description: '삼육대학교 후문 근처 음식점을 가까운 순으로 넘겨보는 맛집 큐레이션',
    url: 'https://food.syu.kr/',
  },
  {
    name: '시간표 마법사',
    description: '효율적인 학기 계획을 위한 맞춤형 시간표 서비스',
    url: 'https://lecture.syu.kr/timetable',
  },
  {
    name: '수강신청 장바구니 경쟁률 조회',
    description: '장바구니 기준 수강 경쟁률을 빠르게 확인하는 서비스',
    url: 'https://sugang.syu.kr/basket',
  },
  {
    name: 'SYU 공지 알리미',
    description: '학교 공지를 간편하게 확인하는 공지 알리미 서비스',
    url: 'https://www.syu.kr/notice',
  },
  {
    name: 'SU-TALK CHAT VIEWER',
    description: '수톡 화면을 모바일 느낌으로 확인할 수 있는 뷰어',
    url: 'https://www.syu.kr/sutalk',
  },
  {
    name: '셔틀버스 실시간 도착시간',
    description: '셔틀버스 도착 시간을 실시간으로 확인하는 서비스',
    url: 'https://bus.syu.kr/arrivaltime',
  },
]

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'SYU KR',
    url: `${siteUrl}/`,
    logo: ogImage,
    description: pageDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'SYU KR',
    url: `${siteUrl}/`,
    inLanguage: 'ko-KR',
    description: pageDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/#webpage`,
    name: pageTitle,
    url: `${siteUrl}/`,
    inLanguage: 'ko-KR',
    description: pageDescription,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@id': `${siteUrl}/#organization`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: topServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          name: service.name,
          description: service.description,
          url: service.url,
        },
      })),
    },
  },
]

useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  title: pageTitle,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'description', content: pageDescription },
    { name: 'robots', content: robotsContent },
    { name: 'googlebot', content: robotsContent },
    { name: 'theme-color', content: '#0076ff' },
    { name: 'application-name', content: 'SYU KR' },
    { name: 'apple-mobile-web-app-title', content: 'SYU KR' },
    { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:site_name', content: 'SYU KR' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'SYU KR 대표 배너 이미지' },
    { property: 'og:url', content: `${siteUrl}/` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'ko-KR', href: `${siteUrl}/` },
    { href: 'https://www.syu.kr/favicon/favicon.ico', rel: 'icon' },
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: '' },
    {
      href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i',
      rel: 'stylesheet',
    },
    { rel: 'sitemap', type: 'application/xml', href: `${siteUrl}/sitemap.xml` },
    { href: '/assets/vendor/aos/aos.css', rel: 'stylesheet' },
    { href: '/assets/vendor/bootstrap/css/bootstrap.min.css', rel: 'stylesheet' },
    { href: '/assets/vendor/bootstrap-icons/bootstrap-icons.css', rel: 'stylesheet' },
    { href: '/assets/css/style.css', rel: 'stylesheet' },
  ],
  style: inlineStyles.map((content, index) => ({
    innerHTML: content,
    key: `legacy-style-${index}`,
  })),
  script: [
    ...structuredData.map((schema, index) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
      key: `structured-data-${index}`,
    })),
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-L75N27FJKL',
      tagPosition: 'head',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', 'G-L75N27FJKL')
      `,
      key: 'gtag-inline',
      tagPosition: 'head',
    },
    { src: '/assets/vendor/aos/aos.js', tagPosition: 'head' },
    { src: '/assets/js/main.js', tagPosition: 'bodyClose' },
  ],
})
</script>

<template>
  <div v-html="bodyHtml" />
</template>
