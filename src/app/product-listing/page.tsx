"use client";
import React, { Suspense } from "react";
import ProductListingContent from "../components/ProductListingContent";

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProductListingContent />
    </Suspense>
  );
}