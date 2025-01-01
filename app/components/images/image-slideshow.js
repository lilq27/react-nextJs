'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //const [a, b] = useState(0); 
  //a: 현재 상태값 (화면에 표시되는 값).
  //b: 상태를 업데이트하는 함수 (화면에 직접 표시되지 않음).
  // 상태 업데이트(b 호출)는 React가 컴포넌트를 다시 렌더링한 후에 새로운 값(a)으로 화면에 반영
  // 일반 자바스크립와 달리 let a 로 선언하면 값을 바꿔도 화면에서 안바뀜 (리액트는 자동 렌더링, 자바스크립트는 수동 렌더링)

  useEffect(() => { //useEffect는 컴포넌트가 렌더링될 때마다 자동으로 실행
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  //[] 배열이 없으면: 렌더링마다 실행.
  //   빈 배열: 마운트 시 한 번만 실행. (마운트(Mount): 컴포넌트가 DOM에 추가되어 화면에 처음 나타나는 시점)
  //   특정 값: 해당 값이 변경될 때만 실행.

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}