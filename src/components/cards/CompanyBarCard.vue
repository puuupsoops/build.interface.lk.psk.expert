<template>
  <a class="company-card-item" href="">
    <div class="company-card-name">{{data.name}}</div>

    <div class="company-card-box orange">

      <div class="company-card-row"
        v-for="agent in data.agents"
        :key="agent.name"
        >
            <div class="company-card-title">{{agent.name}}</div>
            <div class="company-card-info">
            <div class="company-card-info-row">
                Долг: <span class="company-card-value">{{agent.debt}} ₽</span>
            </div>
            <div class="company-card-info-row">
                Баланс: <span class="company-card-value">{{agent.balance}} ₽</span>
            </div>
            </div>
            <div class="company-card-sale">
            <div class="company-card-sale-box">
                <span class="company-card-sale-text">Скидка</span>
                <div class="company-card-sale-value">{{agent.discount}} %</div>
            </div>
            </div>
      </div>

    </div>

    <div class="company-card-more">Подробнее</div>
  </a>
</template>

<script>
export default {
    props:{
        data:{
            type: Object
        }
    }
};
</script>

<style>
</style>