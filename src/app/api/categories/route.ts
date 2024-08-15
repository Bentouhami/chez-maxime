import { NextResponse } from 'next/server';
import prisma from '@/utils/db';

export async function GET() {
    try {
        const categories = await prisma.category.findMany(
            {
                where: {
                    parentId: null,
                },
            }
        );

        if (!categories || !categories.length) {
            return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
        }
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}

// ajouter une catégorie
export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name) {
            return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
        }
        const category = await prisma.category.create({
            data: {
                name,
            },
        });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}
