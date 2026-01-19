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
import img2828 from '../assets/gallery/wedding/DXMJ2828.jpeg';
import img2911 from '../assets/gallery/wedding/DXMJ2911.jpeg';
import img3207 from '../assets/gallery/wedding/DXMJ3207.jpeg';

export type LayoutType = 'dialogue' | 'split-left' | 'deco-number' | 'split-right' | 'sticky-note' | 'minimal-large' | 'chalkboard';

export interface SlideItem {
  src: ImageMetadata
  title: string
  copy: string
  layout?: LayoutType
  dialogueLines?: string[] // For dialogue layout
  chalkboardLine?: string // For chalkboard layout - text on blackboard
}

// Carousel images for horizontal scroll section
export const carouselImages: ImageMetadata[] = [img2728, img2827, img2911, img3207];

export const slides: SlideItem[] = [
  {
    src: img2611,
    title: '初见',
    copy: '那天她感冒着被面试，说了什么早已忘记。只记得结束时她说再见，我说好好休息。',
    layout: 'chalkboard',
    chalkboardLine: '第一印象，是可爱。'
  },
  {
    src: img2654,
    title: '后来',
    copy: '在摄影群，我们喜欢周末到处拍照。再后来，我们经常一起轧马路、聊到深夜，不知不觉成了无话不谈的好朋友。',
    layout: 'split-left'
  },
  {
    src: img2828,
    title: '约定',
    copy: '在图书馆的书架下，我局促着回忆着准备好的台词。那时的暖气这么热，烫红了我们的脸。',
    layout: 'deco-number'
  },
  {
    src: img3092,
    title: '准备',
    copy: '「我们看《罪恶王冠》吧」「不看。」「看呗。」「...真香。」我二刷三刷了很多遍的动画、剧和电影，都是和你一起。',
    layout: 'split-right'
  },
  {
    src: img3433,
    title: '这一秒',
    copy: '人生有很多次初见，但我们最后见到的是彼此。',
    layout: 'split-left'
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
