// src/app/services/ideas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface IdeaNegocio {
    id: number;
    titulo: string;
    descripcion: string;
    tipo: 'servicio' | 'digital' | 'fisico';
    inversionEstimada: number;
    habilidadesRequeridas: string[];
    recursosNecesarios: string[];
    potencialRentabilidad: 'baja' | 'media' | 'alta';
    dificultad: 'baja' | 'media' | 'alta';
    favorito: boolean; 
    fechaCreacion: Date;
}

@Injectable({
    providedIn: 'root'
})
export class IdeasService {
    private ideasSubject = new BehaviorSubject<IdeaNegocio[]>([]);
    public ideas$ = this.ideasSubject.asObservable();

    private ideasMock: IdeaNegocio[] = [
        {
            id: 1,
            titulo: 'Tienda de compostas online',
            descripcion: 'Servicio de venta y entrega de compostas para jardines urbanos y cultivos caseros.',
            tipo: 'fisico',
            inversionEstimada: 8000,
            habilidadesRequeridas: ['Conocimiento en agricultura', 'Marketing digital'],
            recursosNecesarios: ['Espacio para almacenamiento', 'Vehículo para entregas'],
            potencialRentabilidad: 'media',
            dificultad: 'media',
            favorito: false,
            fechaCreacion: new Date('2025-05-01')
        },
        {
            id: 2,
            titulo: 'App de meditación para programadores',
            descripcion: 'Aplicación que ofrece meditaciones cortas enfocadas en reducir el estrés durante la jornada laboral.',
            tipo: 'digital',
            inversionEstimada: 5000,
            habilidadesRequeridas: ['Desarrollo móvil', 'UX/UI', 'Conocimiento de meditación'],
            recursosNecesarios: ['Equipo de desarrollo', 'Contenido audiovisual'],
            potencialRentabilidad: 'alta',
            dificultad: 'media',
            favorito: true,
            fechaCreacion: new Date('2025-05-02')
        },
        {
            id: 3,
            titulo: 'Asesoría en finanzas personales',
            descripcion: 'Servicio de consultoría para ayudar a personas a organizar sus finanzas y crear planes de ahorro.',
            tipo: 'servicio',
            inversionEstimada: 2000,
            habilidadesRequeridas: ['Conocimientos financieros', 'Habilidades comunicativas'],
            recursosNecesarios: ['Oficina o espacio virtual', 'Software de gestión financiera'],
            potencialRentabilidad: 'media',
            dificultad: 'baja',
            favorito: false,
            fechaCreacion: new Date('2025-05-03')
        },
        {
            id: 4,
            titulo: 'Delivery de almuerzos saludables',
            descripcion: 'Servicio de preparación y entrega de almuerzos balanceados para oficinas y trabajadores remotos.',
            tipo: 'fisico',
            inversionEstimada: 10000,
            habilidadesRequeridas: ['Cocina', 'Logística', 'Marketing'],
            recursosNecesarios: ['Cocina equipada', 'Vehículos para entrega', 'Empaques ecológicos'],
            potencialRentabilidad: 'alta',
            dificultad: 'alta',
            favorito: false,
            fechaCreacion: new Date('2025-05-04')
        }
    ];

    constructor(private http: HttpClient) {
    
        this.ideasSubject.next(this.ideasMock);
    }


    getIdeas(): Observable<IdeaNegocio[]> {
        // Simular llamada a API
        return of(this.ideasMock);
    }

    getIdeasByTipo(tipo: 'servicio' | 'digital' | 'fisico'): Observable<IdeaNegocio[]> {
        const ideasFiltradas = this.ideasMock.filter(idea => idea.tipo === tipo);
        return of(ideasFiltradas);
    }

    toggleFavorito(id: number): void {
        const ideas = this.ideasSubject.value;
        const ideaIndex = ideas.findIndex(idea => idea.id === id);

        if (ideaIndex !== -1) {
            ideas[ideaIndex].favorito = !ideas[ideaIndex].favorito;
            this.ideasSubject.next([...ideas]);
        }
    }
}