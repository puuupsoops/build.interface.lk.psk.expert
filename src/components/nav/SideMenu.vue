<template>
	<div>


	<aside :class="'sidebar '+scroll_class"  >
		<div class="sidebar-btn sidebar-menu-btn"  @click="$emit('update:modelValue', !modelValue)">
				
			<svg class="sidebar-btn-img" width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="fill" width="30" height="2" rx="1" fill="white"></rect>
				<rect class="fill" y="9" width="30" height="2" rx="1" fill="white"></rect>
				<rect class="fill" y="18" width="30" height="2" rx="1" fill="white"></rect>
			</svg>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
			<router-link
				tag="a"
				to="/"
				title="На главную"
			>
			<svg class="sidebar-btn-img" width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="stroke" x="1" y="1" width="28" height="19" rx="2" stroke="#A5A7A9" stroke-width="2"></rect>
				<rect class="fill" x="12" y="21" width="2" height="2" fill="#A5A7A9"></rect>
				<rect class="fill" x="16" y="21" width="2" height="2" fill="#A5A7A9"></rect>
				<rect class="fill" x="8" y="23" width="14" height="2" rx="1" fill="#A5A7A9"></rect>
			</svg>
			</router-link>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
			<router-link
				tag="a"
				to="/product"
				title="Поиск товаров"
			>
			<svg class="sidebar-btn-img" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="stroke fill" d="m 24.69447,23.222833 -7.109243,-7.109438 c 1.376999,-1.701013 2.206124,-3.862444 2.206124,-6.2165905 0,-5.4562351 -4.439495,-9.895827938 -9.8956769,-9.895827938 C 4.4394945,9.76562e-4 0,4.4405194 0,9.8967545 c 0,5.4562605 4.4395445,9.8957985 9.8957252,9.8957985 2.3541218,0 4.5156318,-0.829133 6.2166298,-2.206269 l 7.10924,7.109436 c 0.203125,0.203127 0.46975,0.305257 0.7365,0.305257 0.266625,0 0.53325,-0.102125 0.736374,-0.305257 0.407374,-0.407254 0.407374,-1.065634 10e-7,-1.472887 z M 9.8957252,17.709284 c -4.3082946,0 -7.8124028,-3.504154 -7.8124028,-7.8125295 0,-4.3083376 3.5041082,-7.8124804 7.8124028,-7.8124804 4.3082568,0 7.8123768,3.5041428 7.8123768,7.8124804 0,4.3083755 -3.50412,7.8125295 -7.8123768,7.8125295 z" fill="#A5A7A9" stroke="#A5A7A9" />
			</svg>
			</router-link>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
		<router-link
			tag="a"
			to="/order"
			title="Сделать заказ"
		>
			<div class="sidebar-btn-notification" v-if="orderPositionLength>0">
				{{orderPositionLength}}
			</div>
			<svg class="sidebar-btn-img" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="fill" x="0.0802612" y="2.04846" width="4.25606" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
				<rect class="fill" x="3.9931" y="2" width="17.8806" height="2.07613" rx="1.03806" transform="rotate(69.6255 3.9931 2)" fill="#A5A7A9"></rect>
				<rect class="fill" x="8.38477" y="6.20068" width="16.609" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
				<rect class="fill" x="24" y="3" width="8" height="2" rx="1" fill="#A5A7A9"></rect>
				<rect class="fill" x="29" width="8" height="2" rx="1" transform="rotate(90 29 0)" fill="#A5A7A9"></rect>
				<rect class="fill" x="21.0491" y="19.1241" width="13.0871" height="2.07613" rx="1.03806" transform="rotate(-80.9286 21.0491 19.1241)" fill="#A5A7A9"></rect>
				<rect class="fill" x="7.34668" y="17.6194" width="15.8824" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
				<rect class="fill" x="6.30865" y="21.7716" width="9.34257" height="2.07613" rx="1.03806" fill="#A5A7A9"></rect>
				<path class="stroke" d="M8.38477 18.6575C6.82768 18.6575 5.78961 18.9374 5.78961 20.7336C5.78961 22.8097 7.34671 22.8097 7.86574 22.8097" stroke="#A5A7A9" stroke-width="2"></path>
				<circle class="stroke" cx="9.42285" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
				<circle class="stroke" cx="20.8415" cy="24.8858" r="2.11419" stroke="#A5A7A9" stroke-width="2"></circle>
			</svg>
			
		</router-link>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
			<router-link
				tag="a"
				to="/orders"
				title="История заказов"
			>
			<svg class="sidebar-btn-img" width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="stroke" x="1" y="1" width="19.75" height="22.8571" rx="2" stroke="#A5A7A9" stroke-width="2"></rect>
				<circle cx="21.2322" cy="20.1964" r="8.80357" fill="#1F2227"></circle>
				<circle class="stroke" cx="21.2322" cy="20.1964" r="7.80357" stroke="#A5A7A9" stroke-width="2"></circle>
				<rect class="fill" x="19.6786" y="15.5358" width="1.7" height="6.21429" rx="0.85" fill="#A5A7A9"></rect>
				<rect class="fill" x="24.8571" y="20.1" width="1.7" height="5.17857" rx="0.85" transform="rotate(90 24.8571 20.1)" fill="#A5A7A9"></rect>
				<rect class="fill" x="17.6071" y="5.17859" width="1.7" height="13.4643" rx="0.85" transform="rotate(90 17.6071 5.17859)" fill="#A5A7A9"></rect>
				<rect class="fill" x="11.3929" y="13" width="1.7" height="7.25" rx="0.85" transform="rotate(90 11.3929 13)" fill="#A5A7A9"></rect>
				<rect class="fill" x="14.5" y="9" width="1.7" height="10.3571" rx="0.85" transform="rotate(90 14.5 9)" fill="#A5A7A9"></rect>
			</svg>
			</router-link>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
			<router-link
				tag="a"
				to="/claims"
				title="История претензий"
			>
			<svg class="sidebar-btn-img" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="stroke" x="1" y="1" width="19.75" height="22.8571" rx="2" stroke="#a5a7a9" stroke-width="2" style="display:inline"/>
				<circle class="stroke" cx="22.352974" cy="12.771279"  r="7.8035698"  stroke="#a5a7a9" stroke-width="2" />
				<rect class="fill" x="4" y="-16.4643" width="1.7" height="13.4643"  rx="0.85000002"  transform="rotate(90)" fill="#a5a7a9"/>
				<rect class="fill" x="12" y="-11.475845" width="1.7" height="8.4758453" rx="0.85000002" transform="rotate(90)"  fill="#a5a7a9"  style="stroke-width:1.08124" />
				<rect class="fill" x="8" y="-13.3571" width="1.7" height="10.3571" rx="0.85000002"  transform="rotate(90)"  fill="#a5a7a9" />
				<rect class="fill" x="16" y="-13.3571" width="1.7" height="10.3571" rx="0.85000002" transform="rotate(90)" fill="#a5a7a9"/>
				<rect class="fill" x="20" y="-16.4643" width="1.7"  height="13.4643" rx="0.85000002" transform="rotate(90)"  fill="#a5a7a9"/>
				<circle cx="22.352657" cy="12.826086" r="7.0" fill="#1F2227"/>
				<circle class="fill" cx="19.093725" cy="13.046423" r="1.6044408" fill="#a5a7a9"/>
				<circle class="fill" cx="25.805984" cy="13.076351" r="1.6044408" fill="#a5a7a9" />
				<path class="fill" style="fill:none;stroke:#a5a7a9;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 19.883681,17.296901 c 0,0 1.095699,-0.721552 2.367135,-0.728468 1.580368,-0.0086 2.565262,0.70795 2.565262,0.70795" />
				<path class="fill" style="fill:none;stroke:#a5a7a9;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:8;stroke-dasharray:none;stroke-opacity:1" d="m 18.066661,9.2747985 c 1.446561,0.6509875 3.140129,1.4177605 2.55088,1.1144615"/>
				<path class="fill" style="fill:none;stroke:#a5a7a9;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:8;stroke-dasharray:none;stroke-opacity:1" d="M 26.716939,9.2905402 C 25.270378,9.9415277 23.57681,10.7083 24.166059,10.405001"/>
			</svg>
			</router-link>
		</div>
		<div class="sidebar-btn"  @click="$emit('update:modelValue', false)">
			<router-link
				tag="a"
				to="/shipments/request"
				title="Заявка на транспорт"
			>
			<svg class="sidebar-btn-img" width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect class="fill" x="2.06573" y="4.13147" width="10.3286" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<rect class="fill" y="7.74646" width="10.3286" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<rect class="fill" x="2.06573" y="11.3615" width="7.23" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<rect class="fill" x="3.09857" width="18.5914" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<rect class="fill" x="27.3458" y="10.0944" width="8.32268" height="2.14434" rx="1.07217" transform="rotate(-116.966 27.3458 10.0944)" fill="#A5A7A9"></rect>
				<rect class="fill" x="29.761" y="12.6008" width="6.17839" height="2.14434" rx="1.07217" transform="rotate(-128.694 29.761 12.6008)" fill="#A5A7A9"></rect>
				<rect class="fill" x="19.6243" y="8.26282" width="9.29572" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<rect class="fill" x="21.69" width="10.3286" height="2.06571" rx="1.03286" transform="rotate(90 21.69 0)" fill="#A5A7A9"></rect>
				<rect class="fill" x="25.8214" y="4.13147" width="5.16429" height="2.06571" rx="1.03286" transform="rotate(-180 25.8214 4.13147)" fill="#A5A7A9"></rect>
				<rect class="fill" x="30.9857" y="18.5914" width="5.16429" height="2.06571" rx="1.03286" transform="rotate(-180 30.9857 18.5914)" fill="#A5A7A9"></rect>
				<rect class="fill" x="28.92" y="18.5914" width="8.26286" height="2.06571" rx="1.03286" transform="rotate(-90 28.92 18.5914)" fill="#A5A7A9"></rect>
				<rect class="fill" x="12.3943" y="16.5258" width="9.64955" height="2.14434" rx="1.07217" fill="#A5A7A9"></rect>
				<rect class="fill" x="4.13141" y="16.5258" width="5.16429" height="2.06571" rx="1.03286" fill="#A5A7A9"></rect>
				<circle class="stroke" cx="10.6824" cy="17.4406" r="2.21652" stroke="#A5A7A9" stroke-width="2"></circle>
				<circle class="stroke" cx="23.8737" cy="17.4406" r="2.21652" stroke="#A5A7A9" stroke-width="2"></circle>
			</svg>
			
			</router-link>
		</div>
		<!-- <div class="sidebar-btn">
			<a
				href="https://psk.expert"
				title="psk.expert"
			>
			<svg class="sidebar-btn-img" width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class=" fill"
						fill="#A5A7A9" stroke="#A5A7A9" stroke-width="0.3"
						d="m 15.931641,-0.15625 -0.785157,0.0410156 h -0.002 l -0.03516,0.001953 a 0.79382936,0.79382936 0 0 0 -0.0039,0.003906 0.79382936,0.79382936 0 0 0 -0.0098,-0.003906 c -0.03847,0.002577 -0.07292,0.02052419 -0.111328,0.0234375 l -0.002,-0.0078125 c -0.0111,0.0023856 -0.02017,0.01121368 -0.03125,0.01367188 C 10.518215,0.26395056 6.591356,2.8670753 4.4882812,6.8046875 H 3.0175781 a 0.79382936,0.79382936 0 0 0 -0.2285156,0.035156 c 0,0 -0.4299239,0.1159797 -0.8222656,0.3183594 C 1.5652358,7.3653385 1.3084658,7.6389722 1.1484375,7.796875 0.88264229,8.0591395 0.68176034,8.3665775 0.5078125,8.6933594 0.29595239,9.0913654 0.23828125,9.4667969 0.23828125,9.4667969 A 0.79382936,0.79382936 0 0 0 0.22851563,9.59375 l 0.0292969,6.796875 a 0.79382936,0.79382936 0 0 0 0.0175781,0.169922 c 0,0 0.0356705,0.33295 0.23632812,0.736328 0.15476643,0.311125 0.33555032,0.628501 0.67382815,0.912109 0.1791205,0.150173 0.5019845,0.460972 1.0175781,0.617188 0.4612281,0.139747 0.9296875,0.164062 0.9296875,0.164062 a 0.79382936,0.79382936 0 0 0 0.064453,0.0039 l 1.2832031,0.002 c 2.2140733,4.167211 6.4741973,6.831803 11.2089843,6.9375 a 0.79374999,0.79374999 0 0 0 0.294922,0.123047 0.79374999,0.79374999 0 0 0 0.306641,-0.126954 c 4.709685,-0.116809 8.939944,-2.756465 11.152343,-6.898437 l 1.447266,-0.0039 a 0.79382936,0.79382936 0 0 0 0.140625,-0.01367 c 0,0 0.140926,-0.02619 0.3125,-0.06641 0.171574,-0.04022 0.35905,-0.07816 0.59375,-0.1875 0.327558,-0.152604 0.620791,-0.350879 0.871094,-0.609375 0.18959,-0.195798 0.367056,-0.426038 0.527343,-0.716797 0.139033,-0.252203 0.19058,-0.462004 0.240235,-0.646485 0.04966,-0.18448 0.08008,-0.335937 0.08008,-0.335937 a 0.79382936,0.79382936 0 0 0 0.01563,-0.16211 l -0.04492,-6.5761714 a 0.79382936,0.79382936 0 0 0 -0.01367,-0.1425781 c 0,0 -0.0316,-0.1629505 -0.08008,-0.3613281 C 31.484728,9.0106067 31.43598,8.7907538 31.3125,8.5351563 31.170996,8.2422557 30.975344,7.947701 30.699219,7.6953125 30.426804,7.4463183 30.103235,7.2494224 29.746094,7.0898437 29.431011,6.9490554 29.18047,6.9204431 28.943359,6.8828125 28.706248,6.8451819 28.507813,6.8261719 28.507812,6.8261719 a 0.79382936,0.79382936 0 0 0 -0.06836,-0.00391 L 27.460937,6.8105469 C 25.352461,2.8577263 21.404301,0.24979081 16.953125,-0.0859375 c -0.0111,-0.0024242 -0.02013,-0.01132046 -0.03125,-0.01367187 v 0.0078125 c -0.0397,-0.002896 -0.07546,-0.02090049 -0.115234,-0.0234375 a 0.79382936,0.79382936 0 0 0 -0.0078,0 l -0.04102,-0.001953 -0.74414,-0.0390625 a 0.79382936,0.79382936 0 0 0 -0.08203,0 z m -0.769532,1.6816406 0.0039,5.2890625 -4.175782,-0.00781 c 1.009041,-2.8574185 2.549725,-4.8442274 4.171875,-5.28125 z m 1.587891,0 c 1.648158,0.4408022 3.278975,2.3473844 4.285156,5.28125 l -4.283203,0.00781 z m 3.939453,1.0332032 c 1.996584,0.9073023 3.678955,2.3596402 4.884766,4.2460937 H 22.71875 C 22.21829,5.1562487 21.543696,3.6983315 20.689453,2.5585938 Z m -9.472656,0.017578 C 10.368703,3.7133043 9.6989024,5.1647201 9.2011719,6.8046875 H 6.3710937 C 7.5688478,4.9308675 9.237433,3.4850732 11.216797,2.5761719 Z M 3.1601563,8.3925781 h 1.7460937 4.8496094 0.00195 l 6.2031255,0.011719 a 0.79382936,0.79382936 0 0 0 0.002,0 l 6.199218,-0.011719 h 0.002 4.865235 0.0098 l 1.337891,0.015625 c 0.02083,0.00216 0.142973,0.015444 0.316406,0.042969 0.187385,0.029739 0.433909,0.1002491 0.40625,0.087891 0.217718,0.097281 0.433322,0.2404016 0.529297,0.328125 0.09152,0.083651 0.181045,0.208558 0.253906,0.359375 0.0029,0.00592 0.07135,0.203777 0.109375,0.359375 0.02982,0.1220286 0.03912,0.1816796 0.04687,0.2207031 l 0.04492,6.3984374 c -0.0083,0.03831 -0.01565,0.07372 -0.04102,0.167969 -0.03566,0.132474 -0.101481,0.299907 -0.09766,0.292969 -0.110126,0.199768 -0.149338,0.248663 -0.277343,0.380859 -0.0673,0.0695 -0.260573,0.208299 -0.400391,0.273437 0.01127,-0.0053 -0.157456,0.05164 -0.287109,0.08203 -0.09912,0.02323 -0.143496,0.03058 -0.177735,0.03711 l -1.773437,0.0039 h -0.0039 l -4.898438,-0.01367 a 0.79374999,0.79374999 0 0 0 -0.002,0 l -6.060547,-0.0078 a 0.79374999,0.79374999 0 0 0 -0.08008,-0.01563 0.79374999,0.79374999 0 0 0 -0.03711,0.01563 L 9.7910156,17.414062 4.8945312,17.408203 3.25,17.40625 c -0.016272,-0.0019 -0.42314,-0.04969 -0.5878906,-0.09961 -0.1136678,-0.03444 -0.2387682,-0.131464 -0.4570313,-0.314454 -0.01051,-0.0088 -0.185823,-0.230139 -0.2714844,-0.402343 0.022956,0.04615 -0.056104,-0.206505 -0.087891,-0.308594 L 1.8164062,9.6855469 C 1.8205197,9.6646309 1.8351721,9.5766512 1.9082031,9.4394531 2.027219,9.2158675 2.1768534,9.0133995 2.2636719,8.9277344 2.4417093,8.7520616 2.562923,8.6356417 2.6933594,8.5683594 2.8108792,8.5077397 3.0642718,8.425087 3.1601563,8.3925781 Z M 18.847656,9.3984375 A 0.79374999,0.79374999 0 0 0 17.892578,9.9863281 L 17.222656,12.806641 16.697266,11.375 a 0.79382936,0.79382936 0 0 0 -1.494141,0.01367 l -0.486328,1.394531 -0.683594,-2.779297 a 0.79374999,0.79374999 0 0 0 -0.960937,-0.582031 0.79374999,0.79374999 0 0 0 -0.582032,0.960938 l 1.322266,5.378906 a 0.79382936,0.79382936 0 0 0 1.521484,0.07226 l 0.638672,-1.832031 0.669922,1.822266 a 0.79382936,0.79382936 0 0 0 1.515625,-0.08984 L 19.4375,10.353516 A 0.79374999,0.79374999 0 0 0 18.847656,9.3984375 Z m 8.160156,0 A 0.79374999,0.79374999 0 0 0 26.052734,9.9863281 L 25.382812,12.806641 24.857422,11.375 a 0.79382936,0.79382936 0 0 0 -1.494141,0.01367 l -0.486328,1.394531 -0.683594,-2.779297 a 0.79374999,0.79374999 0 0 0 -0.960937,-0.582031 0.79374999,0.79374999 0 0 0 -0.582031,0.960938 l 1.324218,5.378906 a 0.79382936,0.79382936 0 0 0 1.519532,0.07226 l 0.638671,-1.832031 0.669922,1.822266 a 0.79382936,0.79382936 0 0 0 1.515625,-0.08984 l 1.279297,-5.380859 A 0.79374999,0.79374999 0 0 0 27.007812,9.3984375 Z M 10.675781,9.4765625 A 0.79374999,0.79374999 0 0 0 9.7207031,10.064453 L 9.0507813,12.884766 8.5253906,11.455078 A 0.79382936,0.79382936 0 0 0 7.03125,11.466797 L 6.5449219,12.863281 5.8613281,10.082031 A 0.79374999,0.79374999 0 0 0 4.9003906,9.5 0.79374999,0.79374999 0 0 0 4.3183594,10.460938 l 1.3242187,5.380859 a 0.79382936,0.79382936 0 0 0 1.5195313,0.07031 l 0.6386718,-1.830078 0.6699219,1.820313 A 0.79382936,0.79382936 0 0 0 9.9863281,15.8125 L 11.265625,10.431641 A 0.79374999,0.79374999 0 0 0 10.675781,9.4765625 Z m -4.3066404,9.5214845 2.875,0.0039 c 0.5393791,1.727855 1.2843264,3.194275 2.2050784,4.337891 C 9.3660383,22.43662 7.6125817,20.952966 6.3691406,18.998047 Z m 4.5683594,0.0059 4.253906,0.0059 v 5.099609 C 14.409992,23.909746 13.636632,23.510964 12.912109,22.701172 12.128283,21.825095 11.468766,20.516023 10.9375,19.003906 Z m 5.839844,0.0078 4.201172,0.0039 c -0.53175,1.509526 -1.193155,2.815361 -1.976563,3.689453 -0.707879,0.78982 -1.461996,1.185057 -2.224609,1.392578 z m 5.890625,0.0078 2.886718,0.0078 c -1.249513,1.955982 -3.009337,3.436142 -5.097656,4.332031 0.92402,-1.142106 1.669143,-2.610723 2.210938,-4.339844 z"
						/>
			</svg>
			</a>
		</div> -->
	</aside>  
	</div>

		<SideNavigation 
			v-model="modelValue"
			@close="$emit('update:modelValue', !modelValue)"
		></SideNavigation>

</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import SideNavigation from '/src/components/nav/SideNavigation.vue'


const props = defineProps({
	modelValue: {
			type: Boolean,
			reqired: true
		},
	orderPositionLength: Number,
})
const emits = defineEmits(['update:modelValue'])
const scroll_class = ref('show')
const scroll = ref(0)
let scroll_last = 0
const onScroll = (e: Event) => {
			const scr = e.target as Document
			scroll.value = scr.documentElement.scrollTop

			if (scroll_last < scroll.value && scroll.value > 100) {
				scroll_class.value ='hide'
			} else if (scroll_last > scroll.value) {
				scroll_class.value ='show'
			}

			scroll_last = scroll.value
		}

onBeforeUnmount(() => { window.removeEventListener("scroll", onScroll)})
onMounted(() => {
				window.scrollTo(0,0)
				window.addEventListener("scroll", onScroll)
		})



</script>


<style lang="sass" scoped>


</style>