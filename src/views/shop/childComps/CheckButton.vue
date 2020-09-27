<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': isChecked}">
        <img src="../../../assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: true
      }
    },
    // data: function () {
		  // return {
		  //   checked: this.value
    //   }
    // },
    // methods: {
    //   selectItem: function () {
    //     this.$emit('checkBtnClick')
    //   }
    // },
    // watch: {
		  // value: function (newValue) {
    //     this.checked = newValue;
    //   }
    // }
	}
</script>

<style scoped>
  .icon-selector {
		border-radius: 50%;
		border: 2px solid #aaa;
		
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
