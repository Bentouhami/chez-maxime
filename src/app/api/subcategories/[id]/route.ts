import { NextResponse } from 'next/server';
import prisma from '@/utils/db';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name } = await request.json();
        const parentId = parseInt(params.id);

        if (!name || !parentId) {
            return NextResponse.json({ message: 'Nom et parentId sont requis' }, { status: 400 });
        }

        const subCategory = await prisma.category.create({
            data: {
                name,
                parentId,
            },
        });

        return NextResponse.json(subCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 });
    }
}
