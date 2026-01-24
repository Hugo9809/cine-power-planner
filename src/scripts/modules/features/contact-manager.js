/**
 * Contact Manager
 * Handles contact operations such as merging shared contacts, saving, and sorting.
 */

export const ContactManager = {
    // Dependencies resolved from window/global scope
    resolveDependencies() {
        return {
            sanitizeContactValue: (typeof window !== 'undefined' ? window.sanitizeContactValue : null),
            normalizeContactEntry: (typeof window !== 'undefined' ? window.normalizeContactEntry : null),
            sortContacts: (typeof window !== 'undefined' ? window.sortContacts : null),
            saveContactsToStorage: (typeof window !== 'undefined' ? window.saveContactsToStorage : null),
            renderContactsList: (typeof window !== 'undefined' ? window.renderContactsList : null),
            updateContactPickers: (typeof window !== 'undefined' ? window.updateContactPickers : null),
            getContactsCache: () => (typeof window !== 'undefined' ? window.contactsCache : undefined),
            setContactsCache: (value) => { if (typeof window !== 'undefined') window.contactsCache = value; }
        };
    },

    mergeSharedContactsIntoCache(sharedContacts) {
        if (!Array.isArray(sharedContacts) || !sharedContacts.length) {
            return { added: 0, updated: 0 };
        }

        const deps = this.resolveDependencies();
        const contactsCache = deps.getContactsCache();

        if (typeof contactsCache === 'undefined') {
            return { added: 0, updated: 0 };
        }

        const sanitize = value => {
            if (typeof deps.sanitizeContactValue === 'function') {
                return deps.sanitizeContactValue(value);
            }
            return typeof value === 'string' ? value.trim() : '';
        };

        const existingContacts = Array.isArray(contactsCache) ? contactsCache.slice() : [];
        let added = 0;
        let updated = 0;

        sharedContacts.forEach(entry => {
            if (!entry || typeof entry !== 'object') {
                return;
            }

            const normalized = typeof deps.normalizeContactEntry === 'function'
                ? deps.normalizeContactEntry(entry)
                : { ...entry };
            if (!normalized || typeof normalized !== 'object') {
                return;
            }

            const id = sanitize(normalized.id || entry.id);
            if (!id) {
                return;
            }

            const existingIndex = existingContacts.findIndex(contact => contact && contact.id === id);
            const createdAt = Number.isFinite(normalized.createdAt)
                ? normalized.createdAt
                : Number.isFinite(entry.createdAt)
                    ? entry.createdAt
                    : Date.now();
            const updatedAtCandidate = Number.isFinite(normalized.updatedAt)
                ? normalized.updatedAt
                : Number.isFinite(entry.updatedAt)
                    ? entry.updatedAt
                    : createdAt;

            if (existingIndex !== -1) {
                const existing = existingContacts[existingIndex];
                let changed = false;
                ['name', 'role', 'phone', 'email', 'website', 'notes'].forEach(field => {
                    const incoming = sanitize(
                        Object.prototype.hasOwnProperty.call(normalized, field)
                            ? normalized[field]
                            : entry[field]
                    );
                    if (!incoming) {
                        return;
                    }
                    const currentValue = sanitize(existing[field]);
                    if (!currentValue) {
                        existing[field] = incoming;
                        changed = true;
                    }
                });
                const incomingAvatar = sanitize(normalized.avatar || entry.avatar);
                if (incomingAvatar && !sanitize(existing.avatar)) {
                    existing.avatar = incomingAvatar;
                    changed = true;
                }
                if (!Number.isFinite(existing.createdAt) && Number.isFinite(createdAt)) {
                    existing.createdAt = createdAt;
                    changed = true;
                }
                if (
                    Number.isFinite(updatedAtCandidate)
                    && (!Number.isFinite(existing.updatedAt) || existing.updatedAt < updatedAtCandidate)
                ) {
                    existing.updatedAt = updatedAtCandidate;
                    changed = true;
                } else if (changed && Number.isFinite(existing.updatedAt)) {
                    // Bump update time if we modified it
                    existing.updatedAt = Date.now();
                } else if (changed && !Number.isFinite(existing.updatedAt)) {
                    existing.updatedAt = Date.now();
                }
                if (changed) {
                    updated += 1;
                }
                return;
            }

            const newContact = {
                id,
                name: sanitize(normalized.name || entry.name),
                role: sanitize(normalized.role || entry.role),
                phone: sanitize(normalized.phone || entry.phone),
                email: sanitize(normalized.email || entry.email),
                website: sanitize(normalized.website || entry.website),
                notes: sanitize(normalized.notes || entry.notes),
                avatar: sanitize(normalized.avatar || entry.avatar),
                createdAt,
                updatedAt: updatedAtCandidate,
            };
            if (!newContact.avatar) {
                delete newContact.avatar;
            }
            existingContacts.push(newContact);
            added += 1;
        });

        if (!added && !updated) {
            return { added: 0, updated: 0 };
        }

        let nextCache;
        try {
            if (typeof deps.sortContacts === 'function') {
                nextCache = deps.sortContacts(existingContacts);
            } else {
                nextCache = existingContacts.filter(Boolean);
            }
        } catch (sortError) {
            console.warn('Shared contact merge could not sort contacts', sortError);
            nextCache = existingContacts.filter(Boolean);
        }

        deps.setContactsCache(nextCache);

        if (typeof deps.saveContactsToStorage === 'function') {
            try {
                deps.saveContactsToStorage(nextCache);
            } catch (saveError) {
                console.warn('Shared contact merge could not persist contacts', saveError);
            }
        }
        if (typeof deps.renderContactsList === 'function') {
            try {
                deps.renderContactsList();
            } catch (renderError) {
                void renderError;
            }
        }
        if (typeof deps.updateContactPickers === 'function') {
            try {
                deps.updateContactPickers();
            } catch (pickerError) {
                void pickerError;
            }
        }

        return { added, updated };
    }
};
