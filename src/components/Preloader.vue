<template>
	<div class="ripple">
		<div class="lds-ripple">
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped>

.lds-ripple {
	display: inline-block;
	position: relative;
	width: 100%;
	height: 100%;
	left: 50%;
	top: 50%;
}
.lds-ripple div {
	position: absolute;
	border: 4px solid #fff;
	opacity: 1;
	border-radius: 50%;
	animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
	animation-delay: -0.5s;
}
@keyframes lds-ripple {
	0% {
		top: 36px;
		left: 36px;
		width: 0;
		height: 0;
		opacity: 1;
	}
	100% {
		top: 0px;
		left: 0px;
		width: 72px;
		height: 72px;
		opacity: 0;
	}
}
.ripple {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;

	z-index: 1001;
	background: rgba(0,0,0,.7);
}

</style>