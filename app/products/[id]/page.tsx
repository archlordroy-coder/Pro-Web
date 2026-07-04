'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, Product } from '@/lib/api';
import { ProductDetail } from '@/components/ProductDetail';
import { LoadingState } from '@/components/index';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const products = await getProducts();
        const found = products.find(p => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          router.push('/products');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, router]);

  if (loading) return <LoadingState />;
  if (!product) return <LoadingState />;

  return <ProductDetail product={product} onBackClick={() => router.back()} />;
}
