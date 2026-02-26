// -------------------------
// CLEAN WORKING FLEET MODAL
// -------------------------

document.addEventListener("DOMContentLoaded", () => {

    // Play plane sound when entering Fleet page
    const fleetSound = document.getElementById("fleetSound");

    if (fleetSound) {
        // slight delay = smoother UX
        setTimeout(() => {
            fleetSound.volume = 0.4; // not loud
            fleetSound.play().catch(() => {
                // autoplay blocked — user interaction required
            });
        }, 400);
    }
    document.addEventListener("click", () => {
        if (fleetSound && fleetSound.paused) {
            fleetSound.volume = 0.4;
            fleetSound.play();
        }
    }, { once: true });
    window.addEventListener("load", () => {
        const intro = document.getElementById("intro");

        setTimeout(() => {
            intro.style.opacity = "0";
            intro.style.transition = "opacity 0.6s ease";
        }, 1200);

        setTimeout(() => {
            intro.style.display = "none";
        }, 1800);
    });



    // modal elements
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalStats = document.getElementById("modalStats");
    const modalGallery = document.getElementById("modalGallery");
    const modalClose = document.querySelector(".modal-close");

    // open modal for each fleet aircraft card
    document.querySelectorAll("[data-model]").forEach(card => {
        card.addEventListener("click", () => {

            // title + description
            modalTitle.textContent = card.dataset.model;
            modalDesc.textContent = card.dataset.desc;

            // stats (payload, range, engine…)
            modalStats.innerHTML = "";

            Object.keys(card.dataset).forEach(key => {
                if (["model", "desc", "images"].includes(key)) return;
                modalStats.innerHTML += `<li><strong>${key}:</strong> ${card.dataset[key]}</li>`;
            });

            // gallery images
            modalGallery.innerHTML = "";
            if (card.dataset.images) {
                const imgs = card.dataset.images.split(",");
                imgs.forEach(src => {
                    modalGallery.innerHTML += `<img src="${src.trim()}" alt="">`;
                });
            }

            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    // close modal
    modalClose.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    });

    // click outside to close
    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        }
    });
});
