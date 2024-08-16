// seed.js
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Ajoutez des catégories avec leurs sous-catégories
    const boulangerie = await prisma.category.create({
        data: {
            name: 'Boulangerie',
            children: {
                create: [
                    {name: 'Pains blancs'},
                    {name: 'Pains gris'},
                    {name: 'Fine boulangerie'},
                    {name: 'Viennoiseries'},
                ]
            }
        }
    });

    const patisserie = await prisma.category.create({
        data: {
            name: 'Pâtisserie',
            children: {
                create: [
                    {name: 'Pâtisseries'},
                    {name: 'Tartes'},
                    {name: 'Chocolats, macarons et massepains'},
                    {name: 'Gâteaux'},
                ]
            }
        }
    });

    const pizzas = await prisma.category.create({
        data: {
            name: 'Pizzas',
            children: {
                create: [
                    {name: 'Pizzas'}
                ]
            }
        }
    });

    const sandwicherie = await prisma.category.create({
        data: {
            name: 'Sandwicherie',
            children: {
                create: [
                    {name: 'Sandwichs garnis'}
                ]
            }
        }
    });

    // Ajouter des boulangeries
    const boulangerie1 = await prisma.bakery.create({
        data: {
            name: 'Boulangerie 1',
            address: 'Rue de boulangerie 1, 7000 Mons - Belgique',
            phone: '0458798798',
        }
    });

    const boulangerie2 = await prisma.bakery.create({
        data: {
            name: 'Boulangerie 2',
            address: 'Rue de boulangerie 2, 7080 Frameries - Belgique',
            phone: '0458798799',
        }
    });

    //
}

    console.log('Categories and subcategories seeded successfully');


    main()
        .catch(e => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
