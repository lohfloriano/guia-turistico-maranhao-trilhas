document.addEventListener('DOMContentLoaded', () => {
    const destinationsContainer = document.getElementById('destinations');

    async function fetchDestinations() {
        try {
            const response = await fetch('http://localhost:3000/destinations');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const destinations = await response.json();
            displayDestinations(destinations);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    }

    function displayDestinations(destinations) {
        destinationsContainer.innerHTML = '';

        destinations.forEach(destination => {
            const destinationElement = document.createElement('div');
            destinationElement.classList.add('destination');

            destinationElement.innerHTML = `
                <h2>${destination.name}</h2>
                <img src="images/${destination.image_url}" alt="${destination.name}" style="width: 100%; max-width: 400px; height: auto;">
                <p>${destination.description}</p>
                <p><strong>Region:</strong> ${destination.region}</p>
            `;

            destinationsContainer.appendChild(destinationElement);
        });
    }

    fetchDestinations();
});
