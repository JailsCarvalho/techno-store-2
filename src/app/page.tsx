"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SplashScreen from "./components/SpalshScreen";
import { getCollections } from "./services/collections-service";

export interface Banner {
  id: number;
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}

export interface ProductCollection {
  id: number;
  title: string;
  imageUrl: string;
  handle: string;
  metadata: { image_url: string };
}

const banners: Banner[] = [
  {
    id: 1,
    imageUrl: "/images/banner-1.jpg",
    alt: "Reparamos o seu robô de cozinha",
    title: "Reparações Techno Store",
    description: "Reparamos o seu Robot de cozinha",
    link: "",
  },
  {
    id: 2,
    imageUrl: "/images/banner-2.png",
    alt: "Reparamos o seu robô de cozinha",
    title: "REGRESSO ÀS AULAS",
    description: "Chega sempre a tempo às aulas",
    link: "",
  },
  {
    id: 3,
    imageUrl: "/images/banner-3.jpg",
    alt: "Reparamos o seu robô de cozinha",
    title: "Techno Store Outlet",
    description: "Produtos Com Preço Reduzido",
    link: "",
  },
  // Add more banners as needed
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [productCollections, setProductCollections] = useState<any[]>([]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  useEffect(() => {
    const loadProductCollections = async () => {
      const collections = await getCollections();
      setProductCollections(collections);
    };

    loadProductCollections();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <>
          <BannerCarousel />
          <CategoryGrid productCollections={productCollections} />
        </>
      )}
    </div>
  );
}

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-6 w-full" style={{ height: "60vh" }}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        autoPlay={false}
        infiniteLoop={true}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}
        className="h-full"
      >
        {banners.map((banner) => (
          <div key={banner.id} className="h-full relative">
            <div className="h-full relative z-10 flex flex-col items-start justify-center text-white px-4 sm:px-20 text-start space-y-8">
              <div className="flex flex-col space-y-2">
                <div className="px-4 py-1 font-header text-white uppercase border-2 border-white rounded-lg w-max text-sm lg:text-base">
                  {banner.title}
                </div>
                <h2 className="font-header font-bold text-white text-4xl lg:text-6xl uppercase w-2/5 lg:w-6/12">
                  {banner.description}
                </h2>
              </div>
              <a
                href={banner.link}
                className="px-8 py-2 font-header text-black uppercase border-2 border-white bg-white rounded-lg w-max text-xl"
              >
                SAIBA MAIS
              </a>
            </div>
            <div className="absolute inset-0">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

interface CategoryGridProps {
  productCollections: ProductCollection[];
}
const CategoryGrid: React.FC<CategoryGridProps> = ({ productCollections }) => {
  const getCategoryImage = (handle: string) => {
    return;
  };
  return (
    <div className="container mx-auto px-4 mb-6">
      <h2 className="text-xl font-bold mb-4">Encontre o seu produto ideal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {productCollections.map((category) => (
          <a
            key={category.id}
            href={`/product-listing/?category=${category.id}`}
            className="relative h-48 bg-cover bg-center rounded-lg transform transition-all duration-150 ease-in"
            style={{
              backgroundImage: `url(${category.metadata.image_url})`,
              textShadow: "1px 1px 45px #000",
            }}
          >
            <div className="flex flex-wrap content-between justify-end p-4 h-48 rounded-lg bg-black hover:bg-lime-600 bg-opacity-70 hover:bg-opacity-70 group transform transition-all duration-150 ease-in">
              <h4 className="font-header text-xl lg:text-3xl text-right text-white w-6/12">
                {category.title}
              </h4>
              <div className="flex justify-end w-full">
                <p className="justify-self-end px-2 py-1 font-header uppercase text-white text-xs border-2 rounded-lg w-max">
                  Ver Produtos
                  <i id="ver-produto" className="fas fa-arrow-right ml-2"></i>
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
