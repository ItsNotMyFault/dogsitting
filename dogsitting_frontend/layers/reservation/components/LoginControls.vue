<template>
    <div>
        <UiUserMenuPopover :items="userMenu" @action="handleUserAction" />
    </div>
</template>
<script setup lang="ts">
const config = useAppConfig();

const userMenu = computed(() => {
    // Default user menu items if not configured
    return (
        (config as any).userMenu ?? [
            {
                id: "profile",
                label: "Profile",
                icon: "lucide:user",
                action: "profile"
            },
            {
                id: "settings",
                label: "Settings",
                icon: "lucide:settings",
                action: "user-settings"
            },
            {
                id: "help",
                label: "Help",
                icon: "lucide:help-circle",
                action: "help"
            }
        ]
    );
});

// User menu actions
const handleUserAction = (action: string) => {
    switch (action) {
        case "profile":
            navigateTo("/profile");
            break;
        case "user-settings":
            navigateTo("/settings/user");
            break;
        case "admin-settings":
            navigateTo("/settings/admin");
            break;
        case "notifications":
            navigateTo("/notifications");
            break;
        case "help":
            navigateTo("/help");
            break;
        // Note: logout is handled directly in UserMenuPopover
        default:
    }
};
</script>
