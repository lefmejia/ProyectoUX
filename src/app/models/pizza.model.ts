export class pizza {
    id: number;
    imageUrl: string;
    nombre: string;
    precio: number;
    descripcion: string;
    reviews: Array<IReview>;
  }

export interface IReview {
  usuario: string;
  contenido: string;
}