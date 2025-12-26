// Safari Debug Helper - Add to page temporarily
(function () {
    console.log('=== SAFARI CLICK DEBUG ===');

    // Check for blocking overlays
    const overlays = document.querySelectorAll('.onboarding-overlay');
    console.log('Found onboarding overlays:', overlays.length);
    overlays.forEach((overlay, i) => {
        console.log(`Overlay ${i}:`, {
            element: overlay,
            display: getComputedStyle(overlay).display,
            pointerEvents: getComputedStyle(overlay).pointerEvents,
            zIndex: getComputedStyle(overlay).zIndex,
            position: getComputedStyle(overlay).position,
            classList: overlay.className,
            hasOpenAttr: overlay.hasAttribute('open'),
            openAttrValue: overlay.getAttribute('open')
        });
    });

    // Add global click detector
    let clickCount = 0;
    document.addEventListener('click', function (e) {
        clickCount++;
        console.log(`Global click detected #${clickCount}:`, {
            target: e.target,
            tagName: e.target.tagName,
            id: e.target.id,
            className: e.target.className,
            defaultPrevented: e.defaultPrevented,
            currentTarget: e.currentTarget
        });
    }, true); // Use capture phase

    console.log('Click detector installed. Try clicking anywhere.');
})();
