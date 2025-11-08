<template>
    <div class="py-16 bg-gray-50">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-800 mb-3">Tarification</h2>
            <p class="text-gray-500 text-lg">Choisissez le plan qui correspond le mieux à vos besoins</p>
        </div>

        <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            <!-- Card 1 -->
            <div
                class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 flex flex-col items-center text-center">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Journée simple</h3>
                <div class="text-4xl font-bold text-primary-600 mb-4">$35<span
                        class="text-lg text-gray-500">/jour</span></div>

                <!-- Optional features -->
                <!--
        <ul class="space-y-2 text-gray-600 mb-6">
          <li>Marche quotidienne</li>
          <li>Surveillance constante</li>
          <li>Soins de base inclus</li>
        </ul>
        -->

                <button
                    class="mt-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    Réserver
                </button>
            </div>

            <!-- Card 2 -->
            <div
                class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 flex flex-col items-center text-center">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Fin de semaine</h3>
                <div class="text-4xl font-bold text-primary-600 mb-4">$30<span
                        class="text-lg text-gray-500">/jour</span></div>

                <!-- Optional features -->
                <!--
        <ul class="space-y-2 text-gray-600 mb-6">
          <li>Longue marche en forêt</li>
          <li>Marche quotidienne</li>
          <li>Soins de base inclus</li>
        </ul>
        -->

                <button
                    class="mt-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    Réserver
                </button>
            </div>

            <!-- Card 3 -->
            <div
                class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 flex flex-col items-center text-center">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">+ de 7 jours</h3>
                <div class="text-4xl font-bold text-primary-600 mb-4">$25<span
                        class="text-lg text-gray-500">/jour</span></div>

                <!-- Optional features -->
                <!--
        <ul class="space-y-2 text-gray-600 mb-6">
          <li>Promenades quotidiennes</li>
          <li>Surveillance personnalisée</li>
          <li>Rapport photo chaque jour</li>
        </ul>
        -->

                <button
                    class="mt-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                    Réserver
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard"
});
</script>
