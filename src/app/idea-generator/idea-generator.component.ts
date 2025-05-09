import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IdeaResponse {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

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
  selector: 'app-idea-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './idea-generator.component.html',
  styleUrls: ['./idea-generator.component.css']
})
export class IdeaGeneratorComponent implements OnInit {
  responses: IdeaResponse = {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: ''
  };

  ideaGenerated: boolean = false;
  generatedIdea: GeneratedIdea = {
    name: '',
    concept: '',
    problem: '',
    market: '',
    audience: '',
    uniqueValue: '',
    nextSteps: []
  };
  ideaSaved: boolean = false;
  savedIdeas: GeneratedIdea[] = [];
  private ideaNamePrefixes: string[] = [
    'Eco', 'Smart', 'Vita', 'Nova', 'Flex', 'Zen', 'Tech', 'Pulse', 'Flow', 'Bright',
    'Green', 'Blue', 'Red', 'Gold', 'Silver', 'Crystal', 'Peak', 'Prime', 'Pure', 'Cloud'
  ];

  private ideaNameSuffixes: string[] = [
    'Hub', 'Connect', 'Mind', 'Link', 'Space', 'Sync', 'Life', 'Now', 'Go', 'Way',
    'Path', 'Nest', 'Box', 'Pod', 'Lab', 'Studio', 'Works', 'Sphere', 'Zone', 'Net'
  ];

  private commonNextSteps: string[][] = [
    [
      'Realizar una investigación de mercado más profunda',
      'Crear un prototipo o mínimo producto viable (MVP)',
      'Validar la idea con potenciales clientes',
      'Desarrollar un modelo de negocio preliminar',
      'Identificar posibles socios o mentores'
    ],
    [
      'Realizar un análisis de competidores',
      'Elaborar un prototipo funcional',
      'Obtener feedback de usuarios potenciales',
      'Crear un plan financiero básico',
      'Explorar opciones de financiamiento inicial'
    ],
    [
      'Definir claramente tu propuesta de valor',
      'Crear un logo y establecer una identidad de marca',
      'Desarrollar un sitio web o landing page',
      'Realizar pruebas de concepto con usuarios reales',
      'Establecer métricas de éxito iniciales'
    ]
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadSavedIdeas();
  }

  loadSavedIdeas(): void {
    const savedIdeasString = localStorage.getItem('savedIdeas');
    if (savedIdeasString) {
      this.savedIdeas = JSON.parse(savedIdeasString);
    }
  }

  generateIdea(): void {
    if (!this.validateResponses()) {
      alert('Por favor completa todas las preguntas para generar tu idea');
      return;
    }

    const keywords = this.extractKeywords();
    const name = this.generateRelatedName(keywords);

    this.generatedIdea = {
      id: this.generateUniqueId(),
      name: name,
      concept: this.generateConcept(keywords),
      problem: this.enhanceResponse(this.responses.second),
      market: this.enhanceResponse(this.responses.third),
      audience: this.enhanceResponse(this.responses.fourth),
      uniqueValue: this.enhanceResponse(this.responses.fifth),
      nextSteps: this.getRandomNextSteps(),
      createdAt: new Date()
    };
    this.ideaGenerated = true;
    this.ideaSaved = false;
    setTimeout(() => {
      const resultElement = document.querySelector('.idea-result');
      resultElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private validateResponses(): boolean {
    return Object.values(this.responses).every(response => response.trim().length > 0);
  }

  private extractKeywords(): string[] {
    const allResponses = Object.values(this.responses).join(' ').toLowerCase();
    const words = allResponses.split(/\s+/);

    const commonWords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'porque', 'que', 'como', 'para', 'por', 'con', 'sin', 'a', 'ante', 'bajo', 'cabe', 'de', 'desde', 'en', 'entre', 'hacia', 'hasta', 'según', 'sobre', 'tras'];

    const keywords = words
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .map(word => word.replace(/[.,;:!?()]/g, ''));

    return [...new Set(keywords)].slice(0, 10);
  }

  private generateRelatedName(keywords: string[]): string {

    let relevantPrefix = '';


    const firstResponse = this.responses.first.toLowerCase();


    if (firstResponse.includes('eco') || firstResponse.includes('ambiente') || firstResponse.includes('sostenible') ||
      firstResponse.includes('verde') || firstResponse.includes('natural')) {
      relevantPrefix = 'Eco';
    } else if (firstResponse.includes('tech') || firstResponse.includes('tecnología') || firstResponse.includes('digital') ||
      firstResponse.includes('app') || firstResponse.includes('software')) {
      relevantPrefix = 'Tech';
    } else if (firstResponse.includes('salud') || firstResponse.includes('bienestar') ||
      firstResponse.includes('vida') || firstResponse.includes('saludable')) {
      relevantPrefix = 'Vita';
    } else if (firstResponse.includes('innovación') || firstResponse.includes('nuevo') ||
      firstResponse.includes('futuro') || firstResponse.includes('revolucionario')) {
      relevantPrefix = 'Nova';
    } else if (firstResponse.includes('adaptable') || firstResponse.includes('flexible') ||
      firstResponse.includes('personalizado')) {
      relevantPrefix = 'Flex';
    } else if (firstResponse.includes('relajación') || firstResponse.includes('meditación') ||
      firstResponse.includes('mindfulness') || firstResponse.includes('paz')) {
      relevantPrefix = 'Zen';
    } else {

      const firstKeyword = keywords[0] || '';
      if (firstKeyword.length >= 3) {
        relevantPrefix = firstKeyword.charAt(0).toUpperCase() + firstKeyword.slice(1, 3);
      } else {

        relevantPrefix = this.ideaNamePrefixes[Math.floor(Math.random() * this.ideaNamePrefixes.length)];
      }
    }
    let relevantSuffix = '';


    const audienceResponse = this.responses.fourth.toLowerCase();
    const valueResponse = this.responses.fifth.toLowerCase();

    if (audienceResponse.includes('conect') || audienceResponse.includes('social') ||
      valueResponse.includes('conect') || valueResponse.includes('social')) {
      relevantSuffix = 'Connect';
    } else if (audienceResponse.includes('aprend') || valueResponse.includes('aprend') ||
      audienceResponse.includes('conocimiento') || valueResponse.includes('conocimiento')) {
      relevantSuffix = 'Mind';
    } else if (audienceResponse.includes('espacio') || valueResponse.includes('espacio') ||
      audienceResponse.includes('lugar') || valueResponse.includes('lugar')) {
      relevantSuffix = 'Space';
    } else if (audienceResponse.includes('vida') || valueResponse.includes('vida') ||
      audienceResponse.includes('diario') || valueResponse.includes('diario')) {
      relevantSuffix = 'Life';
    } else if (valueResponse.includes('laboratorio') || valueResponse.includes('investigación') ||
      valueResponse.includes('ciencia')) {
      relevantSuffix = 'Lab';
    } else if (valueResponse.includes('creativo') || valueResponse.includes('arte') ||
      valueResponse.includes('diseño')) {
      relevantSuffix = 'Studio';
    } else {

      const secondKeyword = keywords[1] || '';
      if (secondKeyword.length >= 3) {
        relevantSuffix = secondKeyword.charAt(0).toUpperCase() + secondKeyword.slice(1, 3);
      } else {

        relevantSuffix = this.ideaNameSuffixes[Math.floor(Math.random() * this.ideaNameSuffixes.length)];
      }
    }

    return `${relevantPrefix}${relevantSuffix}`;
  }

  private generateConcept(keywords: string[]): string {
    const firstResponseEnhanced = this.responses.first.charAt(0).toUpperCase() + this.responses.first.slice(1);

    const conceptTemplates = [
      `${firstResponseEnhanced} que transforma la manera en que las personas interactúan con ${keywords[0] || 'su entorno'}.`,
      `Un enfoque innovador basado en ${firstResponseEnhanced.toLowerCase()} para resolver desafíos relacionados con ${keywords[1] || 'necesidades cotidianas'}.`,
      `Una solución creativa que combina ${firstResponseEnhanced.toLowerCase()} con tecnología para mejorar la experiencia de ${keywords[2] || 'los usuarios'}.`,
      `${firstResponseEnhanced} diseñado para optimizar y reinventar cómo las personas abordan ${keywords[0] || 'sus actividades diarias'}.`
    ];

    return conceptTemplates[Math.floor(Math.random() * conceptTemplates.length)];
  }
  private enhanceResponse(response: string): string {
    let enhanced = response.charAt(0).toUpperCase() + response.slice(1);
    if (!enhanced.endsWith('.') && !enhanced.endsWith('!') && !enhanced.endsWith('?')) {
      enhanced += '.';
    }

    return enhanced;
  }
  private getRandomNextSteps(): string[] {
    const randomIndex = Math.floor(Math.random() * this.commonNextSteps.length);
    return this.commonNextSteps[randomIndex];
  }

  saveIdea(): void {
    if (!this.ideaGenerated || this.ideaSaved) {
      return;
    }
    this.savedIdeas.push({ ...this.generatedIdea });
    localStorage.setItem('savedIdeas', JSON.stringify(this.savedIdeas));
    this.ideaSaved = true;
    alert('¡Idea guardada con éxito!');
  }

  deleteIdea(): void {
    this.ideaGenerated = false;
    this.ideaSaved = false;
  }
}