<template>
  <div>
    <v-img
      class="pointer"
      src="/src/assets/images/google/web_light_sq_ctn@4x.png"
      :width="300"
      @click="googleLogin"
    />
  </div>
</template>

<script setup lang="ts">
function googleLogin(): void {
  location.replace(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_GOOGLE_CALLBACK_URL
    }&response_type=code&scope=email profile`
  )
}
</script>
