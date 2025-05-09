import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GeneratedIdea {
    id?: string;
    name: string;
    concept: string;
    problem: string;
    market: string;
    audience: string;
    uniqueValue: string;
    nextSteps: string[];
    createdAt?: Date;
}

@Component({
    selector: 'app-ideas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ideas.component.html',
    styleUrls: ['./ideas.component.css']
})
export class IdeasComponent {
    recentIdeas: GeneratedIdea[] = [];
    defaultIdeas: GeneratedIdea[] = [
        {
            name: 'EcoHub',
            concept: 'Plataforma para conectar productores ecológicos con consumidores conscientes.',
            problem: 'Falta de acceso directo a productos sostenibles.',
            market: 'Mercado de alimentos orgánicos y productos ecológicos.',
            audience: 'Consumidores de 25-45 años preocupados por la sostenibilidad.',
            uniqueValue: 'Certificación de origen y proceso transparente.',
            nextSteps: [
                'Investigación de mercado',
                'Prototipo de plataforma',
                'Contactar productores'
            ]
        },
        {
            name: 'SmartLearn',
            concept: 'Sistema de aprendizaje adaptativo usando IA.',
            problem: 'Educación no personalizada.',
            market: 'Sector EdTech en crecimiento.',
            audience: 'Estudiantes y profesionales que buscan mejorar habilidades.',
            uniqueValue: 'Algoritmos que se adaptan al ritmo de aprendizaje.',
            nextSteps: [
                'Desarrollar algoritmo base',
                'Pruebas con usuarios',
                'Lanzamiento beta'
            ]
        },
        {
            name: 'HealthTrack',
            concept: 'Monitorización integral de salud con wearables.',
            problem: 'Falta de integración de datos de salud.',
            market: 'Mercado de salud digital en expansión.',
            audience: 'Personas preocupadas por su bienestar físico.',
            uniqueValue: 'Dashboard unificado para todos tus datos de salud.',
            nextSteps: [
                'Diseñar interfaz de usuario',
                'Integrar APIs de wearables',
                'Pruebas de seguridad'
            ]
        }
    ];

    constructor(private router: Router) {
        this.loadIdeas();
    }

    loadIdeas(): void {
        const savedIdeas = localStorage.getItem('savedIdeas');
        if (savedIdeas) {
            const allIdeas: GeneratedIdea[] = JSON.parse(savedIdeas);
            this.recentIdeas = allIdeas
                .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }

        const ideasToShow = Math.max(3 - (this.recentIdeas?.length || 0), 0);
        if (ideasToShow > 0) {
            this.recentIdeas = [
                ...(this.recentIdeas || []),
                ...this.defaultIdeas.slice(0, ideasToShow)
            ];
        }
    }

    navigateToCreate(): void {
        window.location.href = 'http://localhost:4200/ideacrea';
    }
}