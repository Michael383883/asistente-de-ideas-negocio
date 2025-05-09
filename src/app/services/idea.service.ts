import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '.././../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IdeaService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    analyzeIdea(ideaData: any): Observable<any> {

        return this.mockAnalyzeIdea(ideaData).pipe(
            delay(1500)
        );
    }

    saveIdea(ideaWithAnalysis: any): Observable<any> {


        console.log('Idea guardada:', ideaWithAnalysis);
        return of({ success: true }).pipe(delay(500));
    }

    getAllIdeas(): Observable<any[]> {

        return of([]);
    }


    private mockAnalyzeIdea(ideaData: any): Observable<any> {

        const { skills, resources, investment, ideaType, targetAudience, timeAvailable } = ideaData;


        let title = '';
        let description = '';
        let viabilityScore = 0;
        let strengths = [];
        let opportunities = [];
        let nextSteps = [];

        // Lógica 
        switch (ideaType) {
            case 'servicio':
                title = `Servicio de ${this.getRandomElement(skills.split(','))} para ${targetAudience || 'el público general'}`;
                description = `Un servicio personalizado que aprovecha tus habilidades en ${skills} para ofrecer soluciones a ${targetAudience || 'clientes'} con un modelo de negocio escalable y adaptable a tu disponibilidad de ${timeAvailable || 'tiempo'}.`;
                viabilityScore = this.calculateViabilityScore(ideaData);
                strengths = [
                    `Aprovecha tus habilidades en ${this.getRandomElement(skills.split(','))}`,
                    `Requiere una inversión inicial accesible de $${investment}`,
                    'Modelo de negocio flexible que se adapta a tu disponibilidad'
                ];
                opportunities = [
                    'Potencial para expandir servicios con el tiempo',
                    'Posibilidad de crear paquetes personalizados',
                    'Mercado en crecimiento para servicios especializados'
                ];
                nextSteps = [
                    'Definir tu propuesta de valor específica',
                    'Investigar precios de la competencia',
                    'Crear un sitio web o perfil en redes sociales',
                    'Desarrollar un paquete de servicios básico'
                ];
                break;

            case 'digital':
                title = `Plataforma digital de ${this.getRandomElement(skills.split(','))}`;
                description = `Una solución digital que combina tus conocimientos de ${skills} para crear un producto online accesible para ${targetAudience || 'usuarios'}, con potencial de escalabilidad y bajos costos operativos.`;
                viabilityScore = this.calculateViabilityScore(ideaData);
                strengths = [
                    'Bajos costos operativos después del desarrollo inicial',
                    'Potencial de escalabilidad global',
                    `Tu experiencia en ${this.getRandomElement(skills.split(','))} te da una ventaja competitiva`
                ];
                opportunities = [
                    'Modelo de ingresos recurrentes por suscripción',
                    'Posibilidad de expandir funcionalidades con el tiempo',
                    'Creciente demanda de soluciones digitales'
                ];
                nextSteps = [
                    'Definir las funcionalidades básicas del MVP',
                    'Validar la idea con potenciales usuarios',
                    'Crear un prototipo básico',
                    'Planificar estrategia de marketing digital'
                ];
                break;

            case 'físico':
                title = `Producto físico basado en ${this.getRandomElement(skills.split(','))}`;
                description = `Un producto tangible que aprovecha tus habilidades en ${skills} y recursos como ${resources}, dirigido a ${targetAudience || 'consumidores'} buscando soluciones prácticas y de calidad.`;
                viabilityScore = this.calculateViabilityScore(ideaData);
                strengths = [
                    `Utilizas recursos que ya posees: ${this.getRandomElement(resources.split(','))}`,
                    'Producto diferenciado basado en tus habilidades específicas',
                    'Potencial para ventas tanto online como en tiendas físicas'
                ];
                opportunities = [
                    'Posibilidad de crear una línea de productos complementarios',
                    'Oportunidad de asociarse con tiendas locales',
                    'Tendencia creciente hacia productos artesanales/especializados'
                ];
                nextSteps = [
                    'Crear un prototipo del producto',
                    'Investigar costos de producción y materiales',
                    'Definir embalaje y presentación',
                    'Identificar canales de distribución'
                ];
                break;

            default:
                title = `Idea innovadora combinando ${this.getRandomElement(skills.split(','))}`;
                description = `Un concepto híbrido que aprovecha tus habilidades en ${skills} y recursos disponibles para ofrecer una solución única al mercado de ${targetAudience || 'consumidores potenciales'}.`;
                viabilityScore = this.calculateViabilityScore(ideaData);
                strengths = [
                    'Concepto innovador con poca competencia directa',
                    `Aprovechamiento de tus habilidades en ${this.getRandomElement(skills.split(','))}`,
                    'Flexibilidad para adaptarse a diferentes modelos de negocio'
                ];
                opportunities = [
                    'Potencial para crear un nicho de mercado propio',
                    'Posibilidad de combinar elementos digitales y físicos',
                    'Diferenciación clara de la competencia existente'
                ];
                nextSteps = [
                    'Realizar un análisis de mercado detallado',
                    'Validar el concepto con potenciales clientes',
                    'Desarrollar un plan de negocio básico',
                    'Identificar posibles fuentes de financiación adicional'
                ];
        }

        return of({
            title,
            description,
            viabilityScore,
            strengths,
            opportunities,
            nextSteps,
            ideaType
        });
    }

    private calculateViabilityScore(ideaData: any): number {

        let score = 50; // Puntuación base


        const skillsCount = ideaData.skills.split(',').length;
        score += skillsCount * 5 * (skillsCount > 3 ? 15 : skillsCount * 5);

        const resourcesCount = ideaData.resources.split(',').length;
        score += resourcesCount > 3 ? 15 : resourcesCount * 5;


        if (ideaData.investment > 10000) score += 10;
        else if (ideaData.investment > 5000) score += 5;
        else if (ideaData.investment < 1000) score -= 5;


        if (ideaData.targetAudience) score += 5;
        if (ideaData.timeAvailable) score += 5;


        return Math.max(0, Math.min(100, score));
    }

    private getRandomElement(array: string[]): string {
        if (!array || array.length === 0) return '';
        const cleanArray = array.map(item => item.trim()).filter(item => item.length > 0);
        if (cleanArray.length === 0) return '';
        return cleanArray[Math.floor(Math.random() * cleanArray.length)];
    }
}