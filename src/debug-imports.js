
try { console.log('Checking rental-houses.js...'); await import('./data/rental-houses.js'); console.log('✅ rental-houses.js loaded'); } catch (e) { console.error('❌ rental-houses.js failed', e); }
try { console.log('Checking translations.js...'); await import('./scripts/translations.js'); console.log('✅ translations.js loaded'); } catch (e) { console.error('❌ translations.js failed', e); }
try { console.log('Checking app-core-pink-mode.js...'); await import('./scripts/core/app-core-pink-mode.js'); console.log('✅ app-core-pink-mode.js loaded'); } catch (e) { console.error('❌ app-core-pink-mode.js failed', e); }
try { console.log('Checking ui.js...'); await import('./scripts/auto-gear/ui.js'); console.log('✅ ui.js loaded'); } catch (e) { console.error('❌ ui.js failed', e); }
try { console.log('Checking storage-shim.js...'); await import('./modules/storage-shim.js'); console.log('✅ storage-shim.js loaded'); } catch (e) { console.error('❌ storage-shim.js failed', e); }
try { console.log('Checking translations-shim.js...'); await import('./modules/translations-shim.js'); console.log('✅ translations-shim.js loaded'); } catch (e) { console.error('❌ translations-shim.js failed', e); }
try { console.log('Checking legacy-globals-shim.js...'); await import('./scripts/shims/legacy-globals-shim.js'); console.log('✅ legacy-globals-shim.js loaded'); } catch (e) { console.error('❌ legacy-globals-shim.js failed', e); }
try { console.log('Checking app-core-runtime-support.js...'); await import('./scripts/core/app-core-runtime-support.js'); console.log('✅ app-core-runtime-support.js loaded'); } catch (e) { console.error('❌ app-core-runtime-support.js failed', e); }
try { console.log('Checking app-core-bootstrap.js...'); await import('./scripts/core/app-core-bootstrap.js'); console.log('✅ app-core-bootstrap.js loaded'); } catch (e) { console.error('❌ app-core-bootstrap.js failed', e); }
try { console.log('Checking app-core-new-1.js...'); await import('./scripts/core/app-core-new-1.js'); console.log('✅ app-core-new-1.js loaded'); } catch (e) { console.error('❌ app-core-new-1.js failed', e); }
