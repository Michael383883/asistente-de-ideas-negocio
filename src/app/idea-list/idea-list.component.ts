import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Idea {
  id?: string;
  name: string;
  concept: string;
  problem: string;
  market: string;
  audience: string;
  uniqueValue: string;
  nextSteps: string[];
  createdAt?: Date;
  isStatic?: boolean;

  color?: string;
}

@Component({
  selector: 'app-idea-list',
  standalone: true,
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css'],
  imports: [CommonModule]
})
export class IdeaListComponent implements OnInit {
  allIdeas: Idea[] = [];
  isLoading = false;
  staticIdeas: Idea[] = [
    {
      name: 'EcoHub',
      concept: 'Plataforma para conectar productores ecológicos con consumidores conscientes',
      problem: 'Los consumidores no encuentran fácilmente productos sostenibles y los productores no alcanzan su mercado ideal',
      market: 'Mercado de productos orgánicos y sostenibles (USD 250 billones anuales)',
      audience: 'Personas de 25-45 años con conciencia ambiental y poder adquisitivo medio-alto',
      uniqueValue: 'Certificación de origen transparente y sistema de valoración comunitaria',
      nextSteps: [
        'Investigación de mercado detallada',
        'Prototipo de plataforma web',
        'Acercamiento a primeros productores'
      ],
      isStatic: true
    },
    {
      name: 'SmartLearn',
      concept: 'Plataforma de aprendizaje adaptativo con IA',
      problem: 'Los sistemas educativos tradicionales no se adaptan al ritmo individual de aprendizaje',
      market: 'Mercado global de EdTech (USD 340 billones para 2025)',
      audience: 'Estudiantes universitarios y profesionales que buscan mejorar habilidades',
      uniqueValue: 'Algoritmo de aprendizaje que se ajusta en tiempo real al desempeño del usuario',
      nextSteps: [
        'Desarrollo del algoritmo base',
        'Pruebas con usuarios piloto',
        'Lanzamiento beta controlado'
      ],
      isStatic: true
    },
    {
      name: 'HealthTrack',
      concept: 'Sistema integrado de monitoreo de salud con wearables',
      problem: 'Los datos de salud están dispersos en diferentes apps y dispositivos',
      market: 'Mercado de salud digital (crecimiento anual del 25%)',
      audience: 'Personas de 30-60 años preocupadas por su bienestar',
      uniqueValue: 'Dashboard unificado con insights accionables basados en todos tus datos de salud',
      nextSteps: [
        'Diseño de interfaz centrado en usuario',
        'Integración con APIs de wearables populares',
        'Pruebas de seguridad de datos'
      ],
      isStatic: true
    }
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.loadIdeas();
    });
  }

  loadIdeas(): void {
    this.isLoading = true;
    const savedIdeas = localStorage.getItem('savedIdeas');
    const storedIdeas = savedIdeas ? JSON.parse(savedIdeas) : [];

    const allIdeasWithColors = [
      ...this.staticIdeas,
      ...storedIdeas.map((idea: any) => ({ ...idea, isStatic: false }))
    ].map(idea => ({
      ...idea,
      color: this.getRandomColor()
    }));

    this.allIdeas = allIdeasWithColors;
    this.isLoading = false;
  }
  getRandomColor(): string {
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}