import type { ImageMetadata } from 'astro';

// Import wedding images
import img2611 from '../assets/gallery/wedding/DXMJ2611.jpeg';
import img2654 from '../assets/gallery/wedding/DXMJ2654.jpeg';
import img3092 from '../assets/gallery/wedding/DXMJ3092.jpeg';
import img3433 from '../assets/gallery/wedding/DXMJ3433.jpeg';
import img3399 from '../assets/gallery/wedding/DXMJ3399.jpeg';
import img3459 from '../assets/gallery/wedding/DXMJ3459.jpeg';

// Additional carousel images
import img2728 from '../assets/gallery/wedding/DXMJ2728.jpeg';
import img2827 from '../assets/gallery/wedding/DXMJ2827.jpeg';
import img2911 from '../assets/gallery/wedding/DXMJ2911.jpeg';
import img3207 from '../assets/gallery/wedding/DXMJ3207.jpeg';

export type LayoutType = 'dialogue' | 'split-left' | 'deco-number' | 'split-right' | 'sticky-note' | 'minimal-large';

export interface SlideItem {
  src: ImageMetadata
  title: string
  copy: string
  layout?: LayoutType
  dialogueLines?: string[] // For dialogue layout
}

// Carousel images for horizontal scroll section
export const carouselImages: ImageMetadata[] = [img2728, img2827, img2911, img3207];

export const slides: SlideItem[] = [
  {
    src: img2611,
    title: '那天',
    copy: '后来我们都觉得，第一句话说得挺傻的。但就是从那句傻话开始的。',
    layout: 'dialogue',
    dialogueLines: ['你好。', '你也好。', '……', '你叫什么名字？', '我叫……']
  },
  {
    src: img2654,
    title: '后来',
    copy: '张爱玲说，于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步。我们刚好赶上了。',
    layout: 'split-left'
  },
  {
    src: img3092,
    title: '准备',
    copy: '「这个颜色好看吗？」「好看。」「那这个呢？」「也好看。」「你到底有没有认真看！」「……我觉得你选的都好看。」',
    layout: 'deco-number'
  },
  {
    src: img3433,
    title: '这一秒',
    copy: '摄影师说笑一个。我们没忍住笑了两个。',
    layout: 'split-right'
  },
  {
    src: img3399,
    title: '来吧',
    copy: '我们吃过很多顿饭，看过很多场电影，但这次想和你一起见证我们吃的这顿、看的这场。带上胃口和纸巾就行。',
    layout: 'sticky-note'
  },
  {
    src: img3459,
    title: '见？',
    copy: '余生很长，你来不来？',
    layout: 'minimal-large'
  }
]
