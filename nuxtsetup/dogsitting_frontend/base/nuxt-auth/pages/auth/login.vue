<template>
  <UCard class="max-w-sm w-full bg-white/90 dark:bg-white/5">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      :title="appName"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        <img style="width: 200px; margin: auto" :src="lightLogo" />
      </template>

      <template #password-hint>
        <NuxtLink to="#" class="text-primary font-medium"
          >Mot de passe oublié?</NuxtLink
        >
      </template>

      <template #footer>
        En vous connectant, vous acceptez nos
        <NuxtLink to="#" class="text-primary font-medium"
          >politiques d'utilisation</NuxtLink
        >.
      </template>
    </UAuthForm>
  </UCard>
</template>
<script setup lang="ts">
const { signIn } = useAuth();

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

useSeoMeta({
  title: "Connexion",
});

const runtimeConfig = useRuntimeConfig();
const zitadelActive = runtimeConfig.public.zitadel.active;
const credentialsActive = runtimeConfig.public.credentials.active;
const credentialsLoginIsUsername = runtimeConfig.public.credentials.isUsername;

const appName = runtimeConfig.public.authentication.appName;
const lightLogo = runtimeConfig.public.theme.light.logo;

const fields = [];

if (credentialsActive) {
  if (credentialsLoginIsUsername) {
    fields.push({
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Enter your username",
    });
  } else {
    fields.push({
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
    });
  }
  fields.push({
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  });
}

const validate = (state: any) => {
  const errors = [];
  if (credentialsLoginIsUsername) {
    if (!state.username)
      errors.push({ path: "username", message: "Username is required" });
  } else {
    if (!state.email)
      errors.push({ path: "email", message: "Email is required" });
  }
  if (!state.password)
    errors.push({ path: "password", message: "Password is required" });
  return errors;
};

const providers = [];

const route = useRoute();

if (zitadelActive) {
  const forwardAuth = route.query.forwardAuth;
  if (forwardAuth) {
    signIn("zitadel", null, {
      prompt: "none",
    });
  }

  providers.push({
    label: "Connexion avec la FQM",
    color: "white" as const,
    click: () => {
      signIn("zitadel", null, {
        prompt: "select_account",
      });
    },
  });
}

function onSubmit(data: any) {
  signIn("credentials", {
    username: data.username,
    password: data.password,
  });
}
</script>
