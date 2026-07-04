import { NextRequest, NextResponse } from 'next/server';

// Mock data - à remplacer par une vraie base de données
const contactMessages: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Créer le message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
      status: 'new',
    };

    // Ajouter au mock data
    contactMessages.push(newMessage);

    // TODO: Envoyer un email de confirmation
    // TODO: Sauvegarder en base de données

    return NextResponse.json(
      { success: true, message: 'Message reçu avec succès' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Vérifier l'authentification admin
  try {
    return NextResponse.json(contactMessages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
