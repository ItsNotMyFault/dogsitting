<template>
    <footer class="bg-gray-50 py-8 px-6">
        <div class="container mx-auto flex flex-row justify-between items-center space-y-6 md:space-y-0">
            <!-- Copyright -->
            <div class="text-gray-700 text-sm">
                © {{ new Date().getFullYear() }}
                <span class="font-bold">Dogsitting</span>
                <i class="mdi mdi-heart text-red-500 ml-1"></i>
            </div>

            <!-- Social Icons -->
            <div class="flex space-x-6">
                <a v-for="social in socials" :key="social.name" :href="social.href" target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-500 p-4  hover:text-gray-800 transition-colors duration-200"
                    :aria-label="`Follow us on ${social.name}`">
                    <svg :viewBox="social.viewBox" class="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path :d="social.path" />
                    </svg>
                </a>
            </div>

            <!-- Contact Link -->
            <div>
                <a href="#"
                    class="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors duration-200">


                    Nous joindre
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
const socials = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/',
        viewBox: '0 0 32 32',
        path: 'M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/',
        viewBox: '0 0 32 32',
        path: 'M32 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4z',
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/',
        viewBox: '0 0 32 32',
        path: 'M30 0H2a2 2 0 0 0-2 2v28c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z',
    },
];
</script>