
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.resolve(__dirname, '../src/scripts/translations');

// Film industry terminology - using proper set language
const nestedTranslations = {
    de: {
        // Onboarding (nested under texts.onboardingTour.steps.projectRequirements)
        "projectRequirements\": {\n          \"title\": \"[NEEDS TRANSLATION] Refine production requirements boxes":
            "projectRequirements\": {\n          \"title\": \"Produktionsanforderungen verfeinern",
        "\"body\": \"[NEEDS TRANSLATION] Review the regenerated Production Requirements summary beside the kit list. Confirm the brief, crew coverage and logistics boxes mirror the data you just saved, then rerun exports or backups so downstream teams get the updated context with every share.\"":
            "\"body\": \"Überprüfe die neu generierte Zusammenfassung der Produktionsanforderungen neben der Kit-Liste. Bestätige, dass die Kurzbeschreibung, Crew-Abdeckung und Logistik-Felder die gerade gespeicherten Daten widerspiegeln. Führe dann Exporte oder Backups erneut aus, damit nachgelagerte Teams den aktualisierten Kontext mit jedem Teilen erhalten.\"",

        // V2 Dashboard
        "\"projectLocked\": \"[NEEDS TRANSLATION] The project '{projectName}' is already open in another tab.\"":
            "\"projectLocked\": \"Das Projekt '{projectName}' ist bereits in einem anderen Tab geöffnet.\""
    },

    es: {
        // Same patterns for Spanish
        "projectRequirements\": {\n          \"title\": \"[NEEDS TRANSLATION] Refine production requirements boxes":
            "projectRequirements\": {\n          \"title\": \"Refinar casillas de requisitos de producción",
        "\"body\": \"[NEEDS TRANSLATION] Review the regenerated Production Requirements summary beside the kit list. Confirm the brief, crew coverage and logistics boxes mirror the data you just saved, then rerun exports or backups so downstream teams get the updated context with every share.\"":
            "\"body\": \"Revisa el resumen de Requisitos de Producción regenerado junto a la lista de kit. Confirma que las casillas de resumen, cobertura de equipo y logística reflejen los datos que acabas de guardar, luego vuelve a ejecutar exportaciones o backups para que los equipos posteriores reciban el contexto actualizado con cada compartición.\"",
        "\"projectLocked\": \"[NEEDS TRANSLATION] The project '{projectName}' is already open in another tab.\"":
            "\"projectLocked\": \"El proyecto '{projectName}' ya está abierto en otra pestaña.\"",

        // PrintPreview section - using film terminology
        "\"title\": \"[NEEDS TRANSLATION] Print & Export\"": "\"title\": \"Imprimir y Exportar\"",
        "\"closeLabel\": \"[NEEDS TRANSLATION] Close Preview\"": "\"closeLabel\": \"Cerrar Vista Previa\"",
        "\"layoutModeTitle\": \"[NEEDS TRANSLATION] Layout Mode\"": "\"layoutModeTitle\": \"Modo de Diseño\"",
        "\"layoutRentalLabel\": \"[NEEDS TRANSLATION] Rental Friendly\"": "\"layoutRentalLabel\": \"Optimizado para Alquiler\"",
        "\"layoutRentalDescription\": \"[NEEDS TRANSLATION] Optimizes layout for rental by grouping items by category.\"": "\"layoutRentalDescription\": \"Optimiza el diseño para alquiler agrupando artículos por categoría.\"",
        "\"sectionsTitle\": \"[NEEDS TRANSLATION] Sections\"": "\"sectionsTitle\": \"Secciones\"",
        "\"sectionProject\": \"[NEEDS TRANSLATION] Production Requirements\"": "\"sectionProject\": \"Requisitos de Producción\"",
        "\"sectionDevices\": \"[NEEDS TRANSLATION] Camera Package Devices\"": "\"sectionDevices\": \"Dispositivos del Paquete de Cámara\"",
        "\"sectionDiagram\": \"[NEEDS TRANSLATION] Power Diagram\"": "\"sectionDiagram\": \"Diagrama de Potencia\"",
        "\"sectionGearList\": \"[NEEDS TRANSLATION] Kit List\"": "\"sectionGearList\": \"Lista de Kit\"",
        "\"sectionBattery\": \"[NEEDS TRANSLATION] Battery Comparison\"": "\"sectionBattery\": \"Comparación de Baterías\"",
        "\"exportPdfButton\": \"[NEEDS TRANSLATION] Export PDF\"": "\"exportPdfButton\": \"Exportar PDF\"",
        "\"printButton\": \"[NEEDS TRANSLATION] Print\"": "\"printButton\": \"Imprimir\"",
        "\"generatedTitle\": \"[NEEDS TRANSLATION] Overview\"": "\"generatedTitle\": \"Resumen\"",
        "\"generatedProjectNameLabel\": \"[NEEDS TRANSLATION] Project Name:\"": "\"generatedProjectNameLabel\": \"Nombre del Proyecto:\"",
        "\"generatedProductionLabel\": \"[NEEDS TRANSLATION] Production:\"": "\"generatedProductionLabel\": \"Producción:\"",
        "\"generatedDateLabel\": \"[NEEDS TRANSLATION] Date:\"": "\"generatedDateLabel\": \"Fecha:\"",
        "\"generatedNoProjectRequirements\": \"[NEEDS TRANSLATION] No production requirements data.\"": "\"generatedNoProjectRequirements\": \"Sin datos de requisitos de producción.\"",
        "\"generatedDeviceSelectionTitle\": \"[NEEDS TRANSLATION] Camera Package Devices\"": "\"generatedDeviceSelectionTitle\": \"Dispositivos del Paquete de Cámara\"",
        "\"generatedNoDevicesSelected\": \"[NEEDS TRANSLATION] No devices selected.\"": "\"generatedNoDevicesSelected\": \"Ningún dispositivo seleccionado.\"",
        "\"generatedPowerDiagramTitle\": \"[NEEDS TRANSLATION] Power Diagram\"": "\"generatedPowerDiagramTitle\": \"Diagrama de Potencia\"",
        "\"generatedPowerSummaryTitle\": \"[NEEDS TRANSLATION] Power Summary\"": "\"generatedPowerSummaryTitle\": \"Resumen de Potencia\"",
        "\"generatedGearListTitle\": \"[NEEDS TRANSLATION] Kit List\"": "\"generatedGearListTitle\": \"Lista de Kit\"",
        "\"generatedTotalLoad\": \"[NEEDS TRANSLATION] Total Load\"": "\"generatedTotalLoad\": \"Carga Total\"",
        "\"generatedPeak\": \"[NEEDS TRANSLATION] Peak:\"": "\"generatedPeak\": \"Pico:\"",
        "\"generatedEstRuntime\": \"[NEEDS TRANSLATION] Est. Runtime\"": "\"generatedEstRuntime\": \"Tiempo Est.\"",
        "\"generatedWith\": \"[NEEDS TRANSLATION] w/\"": "\"generatedWith\": \"con\"",
        "\"generatedDailyNeeds\": \"[NEEDS TRANSLATION] Daily Needs\"": "\"generatedDailyNeeds\": \"Necesidades Diarias\"",
        "\"generatedBatts\": \"[NEEDS TRANSLATION] Batts\"": "\"generatedBatts\": \"Baterías\"",
        "\"generatedFor12hDay\": \"[NEEDS TRANSLATION] for 12h day\"": "\"generatedFor12hDay\": \"para día de 12h\"",
        "\"other\": \"[NEEDS TRANSLATION] Other\"": "\"other\": \"Otros\""
    },

    fr: {
        // French translations
        "projectRequirements\": {\n          \"title\": \"[NEEDS TRANSLATION] Refine production requirements boxes":
            "projectRequirements\": {\n          \"title\": \"Affiner les cases de besoins de production",
        "\"body\": \"[NEEDS TRANSLATION] Review the regenerated Production Requirements summary beside the kit list. Confirm the brief, crew coverage and logistics boxes mirror the data you just saved, then rerun exports or backups so downstream teams get the updated context with every share.\"":
            "\"body\": \"Examinez le résumé des Besoins de Production régénéré à côté de la liste de kit. Confirmez que les cases de résumé, couverture équipe et logistique reflètent les données que vous venez d'enregistrer, puis relancez les exportations ou sauvegardes pour que les équipes en aval reçoivent le contexte mis à jour avec chaque partage.\"",
        "\"projectLocked\": \"[NEEDS TRANSLATION] The project '{projectName}' is already open in another tab.\"":
            "\"projectLocked\": \"Le projet '{projectName}' est déjà ouvert dans un autre onglet.\"",

        // PrintPreview section
        "\"title\": \"[NEEDS TRANSLATION] Print & Export\"": "\"title\": \"Imprimer et Exporter\"",
        "\"closeLabel\": \"[NEEDS TRANSLATION] Close Preview\"": "\"closeLabel\": \"Fermer l'Aperçu\"",
        "\"layoutModeTitle\": \"[NEEDS TRANSLATION] Layout Mode\"": "\"layoutModeTitle\": \"Mode de Mise en Page\"",
        "\"layoutRentalLabel\": \"[NEEDS TRANSLATION] Rental Friendly\"": "\"layoutRentalLabel\": \"Optimisé pour la Location\"",
        "\"layoutRentalDescription\": \"[NEEDS TRANSLATION] Optimizes layout for rental by grouping items by category.\"": "\"layoutRentalDescription\": \"Optimise la mise en page pour la location en regroupant les articles par catégorie.\"",
        "\"sectionsTitle\": \"[NEEDS TRANSLATION] Sections\"": "\"sectionsTitle\": \"Sections\"",
        "\"sectionProject\": \"[NEEDS TRANSLATION] Production Requirements\"": "\"sectionProject\": \"Besoins de Production\"",
        "\"sectionDevices\": \"[NEEDS TRANSLATION] Camera Package Devices\"": "\"sectionDevices\": \"Équipements du Pack Caméra\"",
        "\"sectionDiagram\": \"[NEEDS TRANSLATION] Power Diagram\"": "\"sectionDiagram\": \"Schéma d'Alimentation\"",
        "\"sectionGearList\": \"[NEEDS TRANSLATION] Kit List\"": "\"sectionGearList\": \"Liste de Kit\"",
        "\"sectionBattery\": \"[NEEDS TRANSLATION] Battery Comparison\"": "\"sectionBattery\": \"Comparaison de Batteries\"",
        "\"exportPdfButton\": \"[NEEDS TRANSLATION] Export PDF\"": "\"exportPdfButton\": \"Exporter PDF\"",
        "\"printButton\": \"[NEEDS TRANSLATION] Print\"": "\"printButton\": \"Imprimer\"",
        "\"generatedTitle\": \"[NEEDS TRANSLATION] Overview\"": "\"generatedTitle\": \"Aperçu\"",
        "\"generatedProjectNameLabel\": \"[NEEDS TRANSLATION] Project Name:\"": "\"generatedProjectNameLabel\": \"Nom du Projet :\"",
        "\"generatedProductionLabel\": \"[NEEDS TRANSLATION] Production:\"": "\"generatedProductionLabel\": \"Production :\"",
        "\"generatedDateLabel\": \"[NEEDS TRANSLATION] Date:\"": "\"generatedDateLabel\": \"Date :\"",
        "\"generatedNoProjectRequirements\": \"[NEEDS TRANSLATION] No production requirements data.\"": "\"generatedNoProjectRequirements\": \"Aucune donnée de besoins de production.\"",
        "\"generatedDeviceSelectionTitle\": \"[NEEDS TRANSLATION] Camera Package Devices\"": "\"generatedDeviceSelectionTitle\": \"Équipements du Pack Caméra\"",
        "\"generatedNoDevicesSelected\": \"[NEEDS TRANSLATION] No devices selected.\"": "\"generatedNoDevicesSelected\": \"Aucun appareil sélectionné.\"",
        "\"generatedPowerDiagramTitle\": \"[NEEDS TRANSLATION] Power Diagram\"": "\"generatedPowerDiagramTitle\": \"Schéma d'Alimentation\"",
        "\"generatedPowerSummaryTitle\": \"[NEEDS TRANSLATION] Power Summary\"": "\"generatedPowerSummaryTitle\": \"Résumé d'Alimentation\"",
        "\"generatedGearListTitle\": \"[NEEDS TRANSLATION] Kit List\"": "\"generatedGearListTitle\": \"Liste de Kit\"",
        "\"generatedTotalLoad\": \"[NEEDS TRANSLATION] Total Load\"": "\"generatedTotalLoad\": \"Charge Totale\"",
        "\"generatedPeak\": \"[NEEDS TRANSLATION] Peak:\"": "\"generatedPeak\": \"Pic :\"",
        "\"generatedEstRuntime\": \"[NEEDS TRANSLATION] Est. Runtime\"": "\"generatedEstRuntime\": \"Durée Est.\"",
        "\"generatedWith\": \"[NEEDS TRANSLATION] w/\"": "\"generatedWith\": \"avec\"",
        "\"generatedDailyNeeds\": \"[NEEDS TRANSLATION] Daily Needs\"": "\"generatedDailyNeeds\": \"Besoins Quotidiens\"",
        "\"generatedBatts\": \"[NEEDS TRANSLATION] Batts\"": "\"generatedBatts\": \"Batteries\"",
        "\"generatedFor12hDay\": \"[NEEDS TRANSLATION] for 12h day\"": "\"generatedFor12hDay\": \"pour journée de 12h\"",
        "\"other\": \"[NEEDS TRANSLATION] Other\"": "\"other\": \"Autre\""
    },

    it: {
        // Italian translations
        "projectRequirements\": {\n          \"title\": \"[NEEDS TRANSLATION] Refine production requirements boxes":
            "projectRequirements\": {\n          \"title\": \"Affina i riquadri requisiti di produzione",
        "\"body\": \"[NEEDS TRANSLATION] Review the regenerated Production Requirements summary beside the kit list. Confirm the brief, crew coverage and logistics boxes mirror the data you just saved, then rerun exports or backups so downstream teams get the updated context with every share.\"":
            "\"body\": \"Rivedi il riepilogo dei Requisiti di Produzione rigenerato accanto alla lista kit. Conferma che i riquadri di riepilogo, copertura troupe e logistica riflettano i dati appena salvati, poi riesegui le esportazioni o i backup in modo che i team a valle ricevano il contesto aggiornato con ogni condivisione.\"",
        "\"projectLocked\": \"[NEEDS TRANSLATION] The project '{projectName}' is already open in another tab.\"":
            "\"projectLocked\": \"Il progetto '{projectName}' è già aperto in un'altra scheda.\""
    }
};

function applyNestedTranslations(locale) {
    const filePath = path.join(TARGET_DIR, `${locale}.js`);
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = nestedTranslations[locale] || {};
    let count = 0;

    for (const [search, replace] of Object.entries(replacements)) {
        if (content.includes(search)) {
            content = content.replace(search, replace);
            count++;
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${locale}: Applied ${count} nested replacements`);
}

// Main
async function main() {
    console.log('Applying nested translations...\n');

    for (const locale of ['de', 'es', 'fr', 'it']) {
        applyNestedTranslations(locale);
    }

    console.log('\nDone!');
}

main().catch(err => console.error(err));
