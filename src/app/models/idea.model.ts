// src/app/models/idea.model.ts
export interface Idea {
    id: number;
    titulo: string;
    descripcion: string;
    tipo: 'servicio' | 'digital' | 'fisico';
    inversionEstimada: number;
    habilidadesRequeridas: string[];
    recursosNecesarios: string[];
    potencialRentabilidad: 'baja' | 'media' | 'alta';
    dificultad: 'baja' | 'media' | 'alta';
    favorita: boolean;
    fechaCreacion: Date;
}