<template>
<div class="product-parcel">
    <div class="product-parcel-wrap">
            <div class="product-parcel-elem content-elem">
                <div class="content-hide">
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Наценка: </div>
                        <div class="product-parcel-value">
                        <button class="product-parcel-btn">30</button>
                        <button class="product-parcel-btn">%</button>
                        <button class="product-parcel-btn">₽</button>
                        </div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Цена с наценкой: </div>
                        <div class="product-parcel-value">1 300 ₽</div>
                    </div>
                </div>

            </div>
            
            
            <div class="product-parcel-elem content-elem" >
                <div class="content-hide" >
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Количество: </div>
                        <div class="product-parcel-value"> 
                        <button class="product-parcel-btn">0</button>
                        </div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Сума: </div>
                        <div class="product-parcel-value">1 300 ₽</div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Средний вес: </div>
                        <div class="product-parcel-value">25 кг</div>
                    </div>
                    <div class="product-parcel-row">
                        <div class="product-parcel-text">Средний объем: </div>
                        <div class="product-parcel-value">26 м.куб</div>
                    </div>
                </div>

            </div>
          
         
     
        <div class="product-parcel-hide-btn content-hide-btn" @click="show = !show">{{ !show ? 'Показать +' : 'Скрыть —' }}</div>
    </div>
</div>

</template>


<script>
import { ref } from 'vue'

export default {
    setup(){
        let show=ref(true);

        return{
            show
        }
    }
}
</script>

<style scoped>

.product-parcel {
	position: relative;
	margin-top: 30px; }
	.product-parcel-wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-moz-align-items: center;
		align-items: center; }
	.product-parcel-elem {
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;
		position: relative;
		margin-right: 30px;
		padding: 40px;
		max-width: 370px;
		min-height: 244px;
		-webkit-transition: 0.35s;
		-moz-transition: 0.35s;
		-ms-transition: 0.35s;
		-o-transition: 0.35s;
		transition: 0.35s;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		-moz-justify-content: center;
		justify-content: center;
		-webkit-flex-flow: column;
		-moz-flex-flow: column;
		-ms-flex-flow: column;
		flex-flow: column; }
		.product-parcel-elem.active {
			min-height: auto; }
			.product-parcel-elem.active .product-parcel-elem-name {
				position: relative;
				opacity: 1; }
			.product-parcel-elem.active .product-parcel-elem-hide-btn {
				margin-top: -12px;
				top: 50%; }
		.product-parcel-elem-name {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 16px;
			line-height: 25px;
			color: #A5A7A9;
			pointer-events: none;
			opacity: 0; }
		.product-parcel-elem .product-parcel-elem-hide-btn {
			display: none;
			position: absolute;
			margin: 0;
			top: 20px;
			right: 20px; }
	.product-parcel-row {
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
		display: flex;
		margin-bottom: 10px;
		font-size: 16px;
		color: #ffffff;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		-moz-align-items: center;
		align-items: center; }
		.product-parcel-row:last-child {
			margin: 0; }
	.product-parcel-text {
		margin-right: 5px;
		color: #A5A7A9; }
	.product-parcel-btn {
		margin: 5px;
		width: 40px;
		height: 40px;
		font-size: 16px;
		line-height: 25px;
		color: #ffffff;
		background-color: #292C32;
		border: 0;
		border-radius: 6px;
		-webkit-transition: 0.35s;
		-moz-transition: 0.35s;
		-ms-transition: 0.35s;
		-o-transition: 0.35s;
		transition: 0.35s;
		cursor: pointer; }
		.product-parcel-btn:hover {
			color: #FAC12E; }
	.product-parcel-hide-btn {
		margin: 0 0 0 auto;
			margin-right: 15px;
		min-width: 85px; }


</style>