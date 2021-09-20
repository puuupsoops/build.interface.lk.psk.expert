<template>
    <div class="prev-slider">
        <PrevSliderCard  
            v-for   ="item in showcase" 
            :key    ="item.id"
            :data   ="item"
        />
    </div>
</template>

<script>
import { useShowcase } from '../../hooks/useShowcase';
import PrevSliderCard from './PrevSliderCard.vue';

export default {
    components: {
        PrevSliderCard
    },
    setup(){
        const {showcase, isLoad} = useShowcase();

        console.log(showcase);

        return {
            showcase,
            isLoad
        }
    },
    mounted(){

    let $ = window.$;

    $(function() {

        $.getScript('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',function(){
            
                $('.prev-slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                loop: false,
                nav: false,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1220,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 610,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 410,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

            $('.prev-slider').slick('refresh');
            
        });

    });

    }
}
</script>

<style>

</style>