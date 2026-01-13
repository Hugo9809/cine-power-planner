
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.resolve(__dirname, '../src/scripts/translations');

// Device Library V2 view keys to add
const deviceLibraryKeys = {
    en: {
        "deviceLibraryTitle": "Device Library",
        "deviceLibrarySubtitle": "Add, edit, and manage devices in your local database",
        "tabAddDevice": "Add Device",
        "tabBrowseLibrary": "Browse Library",
        "addNewDeviceTitle": "Add New Device",
        "addDeviceSubtitle": "Create a custom device entry for your database",
        "existingDevicesTitle": "Existing Devices",
        "existingDevicesSubtitle": "Browse and manage devices in your library"
    },
    de: {
        "deviceLibraryTitle": "Geräte-Bibliothek",
        "deviceLibrarySubtitle": "Geräte in deiner lokalen Datenbank hinzufügen, bearbeiten und verwalten",
        "tabAddDevice": "Gerät hinzufügen",
        "tabBrowseLibrary": "Bibliothek durchsuchen",
        "addNewDeviceTitle": "Neues Gerät hinzufügen",
        "addDeviceSubtitle": "Erstelle einen benutzerdefinierten Geräteeintrag für deine Datenbank",
        "existingDevicesTitle": "Vorhandene Geräte",
        "existingDevicesSubtitle": "Durchsuche und verwalte Geräte in deiner Bibliothek"
    },
    es: {
        "deviceLibraryTitle": "Biblioteca de Dispositivos",
        "deviceLibrarySubtitle": "Añade, edita y gestiona dispositivos en tu base de datos local",
        "tabAddDevice": "Añadir Dispositivo",
        "tabBrowseLibrary": "Explorar Biblioteca",
        "addNewDeviceTitle": "Añadir Nuevo Dispositivo",
        "addDeviceSubtitle": "Crea una entrada personalizada de dispositivo para tu base de datos",
        "existingDevicesTitle": "Dispositivos Existentes",
        "existingDevicesSubtitle": "Explora y gestiona dispositivos en tu biblioteca"
    },
    fr: {
        "deviceLibraryTitle": "Bibliothèque d'Équipements",
        "deviceLibrarySubtitle": "Ajoutez, modifiez et gérez les équipements dans votre base de données locale",
        "tabAddDevice": "Ajouter un Appareil",
        "tabBrowseLibrary": "Parcourir la Bibliothèque",
        "addNewDeviceTitle": "Ajouter un Nouvel Appareil",
        "addDeviceSubtitle": "Créez une entrée personnalisée pour votre base de données",
        "existingDevicesTitle": "Appareils Existants",
        "existingDevicesSubtitle": "Parcourez et gérez les appareils dans votre bibliothèque"
    },
    it: {
        "deviceLibraryTitle": "Libreria Dispositivi",
        "deviceLibrarySubtitle": "Aggiungi, modifica e gestisci dispositivi nel tuo database locale",
        "tabAddDevice": "Aggiungi Dispositivo",
        "tabBrowseLibrary": "Sfoglia Libreria",
        "addNewDeviceTitle": "Aggiungi Nuovo Dispositivo",
        "addDeviceSubtitle": "Crea una voce personalizzata per il tuo database",
        "existingDevicesTitle": "Dispositivi Esistenti",
        "existingDevicesSubtitle": "Sfoglia e gestisci i dispositivi nella tua libreria"
    }
};

function addKeysToLocale(locale) {
    const filePath = path.join(TARGET_DIR, `${locale}.js`);
    let content = fs.readFileSync(filePath, 'utf8');

    const keysToAdd = deviceLibraryKeys[locale] || deviceLibraryKeys.en;
    let addedCount = 0;

    for (const [key, value] of Object.entries(keysToAdd)) {
        // Check if key already exists
        if (!content.includes(`"${key}"`)) {
            // Find a good insertion point - after darkModeLabel or before any closing brace
            const insertAfter = '"darkModeLabel":';
            const insertPos = content.indexOf(insertAfter);

            if (insertPos > -1) {
                // Find end of that line
                const lineEnd = content.indexOf(',', insertPos) + 1;
                const insertion = `\n    "${key}": ${JSON.stringify(value)},`;
                content = content.slice(0, lineEnd) + insertion + content.slice(lineEnd);
                addedCount++;
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${locale}: Added ${addedCount} Device Library keys`);
}

// Main
async function main() {
    console.log('Adding Device Library V2 keys...\n');

    for (const locale of ['en', 'de', 'es', 'fr', 'it']) {
        addKeysToLocale(locale);
    }

    console.log('\nDone!');
}

main().catch(err => console.error(err));
