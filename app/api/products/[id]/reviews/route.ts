import { NextRequest, NextResponse } from 'next/server';

// Mock data - à remplacer par une vraie base de données
const reviews: any[] = [
  {
    id: '1',
    productId: 'prod-1',
    author: 'Jean Dupont',
    rating: 5,
    comment: 'Excellent produit, très satisfait!',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    productId: 'prod-1',
    author: 'Marie Durand',
    rating: 4,
    comment: 'Bon produit, livraison rapide',
    createdAt: new Date('2024-01-20'),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productReviews = reviews.filter(r => r.productId === id);
    return NextResponse.json(productReviews);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du chargement' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const newReview = {
      id: Date.now().toString(),
      productId: id,
      author: body.author,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date(),
    };

    reviews.push(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
