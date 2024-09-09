"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { getProducts } from "../../services/products-service";
import { getCollections } from "../../services/collections-service";
import SwipeableCategories from "../../components/SwipeableCategories";
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  variants: any[];
}

interface Collection {
  id: string;
  title: string;
}

export default function ProductListingContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCollections, setProductCollections] = useState<Collection[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  
  const [selectedCollection, setSelectedCollection] = useState(() => searchParams.get("category") || "");

  const memoizedProductCollections = useMemo(() => productCollections, [productCollections]);

  useEffect(() => {
    const loadProductCollections = async () => {
      try {
        const collections = await getCollections();
        setProductCollections(collections);
      } catch (error) {
        console.error('Failed to load collections:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    loadProductCollections();
  }, []);

  const loadProducts = useCallback(async (collectionId: string) => {
    setLoading(true);
    try {
      const p = await getProducts(collectionId);
      setProducts(p);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      loadProducts(selectedCollection);
    }
  }, [selectedCollection, loadProducts]);

  const onSelectedCategoryChange = useCallback((categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    router.replace(`?${params.toString()}`);
    setSelectedCollection(categoryId);
  }, [searchParams, router]);

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-[40px] font-bold"></h1>  {/* Adicionar o titulo da Loja*/}
        <div className="flex items-center mx-auto mb-6 mt-4">
          <Link href="/">
            <Image src="/images/logo.svg" alt="Techno Store logo" width={220} height={50} />
          </Link>
        </div>
        <Image src="/images/cart.svg" alt="Cart" width={30} height={30} />
      </header>

      <SwipeableCategories
        categories={memoizedProductCollections}
        selectedCategory={selectedCollection}
        onCategorySelect={onSelectedCategoryChange}
      />

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-3xl">
            Carregando produtos...
          </p>
        ) : products.length === 0 ? (
          <p className="col-span-full text-center text-3xl">
            Nenhum produto disponível
          </p>
        ) : (
          products.map((product: Product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center shadow-lg"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-4 max-w-60"
              />
              <h2 className="text-2xl font-semibold mb-2 self-start">
                {product.title}
              </h2>
              <div className="flex w-full justify-between">
                <p className="text-green-500 font-bold mb-2">
                  {(product.variants[0]?.original_price_incl_tax || 0).toFixed(2)}€
                </p>
                <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center border border-white shadow-xl">
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}