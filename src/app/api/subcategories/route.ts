import { NextResponse } from 'next/server';
import prisma from '@/utils/db';

// Route pour récupérer les sous-catégories d'une catégorie donnée
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId'); // Récupérer l'ID de la catégorie parente

    if (!parentId) {
        return NextResponse.json({ message: 'parentId est requis' }, { status: 400 });
    }

    try {
        const subCategories = await prisma.category.findMany({
            where: {
                parentId: parseInt(parentId), // Filtrer pour obtenir les sous-catégories
            },
        });

        if (!subCategories || subCategories.length === 0) {
            return NextResponse.json({ message: 'Aucune sous-catégorie trouvée' }, { status: 404 });
        }

        return NextResponse.json(subCategories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}


