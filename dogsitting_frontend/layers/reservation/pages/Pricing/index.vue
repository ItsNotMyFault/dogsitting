<template>
    <div>
        <div class="sectionTitle center">Pricing</div>
        <div class="pricing-table">
            <div class="priceCard">
                <h2>Journée simple</h2>
                <div class="price">$35/jour</div>
                <!-- <ul class="priceCard-features">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul> -->
                <button class="cta-button">Réserver</button>
            </div>

            <div class="priceCard">
                <h2>Fin de semaine</h2>
                <div class="price">$30/jour</div>
                <!-- <ul class="priceCard-features">
                    <li>Longue marche en forêt</li>
                    <li>Marche quotidienne</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                </ul> -->
                <button class="cta-button">Réserver</button>
            </div>

            <div class="priceCard">
                <h2>+ de 7 jours</h2>
                <div class="price">$25/jour</div>
                <!-- <ul class="priceCard-features">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                    <li>Feature 5</li>
                </ul> -->
                <button class="cta-button">Réserver</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard"
});

</script>
