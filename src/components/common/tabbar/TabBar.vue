<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style>
  #tab-bar{
    display: flex;
    height: 49px;
    background-color: #f6f6f6;

    /* 让 tab-bar 开启固定定位*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 设置阴影效果 */
    box-shadow: 0px -1px 1px rgba(100,100,100,.15);
  }
</style>
