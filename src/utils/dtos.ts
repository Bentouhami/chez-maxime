// DTOs.ts : Dtos pour les données

// DTP pour ajouter/écrire un produit
// DTO pour ajouter/écrire un produit
export interface CreateProductDto {
    name: string;
    description: string;
    quantity: number;
    price: number;
    image?: string;   // Image optionnelle
    categoryId: number;
    bakery?: number;  // Id de la boulangerie optionnelle
}

// DTO pour la modification/mise à jour d'un produit
export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    image?: string;
    categoryId?: number;
    bakery?: number;
}

// DTO pour l'enregistrement d'un nouveau utilisateur (admin et utilisateurs)
export interface RegisterUserDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

// DTO pour la modification/mise à jour d'un utilisateur
export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
}

// DTO pour la connexion d'un utilisateur (admin et utilisateurs)
export interface LoginUserDto {
    email: string;
    password: string;
}

// DTO pour ajouter/écrire un commentaire
export interface CreateCommentDto {
    text: string;
    productId: number;
}

// DTO pour la modification/mise à jour d'un commentaire
export interface UpdateCommentDto {
    text: string;
}

// DTO pour l'ajout/écriture d'une commande (order)
export interface CreateOrderDto {
    userId: number;
    guestEmail?: string; // Email de l'invité pour la commande
    totalAmount: number;
    orderItems: CreateOrderItemDto[]; // Articles commandés par l'utilisateur
}

// DTO pour l'ajout/écriture d'un article (orderItem)
export interface CreateOrderItemDto {
    productId: number;
    quantity: number;
    price: number;
}

// DTO pour la modification/mise à jour d'une commande (order)
export interface UpdateOrderDto {
    status?: string;
}
