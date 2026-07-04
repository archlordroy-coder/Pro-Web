const API_BASE_URL = 'https://api.proinformatique.dev';

export interface Service {
  id: string;
  title: string;
  description: string;
  iconCode: number;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  category: string;
  imageUrl: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export interface CyberTicket {
  id: string;
  customerName: string;
  computerId: string;
  duration: string;
  price: number;
  priceDisplay: string;
  startTime: Date;
  endTime?: Date;
}

export interface Computer {
  id: string;
  name: string;
  isAvailable: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Generic fetch helper
async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// Services
export async function getServices(): Promise<Service[]> {
  return fetchAPI('/services');
}

export async function createService(service: Service): Promise<void> {
  await fetchAPI('/services', {
    method: 'POST',
    body: JSON.stringify(service),
  });
}

export async function updateService(id: string, service: Service): Promise<void> {
  await fetchAPI(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  });
}

export async function deleteService(id: string): Promise<void> {
  await fetchAPI(`/services/${id}`, {
    method: 'DELETE',
  });
}

// Products
export async function getProducts(): Promise<Product[]> {
  return fetchAPI('/products');
}

export async function createProduct(product: Product): Promise<void> {
  await fetchAPI('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id: string, product: Product): Promise<void> {
  await fetchAPI(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await fetchAPI(`/products/${id}`, {
    method: 'DELETE',
  });
}

// Reviews
export async function getReviews(productId?: string): Promise<Review[]> {
  const query = productId ? `?product_id=${productId}` : '';
  return fetchAPI(`/reviews${query}`);
}

export async function createReview(review: Review): Promise<void> {
  await fetchAPI('/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  });
}

export async function deleteReview(id: string): Promise<void> {
  await fetchAPI(`/reviews/${id}`, {
    method: 'DELETE',
  });
}

// Cyber Tickets
export async function getCyberTickets(): Promise<CyberTicket[]> {
  return fetchAPI('/cyber-tickets');
}

export async function createCyberTicket(ticket: CyberTicket): Promise<void> {
  await fetchAPI('/cyber-tickets', {
    method: 'POST',
    body: JSON.stringify(ticket),
  });
}

export async function updateCyberTicket(id: string, ticket: CyberTicket): Promise<void> {
  await fetchAPI(`/cyber-tickets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ticket),
  });
}

export async function deleteCyberTicket(id: string): Promise<void> {
  await fetchAPI(`/cyber-tickets/${id}`, {
    method: 'DELETE',
  });
}

// Computers
export async function getComputers(): Promise<Computer[]> {
  return fetchAPI('/computers');
}

export async function updateComputer(id: string, computer: Computer): Promise<void> {
  await fetchAPI(`/computers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(computer),
  });
}

// Promotions
export async function getPromotions(): Promise<Promotion[]> {
  return fetchAPI('/promotions');
}

export async function createPromotion(promotion: Promotion): Promise<void> {
  await fetchAPI('/promotions', {
    method: 'POST',
    body: JSON.stringify(promotion),
  });
}

export async function updatePromotion(id: string, promotion: Promotion): Promise<void> {
  await fetchAPI(`/promotions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(promotion),
  });
}

export async function deletePromotion(id: string): Promise<void> {
  await fetchAPI(`/promotions/${id}`, {
    method: 'DELETE',
  });
}
