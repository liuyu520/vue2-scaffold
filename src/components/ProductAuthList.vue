<template>
    <ul class="Tstore-card clearfloat">
        <ProductAuthItem  v-for="option in products" :product="option"></ProductAuthItem>
    </ul>
</template>

<script>
import ProductAuthItem from '@/components/ProductAuthItem'
export default {
  components: { ProductAuthItem },
  props: ['products'],
  data: () => ({
    options: ['aaa', 'bb']
  })
}
</script>
