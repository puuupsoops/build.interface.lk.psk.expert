<template>

        <div class="company-head">
            <CompanyAboutCard 
                
            />
        </div>

</template>

<script>
import CompanyAboutCard from '../components/cards/CompanyAboutCard.vue';

export default {
    componenst: {
        CompanyAboutCard
    },
    setup(){

        const aboutCompany = {
            uid: "f168528d-631b-11df-bfa2-0050569a3a91",
            name: "Общество с ограниченной ответственностью \"Торговый дом \"Регион 98\"",
            city: "г. Санкт-Петербург",
            phone: "799955522333",
            email: "test@test.test",
            address: "195213, г. Санкт-Петербург, ул. Латышских Стрелков, д.19, литер Д, помещение №19",
            inn: "7842411822",
            bik: "044030706",
            payment: "40702810022170000087",
            correspondent: "30101810800000000706"
        };

        return {
            aboutCompany
        }
    }
}
</script>

<style>

</style>