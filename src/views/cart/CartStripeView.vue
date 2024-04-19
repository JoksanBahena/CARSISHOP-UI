<template>
  <div>
    <h1>este es el bueno</h1>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="pk"
      :lineItems="lineItems"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
      @loading="(v) => (loading = v)"
    />
    <v-btn @click="submit">Pagar ahora</v-btn>
  </div>
</template>

<script setup>

</script>
