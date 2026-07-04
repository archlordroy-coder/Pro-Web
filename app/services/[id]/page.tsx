'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getServices, Service } from '@/lib/api';
import { ServiceDetail } from '@/components/ServiceDetail';
import { LoadingState } from '@/components/index';

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
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

    const loadService = async () => {
      try {
        const services = await getServices();
        const found = services.find(s => s.id === id);
        if (found) {
          setService(found);
        } else {
          router.push('/services');
        }
      } catch (err) {
        console.error('Error loading service:', err);
        router.push('/services');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id, router]);

  if (loading) return <LoadingState />;
  if (!service) return <LoadingState />;

  return <ServiceDetail service={service} onBackClick={() => router.back()} />;
}
